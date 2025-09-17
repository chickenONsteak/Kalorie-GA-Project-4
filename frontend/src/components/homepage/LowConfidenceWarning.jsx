import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";

const LowConfidenceWarning = (props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button>⚠️</Button>
      </HoverCardTrigger>
      <HoverCardContent>{props.message}</HoverCardContent>
    </HoverCard>
  );
};

export default LowConfidenceWarning;
