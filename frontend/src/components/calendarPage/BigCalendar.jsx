"use client";
import { useContext } from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import useFetch from "../../hooks/useFetch";
import UserContext from "../../contexts/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

const BigCalendar = () => {
  const fetchData = useFetch();
  const today = new Date();
  const userContext = useContext(UserContext);

  const getAllNutritionalIntakes = async () => {
    try {
      const decoded = jwtDecode(userContext.accessToken);
      const res = await fetchData(
        "/intakes/view_all_nutritional_intakes",
        "POST",
        {
          user_id: decoded.user_id,
        }
      );

      return res;
    } catch (error) {
      console.error(error.message);
    }
  };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["getAllNutritionalIntakes"],
    queryFn: getAllNutritionalIntakes,
    enabled: !!userContext.accessToken,
  });

  return (
    <>
      <Calendar
        mode="single"
        defaultMonth={today}
        // selected={range} // <- WILL NEED THIS FOR USERS TO SELECT THE SPECIFIC DATE AND SEE DETAILED INFO FOR THAT DAY
        // onSelect={setRange} // <- WILL NEED THIS FOR USERS TO SELECT THE SPECIFIC DATE AND SEE DETAILED INFO FOR THAT DAY
        numberOfMonths={1}
        captionLayout="dropdown"
        className="rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)] w-[800px]"
        formatters={{
          formatMonthDropdown: (date) => {
            return date.toLocaleString("default", { month: "long" });
          },
        }}
        components={{
          DayButton: ({ children, modifiers, day, ...props }) => {
            let dayIntakes = [];
            if (isSuccess) {
              // dayIntakes = data.data.filter((intake) => {
              //   console.log(intake);
              //   intake.intake_date === day.date.toISOString().split("T")[0];
              // }); // comparing yyyy-mm-dd
              dayIntakes = data.data.filter((intake) => {
                const intakeDate = new Date(
                  intake.intake_date
                ).toLocaleDateString("en-CA"); // "YYYY-MM-DD"
                const dayDate = day.date.toLocaleDateString("en-CA", {
                  timeZone: "Asia/Singapore",
                }); // "YYYY-MM-DD"
                return intakeDate === dayDate;
              });
            }

            return (
              <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                {children}
                {dayIntakes.map((intake, i) => (
                  <div key={i} className="flex flex-col text-xs text-blue-500">
                    <span>{intake.total_calories}</span>
                    <span> {intake.total_carbohydrates}</span>
                    <span> {intake.total_protein}</span>
                    <span> {intake.total_fats}</span>
                  </div>
                ))}
              </CalendarDayButton>
            );
          },
        }}
      />
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default BigCalendar;
