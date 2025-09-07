import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LogIntake = () => {
  return (
    <>
      <h2>What did you have?</h2>

      <div className="flex">
        <Input
          className="w-154"
          type="text"
          placeholder="Describe your food — the more details, the better"
        />
        <Button>Log it!</Button>
      </div>
    </>
  );
};

export default LogIntake;
