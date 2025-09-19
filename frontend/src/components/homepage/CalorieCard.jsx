import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // importing React component directly from react-circular-progressbar package in node_modules
import "../../styles/circularProgressbar.css";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import useGetTodayIntake from "../../hooks/useGetTodayIntake";
import useGetAllIntakes from "../../hooks/useGetAllIntakes";

const CalorieCard = () => {
  const {
    data: dataTodayIntake, // RENAME WHAT TANSTACK QUERY RETURNS
    isSuccess: isSuccessTodayIntake,
    isLoading: isLoadingTodayIntake,
    isError: isErrorTodayIntake,
  } = useGetTodayIntake();
  const {
    data: dataAllIntakes,
    isSuccess: isSuccessAllIntakes,
    isLoading: isLoadingAllIntakes,
    isError: isErrorAllIntakes,
  } = useGetAllIntakes();

  let totalCalorieIntake = 0;
  let calorieGoal = 0;
  let percentage = 0;

  // ADD CORRESPONDING MACRO UPON SUCCESSFUL QUERY
  if (isSuccessTodayIntake) {
    for (const intake of dataTodayIntake.data) {
      totalCalorieIntake += intake?.calories;
    }
  }
  // GET MACRO GOAL
  if (isSuccessAllIntakes) {
    const indexOfLatestGoal = dataAllIntakes.data.length - 1;
    calorieGoal = dataAllIntakes.data[indexOfLatestGoal]?.calorie_goal || 0;
  }

  // ADJUST THE PERCENTAGE DISPLAYED ON PROGRESS BAR
  if (calorieGoal > 0) {
    // SAFEGUARD AGAINST DIVISION BY 0
    const currentPercentage = (totalCalorieIntake / calorieGoal) * 100;
    if (currentPercentage > 100) {
      // BECAUSE IF >100%, THE PROGRESS BAR DOESN'T DISPLAY ANYTHING
      percentage = 100;
    } else {
      percentage = currentPercentage;
    }
  } else {
    percentage = 0;
  }

  return (
    <Card className="bg-[#22c55e] w-64 h-40 flex flex-col items-start justify-center mt-5">
      <CardHeader>
        <CardTitle className="flex flex-col text-white text-base font-bold text-lg mt-3">
          ⚡️Calories
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center w-full">
        <CircularProgressbar
          value={percentage}
          text={`${totalCalorieIntake}/${calorieGoal} kcal`}
          circleRatio={0.35}
          styles={buildStyles({ rotation: 0.75, textSize: "14px" })}
        />
      </CardContent>
    </Card>
  );
};

export default CalorieCard;
