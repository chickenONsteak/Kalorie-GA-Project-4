import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetch from "../../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import LoadingContext from "../../contexts/loading";
import { useQueryClient } from "@tanstack/react-query";
import UserContext from "../../contexts/user";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { toast } from "sonner";
import GuestModal from "../modals/GuestModal";
import GuestContext from "../../contexts/guestContext";

const UploadIntakePhoto = () => {
  // WHAT HAPPENS HERE:
  // 1. send request to identify the uploaded image with handleImageUpload function
  // 2. upon success, call getCaloriesEstimate to estimate the calories based on response from step 1
  // 3. upon success of step 2, call addIntake to add it into the table at Homepage
  const loadingContext = useContext(LoadingContext);
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const userContext = useContext(UserContext);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const guestContext = useContext(GuestContext);
  const [openAiResponse, setOpenAiResponse] = useState({});

  const addIntake = async (openAiResponse) => {
    console.log(openAiResponse);
    try {
      const decoded = jwtDecode(userContext.accessToken);

      const res = await fetchData("/intakes/add_intake", "PUT", {
        user_id: decoded.user_id,
        food_name: openAiResponse.food_name,
        calories: openAiResponse.calories,
        carbohydrates: openAiResponse.carbohydrates_g,
        protein: openAiResponse.protein_g,
        fats: openAiResponse.fats_g,
        assumption_1: openAiResponse.assumptions[0],
        assumption_2: openAiResponse.assumptions[1],
        assumption_3: openAiResponse.assumptions[2],
        additional_details_required_1:
          openAiResponse?.required_details?.[0] ?? "", // OPTIONAL CHAIN THE additional details SINCE IT RETURNS AN EMPTY ARRAY, HENCE IT ACTUALLY EXISTS
        additional_details_required_2:
          openAiResponse?.required_details?.[1] ?? "",
        additional_details_required_3:
          openAiResponse?.required_details?.[2] ?? "",
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["getTodayIntakes"] }); // TO RE-RENDER THE TableIntake COMPONENT
      }

      loadingContext.setIsLoading(false);
      return res;
    } catch (error) {
      loadingContext.setIsLoading(false);
      console.error(error.message);
    }
  };

  const getCalorieEstimate = async (data) => {
    loadingContext.setIsLoading(true);

    try {
      const res = await fetchData("/openai/estimate_calories", "PUT", {
        food_description: data,
      });

      if (res.ok && userContext.accessToken) {
        // ADD INTO DATABASE
        addIntake(res.data.output);
      } else if (res.ok && !userContext.accessToken) {
        // GUEST WILL HAVE THEIR RESULT APPEAR IN A MODAL, NOT IN THE LOG TABLE
        guestContext.setOpenAiResponse(res.data.output);
        guestContext.setShowGuestModal(true);
        loadingContext.setIsLoading(false);
      }
    } catch (error) {
      loadingContext.setIsLoading(false);
      console.error(error.msg);
    }
  };

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    if (!uploadedImage) return; // IF USER REMOVES IMAGE AND uploadedImage BECOMES UNDEFINED

    setIsProcessingImage(true); // FOR LOADER UI
    const reader = new FileReader();

    // ASSIGN FUNCTION TO onloadend PROPERTY FIRST BEFORE READING
    reader.onloadend = async () => {
      const base64ImageStr = reader.result.split(",")[1]; // reader.result gives 2 things: meta data (what we don't need) AND the converted image to ASCII string (what we need)

      // SEND REQUEST WITH BASE64 IMAGE
      try {
        const res = await fetchData("/openai/identify_food", "PUT", {
          uploaded_image: base64ImageStr,
        });

        if (res.ok) {
          // GET CALORIE ESTIMATE AND CAPTURE INSIDE THE TABLE
          getCalorieEstimate(res.data.output);
          event.target.value = "";
        }

        setIsProcessingImage(false);
      } catch (error) {
        console.error(error.msg);
        event.target.value = "";
        setIsProcessingImage(false);
      }
    };

    reader.readAsDataURL(uploadedImage); // START READING FILE
  };

  return (
    <div>
      <Label
        className="mb-1 sm:mt-4 text-lg text-gray-700 dark:text-gray-200"
        htmlFor="picture"
      >
        You can upload an image
      </Label>
      <Input
        id="picture"
        type="file"
        accept="image/*"
        onChange={(event) => {
          toast.success("Processing image...", {
            description:
              "details will automatically show up on the table below",
            duration: 5000,
          });
          handleImageUpload(event);
        }}
      />
      {isProcessingImage && <Spinner variant={"ellipsis"} />}

      {/* {guestContext.showGuestModal && (
        <GuestModal
          openAiResponse={openAiResponse}
          open={guestContext.showGuestModal}
          setOpen={guestContext.setShowGuestModal}
        />
      )} */}
    </div>
  );
};

export default UploadIntakePhoto;
