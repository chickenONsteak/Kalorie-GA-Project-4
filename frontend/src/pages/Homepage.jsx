import React, { useState } from "react";
import CalorieCard from "../components/homepage/CalorieCard";
import MacroCard from "../components/homepage/MacroCard";
import FormLogIntake from "../components/homepage/FormLogIntake";
import DataTabs from "../components/homepage/DataTabs";
import UploadIntakePhoto from "../components/homepage/UploadIntakePhoto";

const Homepage = () => {
  return (
    <div>
      <div>
        <h1>Hey Austin, ready to check in on today?</h1>
      </div>

      <div>
        <FormLogIntake />
        <UploadIntakePhoto />
      </div>

      <div className="flex">
        <CalorieCard />
        <MacroCard id="carbohydrates">🍞 Carbs</MacroCard>
        <MacroCard id="protein">🥩 Protein</MacroCard>
        <MacroCard id="fats">🥓 Fats</MacroCard>
      </div>

      <div>
        <DataTabs />
      </div>
    </div>
  );
};

export default Homepage;
