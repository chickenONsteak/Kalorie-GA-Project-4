import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

// THIS IS A CUSTOM HOOK TO GET TODAY'S INTAKES WITH TANSTACK FOR REUSABILITY
const useGetTodayIntake = () => {
  const fetchData = useFetch();
  const userContext = useContext(UserContext);

  const getTodayIntakes = async () => {
    try {
      const decoded = jwtDecode(userContext.accessToken);

      const res = await fetchData(
        "/intakes/view_today_intakes",
        "POST",
        {
          user_id: decoded.user_id,
        },
        userContext.accessToken
      );

      if (!res.ok) {
        throw new Error("error getting today's intake");
      }
      return res;
    } catch (error) {
      console.error(error.message);
    }
  };

  return useQuery({
    queryKey: ["getTodayIntakes"],
    queryFn: getTodayIntakes,
    enabled: !!userContext.accessToken, // SO THAT THE FUNCTION WON'T BE CALLED WHEN USER ISN'T LOGGED IN
  });
};

export default useGetTodayIntake;
