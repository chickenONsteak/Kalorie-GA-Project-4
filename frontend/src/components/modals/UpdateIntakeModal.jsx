import React, { useState } from "react";
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

const UpdateIntakeModal = (props) => {
  const [food_name, setFoodName] = useState(props.intake.food_name || "");
  const [calories, setCalories] = useState(props.intake.calories || 0);
  const [carbohydrates, setCarbohydrates] = useState(
    props.intake.carbohydrates || 0
  );
  const [protein, setProtein] = useState(props.intake.protein || 0);
  const [fats, setFats] = useState(props.intake.fats || 0);

  const updateIntake = async () => {
    try {
      const res = await fetchData("/intakes/update_intake", "PATCH", {
        intake_id: props.intake.intake_id,
        food_name,
        calories,
        carbohydrates,
        protein,
        fats,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <Label>Name of food</Label>
            <Input
              type="text"
              value={food_name}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
          <div>
            <Label>Calories</Label>
            <Input
              type="text"
              value={calories}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
          <div>
            <Label>Carbs</Label>
            <Input
              type="text"
              value={carbohydrates}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
          <div>
            <Label>Protein</Label>
            <Input
              type="text"
              value={protein}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
          <div>
            <Label>Fats</Label>
            <Input
              type="text"
              value={fats}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateIntakeModal;

// import React from "react";
// import useFetch from "../../hooks/useFetch";

// const UpdateIntakeOverlay = (props) => {
//   const fetchData = useFetch();

//   const updateIntake = async () => {
//     try {
//       const res = await fetchData("/intakes/update_intake", "PATCH", {
//         intake_id: props.intake_id,
//         food_name: props.food_name,
//         calories: props.calories,
//         carbohydrates: props.carbohydrates,
//         protein: props.protein,
//         fats: props.fats,
//       });
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className={styles.backdrop}>
//       <div className={styles.modal}>
//         <div className="row">
//           {isError && error}
//           {!isError && "\u00a0"}
//         </div>
//         <div className="row">
//           <div className="col-md-3">Username :</div>
//           <input
//             className="col-md-3"
//             type="text"
//             placeholder="required"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </div>
//         <div className="row">
//           <div className="col-md-3">Password :</div>
//           <input
//             className="col-md-3"
//             type="text"
//             placeholder="required"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <div className="row">
//           <button className="col-md-2" onClick={handleLogin}>
//             Submit
//           </button>
//           <div className="col-md-1"></div>
//           <button
//             className="col-md-2"
//             onClick={() => props.setShowLoginModal(false)}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UpdateIntakeModal = () => {
//   return <div></div>;
// };

// export default UpdateIntakeModal;
