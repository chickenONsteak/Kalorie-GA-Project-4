import React, { useContext } from "react";
import useFetch from "./useFetch";
import { jwtDecode } from "jwt-decode";
import UserContext from "../contexts/user";
import { useQuery } from "@tanstack/react-query";

const useGetAllIntakes = () => {
  const fetchData = useFetch();
  const userContext = useContext(UserContext);

  const getAllIntakes = async () => {
    try {
      const decoded = jwtDecode(userContext.accessToken);

      const res = await fetchData("/goals/view_goals", "POST", {
        user_id: decoded.user_id,
      });

      if (!res.ok) {
        throw new Error("error getting all goals");
      }
      return res;
    } catch (error) {
      console.error(error.message);
    }
  };

  return useQuery({
    queryKey: ["getAllIntakes"],
    queryFn: getAllIntakes,
    enabled: !!userContext.accessToken, // SO THAT THE FUNCTION WON'T BE CALLED WHEN USER ISN'T LOGGED IN
  });
};

export default useGetAllIntakes;
