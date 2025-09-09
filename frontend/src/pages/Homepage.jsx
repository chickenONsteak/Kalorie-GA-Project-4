import React from "react";
import CalorieCard from "../components/homepage/CalorieCard";
import MacroCard from "../components/homepage/MacroCard";
import LogIntake from "../components/homepage/LogIntake";
import DataTabs from "../components/homepage/DataTabs";

const Homepage = () => {
  return (
    <div>
      <div>
        <h1>Hey Austin, ready to check in on today?</h1>
      </div>

      <div>
        <LogIntake />
      </div>

      <div className="flex">
        <CalorieCard />
        <MacroCard>🍞 Carbs</MacroCard>
        <MacroCard>🥩 Protein</MacroCard>
        <MacroCard>🥓 Fats</MacroCard>
      </div>

      <div>
        <DataTabs />
      </div>
    </div>
  );
};

export default Homepage;
