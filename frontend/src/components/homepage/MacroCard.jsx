import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import useGetTodayIntake from "../../hooks/useGetTodayIntake";
import useGetAllIntakes from "../../hooks/useGetAllIntakes";

const CalorieCard = (props) => {
  const {
    data: dataTodayIntake, // RENAME WHAT TANSTACK QUERY RETURNS
    isSuccess: isSuccessTodayIntake,
  } = useGetTodayIntake();
  const { data: dataAllIntakes, isSuccess: isSuccessAllIntakes } =
    useGetAllIntakes();

  let totalMacroIntake = 0;
  let macroGoal = 0;
  let percentage = 0;

  // ADD CORRESPONDING MACRO UPON SUCCESSFUL QUERY
  if (isSuccessTodayIntake) {
    for (const intake of dataTodayIntake.data) {
      totalMacroIntake += intake[props.id] || 0;
    }
  }
  // GET MACRO GOAL
  if (isSuccessAllIntakes) {
    const indexOfLatestGoal = dataAllIntakes.data.length - 1;
    macroGoal = dataAllIntakes.data[indexOfLatestGoal][`${props.id}_goal`] || 0;
  }

  // ADJUST THE PERCENTAGE DISPLAYED ON PROGRESS BAR
  if (macroGoal > 0) {
    // SAFEGUARD AGAINST DIVISION BY 0
    const currentPercentage = (totalMacroIntake / macroGoal) * 100;
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
    <Card className="bg-[#22c55e] w-64 h-40 m-5">
      <CardHeader className="flex justify-start">
        <CardTitle className="text-white text-lg">{props.children}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} />
        <span>{`${totalMacroIntake} / ${macroGoal}g`}</span>
      </CardContent>
    </Card>
  );
};

export default CalorieCard;
