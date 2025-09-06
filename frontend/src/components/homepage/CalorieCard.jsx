import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // importing React component directly from react-circular-progressbar package in node_modules
import "../../styles/circularProgressbar.css";

const currentCal = 1600;
const totalCal = 1800;
const percentage = (currentCal / totalCal) * 100;

const CalorieCard = () => {
  return (
    <div className="relative w-80 h-50 bg-[#22c55e]">
      <div>
        <span>⚡️ Calories</span>
      </div>
      <div className="absolute bottom-0 right-0">
        <CircularProgressbar
          value={percentage}
          text={`${currentCal}/${totalCal} kcal`}
          circleRatio={0.35}
          styles={buildStyles({ rotation: 0.75 })}
        />
      </div>
    </div>
  );
};

export default CalorieCard;
