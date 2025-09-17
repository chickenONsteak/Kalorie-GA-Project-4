import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const useDeleteIntake = () => {
  const fetchData = useFetch();
  const queryClient = useQueryClient();

  const deleteIntake = async (intake_id) => {
    try {
      const res = await fetchData("/intakes/delete_intake", "DELETE", {
        intake_id,
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["getTodayIntakes"] });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return deleteIntake;
};

export default useDeleteIntake;
