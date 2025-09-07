import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

const CalorieCard = (props) => {
  const currentGrams = 32;
  const totalGrams = 60;
  const percentage = (currentGrams / totalGrams) * 100;

  return (
    <Card className="bg-[#22c55e] w-64 h-40 m-5">
      <CardHeader className="flex justify-start">
        <CardTitle className="text-white text-lg">{props.children}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} />
        <span>{`${currentGrams} / ${totalGrams}g`}</span>
      </CardContent>
    </Card>
  );
};

export default CalorieCard;
