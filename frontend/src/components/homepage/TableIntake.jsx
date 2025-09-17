import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../contexts/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import useDeleteIntake from "../../hooks/useDeleteIntake";
import UpdateIntakeModal from "../modals/updateIntakeModal";

const TableIntake = () => {
  const fetchData = useFetch();
  const deleteIntake = useDeleteIntake();
  const userContext = useContext(UserContext);
  const [selectedIntake, setSelectedIntake] = useState({});
  const [showUpdateIntakeModal, setShowUpdateIntakeModal] = useState(false);

  // GET ALL FOOD INTAKES TODAY
  const getTodayIntakes = async () => {
    try {
      const decoded = jwtDecode(userContext.accessToken);

      const res = await fetchData("/intakes/view_intakes", "POST", {
        user_id: decoded.user_id,
      });

      if (res.ok) {
        console.log(res.data.length);
        return res;
      } else {
        throw new Error("error getting today's intake");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const query = useQuery({
    queryKey: ["getTodayIntakes"],
    queryFn: getTodayIntakes,
    enabled: !!userContext.accessToken, // SO THAT THE FUNCTION WON'T BE CALLED WHEN USER ISN'T LOGGED IN
  });

  return (
    <>
      <Table>
        <TableCaption>A list of your intake for the day</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Time</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Carbs</TableHead>
            <TableHead>Protein</TableHead>
            <TableHead className="text-right">Fats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.isSuccess &&
            query.data.data.map((intake) => {
              return (
                <TableRow key={intake.id}>
                  <TableCell>{intake.created_at}</TableCell>
                  <TableCell>{intake.food_name}</TableCell>
                  <TableCell>{intake.calories}</TableCell>
                  <TableCell>{intake.carbohydrates}</TableCell>
                  <TableCell>{intake.protein}</TableCell>
                  <TableCell>{intake.fats}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedIntake(intake);
                        setShowUpdateIntakeModal(true);
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteIntake(intake.id)}>Del</Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {showUpdateIntakeModal && (
        <UpdateIntakeModal
          intake={selectedIntake}
          open={showUpdateIntakeModal}
          setOpen={setShowUpdateIntakeModal}
        />
      )}
    </>
  );
};

export default TableIntake;
