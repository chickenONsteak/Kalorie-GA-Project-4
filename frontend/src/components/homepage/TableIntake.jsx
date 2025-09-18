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
import { Button } from "../ui/button";
import useDeleteIntake from "../../hooks/useDeleteIntake";
import UpdateIntakeModal from "../modals/updateIntakeModal";
import useGetTodayIntake from "../../hooks/useGetTodayIntake";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingContext from "../../contexts/loading";
import LowConfidenceWarning from "./LowConfidenceWarning";

const TableIntake = () => {
  const [selectedIntake, setSelectedIntake] = useState({});
  const [showUpdateIntakeModal, setShowUpdateIntakeModal] = useState(false);
  const loadingContext = useContext(LoadingContext);

  const { data, isSuccess, isLoading, isError } = useGetTodayIntake(); // DECONSTRUCT THE useGetTodayIntake CUSTOM HOOK
  const { mutate } = useDeleteIntake(); // DECONSTRUCT THE useDeleteIntake CUSTOM HOOK

  return (
    <>
      <Table>
        <TableCaption>A list of your intake for the day</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left"></TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Carbs</TableHead>
            <TableHead>Protein</TableHead>
            <TableHead>Fats</TableHead>
            <TableHead></TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingContext.isLoading && (
            <TableRow>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </TableCell>
            </TableRow>
          )}
          {isSuccess &&
            data.data.map((intake) => {
              return (
                <TableRow key={intake.id}>
                  <TableCell>
                    <LowConfidenceWarning additionalDetails={intake} />
                  </TableCell>
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
                    <Button onClick={() => mutate(intake.id)}>Del</Button>
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
