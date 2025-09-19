"use client";
import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../contexts/user";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";
import LoadingContext from "../../contexts/loading";
import { toast } from "sonner";
import GuestModal from "../modals/GuestModal";
import GuestContext from "../../contexts/guestContext";

const formSchema = z.object({
  foodInput: z
    .string()
    .min(1, {
      message: "Input must be at least 1 characters.",
    })
    .max(500, {
      message: "Input cannot exceed 500 characters.",
    }),
});

const FormLogIntake = () => {
  const fetchData = useFetch();
  const userContext = useContext(UserContext);
  const queryClient = useQueryClient();
  const loadingContext = useContext(LoadingContext);
  // const [showGuestModal, setShowGuestModal] = useState(false); // TO DISPLAY CALORIE ESTIMATION IN A MODAL FOR GUESTS (NON-LOGGED IN USERS)
  const [openAiResponse, setOpenAiResponse] = useState({});
  const guestContext = useContext(GuestContext);

  const addIntake = async (openAiResponse) => {
    try {
      let decoded = null;
      if (userContext.accessToken) {
        decoded = jwtDecode(userContext.accessToken);
      } else {
        console.warn("No access token, skipping database logging for guest");
        return;
      }

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
    guestContext.setShowGuestModal(false);
    loadingContext.setIsLoading(true);

    try {
      const res = await fetchData("/openai/estimate_calories", "PUT", {
        food_description: data.foodInput,
      });

      if (res.ok) {
        loadingContext.setIsLoading(false);
        // DISPLAY RESULTS TO GUEST
        if (!userContext.accessToken) {
          guestContext.setOpenAiResponse(res.data.output);
          guestContext.setShowGuestModal(true);
        } else {
          // ADD INTO DATABASE
          addIntake(res.data.output);
        }
      }
    } catch (error) {
      loadingContext.setIsLoading(false);
      console.error(error.msg);
    }
  };

  // FOR THE FORM
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodInput: "",
    },
  });

  function onSubmit(values) {
    getCalorieEstimate(values);
    toast.success("Processing input...", {
      description: "details will automatically show up on the table below",
      duration: 5000,
    });
    form.reset();
  }

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="foodInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white">
                  What did you eat?
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full sm:w-[500px] md:w-[700px] lg:w-[900px]"
                    placeholder="Describe your food — the more details, the better"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="my-3" type="submit">
            Log it!
          </Button>
        </form>
      </Form>

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

export default FormLogIntake;
