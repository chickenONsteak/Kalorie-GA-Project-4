import React, { useContext, useState } from "react";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useFetch from "../../hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import UserContext from "../../contexts/user";

const UpdateIntakeModal = (props) => {
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const userContext = useContext(UserContext);
  const [food_name, setFoodName] = useState(props.intake.food_name || "");
  const [calories, setCalories] = useState(props.intake.calories || 0);
  const [carbohydrates, setCarbohydrates] = useState(
    props.intake.carbohydrates || 0
  );
  const [protein, setProtein] = useState(props.intake.protein || 0);
  const [fats, setFats] = useState(props.intake.fats || 0);

  const handleUpdateIntake = async () => {
    try {
      const res = await fetchData(
        "/intakes/update_intake",
        "PATCH",
        {
          intake_id: props.intake.id,
          food_name,
          calories,
          carbohydrates,
          protein,
          fats,
        },
        userContext.accessToken
      );

      if (res.ok) {
        queryClient.invalidateQueries(["getTodayIntakes"]);
        props.setOpen(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="nameOfFood">Name of food</Label>
            <Input
              id="nameOfFood"
              type="text"
              value={food_name}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              type="text"
              value={calories}
              onChange={(event) => setCalories(event.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="carbohydrates">Carbs</Label>
            <Input
              id="carbohydrates"
              type="text"
              value={carbohydrates}
              onChange={(event) => setCarbohydrates(event.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="protein">Protein</Label>
            <Input
              id="protein"
              type="text"
              value={protein}
              onChange={(event) => setProtein(event.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="fats">Fats</Label>
            <Input
              id="fats"
              type="text"
              value={fats}
              onChange={(event) => setFats(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
          <Button type="submit" onClick={handleUpdateIntake}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateIntakeModal;
