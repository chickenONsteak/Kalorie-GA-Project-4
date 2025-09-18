import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import LoadingContext from "../../contexts/loading";

const LowConfidenceWarning = ({ intake }) => {
  // WHAT'S HAPPENING HERE: IF LOW CONFIDENCE, USERS ARE ABLE TO PROVIDE ADDITIONAL DETAILS FOR THE AI MODEL TO REVIEW AND ESTIMATE CALORIES AGAIN
  // STEP 1. THE ADDITIONAL DETAILS PROVIDED WILL BE WRAPPED IN A PROMPT STRUCTURE (newFoodDescription) AND SENT IN A REQUEST TO ESTIMATE CALORIES
  const queryClient = useQueryClient();
  const fetchData = useFetch();
  const loadingContext = useContext(LoadingContext);
  const [open, setOpen] = useState(false);
  console.log(intake);

  const [additionalDetailProvided1, setAdditionalDetailProvided1] =
    useState("");
  const [additionalDetailProvided2, setAdditionalDetailProvided2] =
    useState("");
  const [additionalDetailProvided3, setAdditionalDetailProvided3] =
    useState("");
  let newFoodDescription = "";

  // USING intake?.additional_details_required_1 AS A CHECK WHETHER THE AI MODEL IS CONFIDENT OF THE ESTIMATION
  if (intake?.additional_details_required_1) {
    newFoodDescription = `
      Name of food: ${intake.food_name}. 
      Original assumptions: 
      1. ${intake.assumption_1}.
      2. ${intake.assumption_2}.
      3. ${intake.assumption_3}.

      User clarifications to the additional details required to improve confidence in calorie estimation: 
      1. ${intake.additional_details_required_1} -> ${additionalDetailProvided1}.
      2. ${intake.additional_details_required_2} -> ${additionalDetailProvided2}.
      3. ${intake.additional_details_required_3} -> ${additionalDetailProvided3}.
      `;
  }

  const handleUpdateIntake = async (openAiResponse) => {
    try {
      const res = await fetchData("/intakes/update_intake", "PATCH", {
        intake_id: intake.id,
        food_name: openAiResponse.food_name,
        calories: openAiResponse.calories,
        carbohydrates: openAiResponse.carbohydrates_g,
        protein: openAiResponse.protein_g,
        fats: openAiResponse.fats_g,
        additional_details_required_1:
          openAiResponse?.required_details?.[0] ?? null,
        additional_details_required_2:
          openAiResponse?.required_details?.[1] ?? null,
        additional_details_required_3:
          openAiResponse?.required_details?.[2] ?? null,
      });

      if (res.ok) {
        queryClient.invalidateQueries(["getTodayIntakes"]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCalorieEstimate = async () => {
    loadingContext.setIsLoading(true);

    try {
      const res = await fetchData("/openai/estimate_calories", "PUT", {
        food_description: newFoodDescription,
      });

      if (res.ok) {
        // ADD INTO DATABASE
        loadingContext.setIsLoading(false);
        console.log(res.data.output);
        handleUpdateIntake(res.data.output);
      }
    } catch (error) {
      loadingContext.setIsLoading(false);
      console.error(error.msg);
    }
  };

  const handleReview = () => {
    setOpen(false);
    setAdditionalDetailProvided1("");
    setAdditionalDetailProvided2("");
    setAdditionalDetailProvided3("");
    getCalorieEstimate();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>{intake?.additional_details_required_1 ? "⚠️" : "🔍"}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>{intake.assumption_1}</p>
        <p>{intake.assumption_2}</p>
        <p>{intake.assumption_3}</p>
        {intake.additional_details_required_1 ? (
          <>
            <div>
              <Label htmlFor="additionalDetail1">
                {intake.additional_details_required_1}
              </Label>
              <Input
                id="additionalDetail1"
                value={additionalDetailProvided1}
                className="col-span-2 h-8"
                onChange={(event) =>
                  setAdditionalDetailProvided1(event.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor="additionalDetail2">
                {intake.additional_details_required_2}
              </Label>
              <Input
                id="additionalDetail2"
                value={additionalDetailProvided2}
                className="col-span-2 h-8"
                onChange={(event) =>
                  setAdditionalDetailProvided2(event.target.value)
                }
              />
            </div>

            <div>
              <Label htmlFor="additionalDetail3">
                {intake.additional_details_required_3}
              </Label>
              <Input
                id="additionalDetail3"
                value={additionalDetailProvided3}
                className="col-span-2 h-8"
                onChange={(event) =>
                  setAdditionalDetailProvided3(event.target.value)
                }
              />
            </div>
            <Button onClick={handleReview}>Review again</Button>
          </>
        ) : (
          ""
        )}
      </PopoverContent>
    </Popover>
  );
};

export default LowConfidenceWarning;
