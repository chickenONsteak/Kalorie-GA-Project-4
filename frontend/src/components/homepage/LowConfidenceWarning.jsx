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
        <Button
          className={`shadow-md ${
            intake?.additional_details_required_1
              ? "bg-[#f97316] hover:bg-[#ea580c]" // CONDITIONAL BACKGROUND COLOURING
              : "bg-[#22c55e] hover:bg-[#16a34a]"
          }`}
        >
          {intake?.additional_details_required_1 ? "⚠️" : "🔍"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        {intake.additional_details_required_1 ? (
          <div>
            <h2 className="text-lg font-extrabold dark:text-white">
              This calorie estimate might not be accurate…
            </h2>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              You can add extra details below to help us give a more accurate
              estimate.
            </p>
          </div>
        ) : (
          ""
        )}
        <h3 className="text-base font-extrabold dark:text-white">
          Assumptions:
        </h3>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-4">
          <li>{intake.assumption_1}</li>
          <li>{intake.assumption_2}</li>
          <li>{intake.assumption_3}</li>
        </ol>

        {intake.additional_details_required_1 ? (
          <div>
            <h3 className="text-base font-extrabold dark:text-white my-2">
              Additional details required:
            </h3>
            <ol className="text-sm mb-4">
              <li>
                <Label htmlFor="additionalDetail1">
                  {intake.additional_details_required_1}
                </Label>
                <Input
                  id="additionalDetail1"
                  value={additionalDetailProvided1}
                  className="col-span-2 h-8 my-2"
                  onChange={(event) =>
                    setAdditionalDetailProvided1(event.target.value)
                  }
                />
              </li>
              <li>
                <Label htmlFor="additionalDetail2">
                  {intake.additional_details_required_2}
                </Label>
                <Input
                  id="additionalDetail2"
                  value={additionalDetailProvided2}
                  className="col-span-2 h-8 my-2"
                  onChange={(event) =>
                    setAdditionalDetailProvided2(event.target.value)
                  }
                />
              </li>
              <li>
                <Label htmlFor="additionalDetail3">
                  {intake.additional_details_required_3}
                </Label>
                <Input
                  id="additionalDetail3"
                  value={additionalDetailProvided3}
                  className="col-span-2 h-8 my-2"
                  onChange={(event) =>
                    setAdditionalDetailProvided3(event.target.value)
                  }
                />
              </li>
            </ol>
            <Button onClick={handleReview}>Review again</Button>
          </div>
        ) : (
          ""
        )}
      </PopoverContent>
    </Popover>
  );
};

export default LowConfidenceWarning;
