import React, { useContext } from "react";
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

const CONFIDENCE_THRESHOLD = 0.8;

const TableIntake = () => {
  const fetchData = useFetch();
  const userContext = useContext(UserContext);

  const getTodayIntakes = async () => {
    try {
      const decoded = jwtDecode(userContext.accessToken);

      const res = await fetchData("/intakes/view_intakes", "POST", {
        user_id: decoded.user_id,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Table>
      <TableCaption>A list of your intake for the day</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Time</TableHead>
          <TableHead>Food</TableHead>
          <TableHead>Carbs</TableHead>
          <TableHead>Protein</TableHead>
          <TableHead>Fats</TableHead>
          <TableHead className="text-right">Calories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">0610</TableCell>
          <TableCell>Nasi Lemak</TableCell>
          <TableCell>42g</TableCell>
          <TableCell>20g</TableCell>
          <TableCell>32g</TableCell>
          <TableCell className="text-right">720g</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableIntake;
