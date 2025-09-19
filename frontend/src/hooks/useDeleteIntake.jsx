import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";

// THIS IS A CUSTOM HOOK TO DELETE INTAKE WITH TANSTACK FOR REUSABILITY
const useDeleteIntake = () => {
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const userContext = useContext(UserContext);

  const deleteIntake = async (intake_id) => {
    try {
      const res = await fetchData(
        "/intakes/delete_intake",
        "DELETE",
        {
          intake_id,
        },
        userContext.accessToken
      );

      if (!res.ok) {
        throw new Error("failed to delete intake");
      }

      return res;
    } catch (error) {
      console.error(error.message);
    }
  };

  return useMutation({
    mutationFn: deleteIntake,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getTodayIntakes"] }),
  });
};

export default useDeleteIntake;
