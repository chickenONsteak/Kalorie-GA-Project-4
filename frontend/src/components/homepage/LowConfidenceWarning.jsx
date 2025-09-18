import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

const LowConfidenceWarning = ({ additionalDetails }) => {
  console.log(additionalDetails);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          {additionalDetails.additional_details_required_1 != null
            ? "⚠️"
            : "🔍"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>{additionalDetails.assumption_1}</p>
        <p>{additionalDetails.assumption_2}</p>
        <p>{additionalDetails.assumption_3}</p>
        <p>{additionalDetails?.additional_details_required_1 ?? ""}</p>
        <p>{additionalDetails?.additional_details_required_2 ?? ""}</p>
        <p>{additionalDetails?.additional_details_required_3 ?? ""}</p>
      </PopoverContent>
    </Popover>
  );
};

export default LowConfidenceWarning;
