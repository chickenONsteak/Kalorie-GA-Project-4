import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // importing React component directly from react-circular-progressbar package in node_modules
import "../../styles/circularProgressbar.css";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useGetTodayIntake from "../../hooks/useGetTodayIntake";
import useGetAllIntakes from "../../hooks/useGetAllIntakes";

const CalorieCard = () => {
  const {
    data: dataTodayIntake, // RENAME WHAT TANSTACK QUERY RETURNS
    isSuccess: isSuccessTodayIntake,
  } = useGetTodayIntake();
  const { data: dataAllIntakes, isSuccess: isSuccessAllIntakes } =
    useGetAllIntakes();

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
    <div className="flex flex-col h-40 items-center justify-center bg-[#22c55e] rounded-xl shadow-sm">
      <p className="text-xl font-semibold text-white p-4 mt-2">⚡️Calories</p>
      <CircularProgressbar
        className="font-semibold"
        value={percentage}
        text={`${totalCalorieIntake} kcal`}
        circleRatio={0.65}
        styles={buildStyles({
          rotation: 0.675,
          textSize: "16px",
          textColor: "black",
          trailColor: "rgba(0, 0, 0, 0.2)",
          pathColor: "rgba(0, 0, 0, 0.7)",
          strokeLinecap: "round",
        })}
      />
    </div>
  );
};

export default CalorieCard;
