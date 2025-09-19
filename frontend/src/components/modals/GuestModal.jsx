import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GuestModal = (props) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-extrabold">
            Your search result
          </DialogTitle>
          <DialogDescription>
            {
              "This is only displayed to guests.\nSign in to unlock more features!"
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <p className="font-semibold">{"Name of food:"}</p>
            <p>{props.openAiResponse.food_name}</p>
          </div>
          <div className="grid gap-3">
            <p className="font-semibold">{"Calories (kcal):"}</p>
            <p>{props.openAiResponse.calories}</p>
          </div>
          <div className="grid gap-3">
            <p className="font-semibold">{"Carbohydrates (grams):"}</p>
            <p>{props.openAiResponse.carbohydrates_g}</p>
          </div>
          <div className="grid gap-3">
            <p className="font-semibold">{"Protein (grams):"}</p>
            <p>{props.openAiResponse.protein_g}</p>
          </div>
          <div className="grid gap-3">
            <p className="font-semibold">{"Fats (grams):"}</p>
            <p>{props.openAiResponse.fats_g}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuestModal;
