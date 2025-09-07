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

const currentCal = 1600;
const totalCal = 1800;
const percentage = (currentCal / totalCal) * 100;

const CalorieCard = () => {
  return (
    <Card className="bg-[#22c55e] w-64 h-40 m-5">
      <CardHeader className="flex justify-start">
        <CardTitle className="text-white text-lg">⚡️ Calories</CardTitle>
      </CardHeader>
      <CardContent>
        <CircularProgressbar
          value={percentage}
          text={`${currentCal}/${totalCal} kcal`}
          circleRatio={0.35}
          styles={buildStyles({ rotation: 0.75 })}
        />
      </CardContent>
    </Card>
  );
};

export default CalorieCard;
