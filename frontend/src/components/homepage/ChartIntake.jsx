import React, { useContext, useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import useFetch from "../../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import UserContext from "../../contexts/user";

const ChartIntake = () => {
  const [past7Days, setPast7Days] = useState([]);
  const [weeklyNutritions, setWeeklyNutritions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const fetchData = useFetch();
  const userContext = useContext(UserContext);

  const calculateDates = () => {
    const today = new Date();
    const past7DaysArr = [];

    // ARRAY IS ARRANGED FROM PAST TO PRESENT
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      past7DaysArr.push(date.toLocaleDateString("en-CA", { weekday: "short" }));
    }

    setPast7Days(past7DaysArr);
  };

  const getWeeklyNutritionalIntake = async () => {
    try {
      const decoded = jwtDecode(userContext.accessToken);

      const res = await fetchData(
        "/intakes/view_past_week_nutritional_intakes",
        "POST",
        {
          user_id: decoded.user_id,
        }
      );

      if (res.ok) {
        setWeeklyNutritions(res.data);
      }
    } catch (error) {
      console.error(error.msg);
    }
  };

  const populateChartData = () => {
    // ITERATE THROUGH past7Days INSTEAD OF weeklyNutritions SO THAT YOU CAN ITERATE THE ENTIRE WEEK (length of weeklyNutritions depend on whether user had input anything)
    // IF USER HAS LOGGED SOMETHING (appears in weeklyNutritions), CAPTURE THE TOTALS, ELSE SHOW 0 FOR THE TOTALS
    const data = past7Days.map((day, index) => {
      // find for matching days (whether the user logged any intake in the day of the week)
      const matchedIntake = weeklyNutritions.find((intake) => {
        const intakeDateStr = new Date(intake.intake_date).toLocaleDateString(
          "en-CA",
          { weekday: "short" }
        );
        return intakeDateStr === day;
      });

      // capture day of the week regardless of whether user logged any intake or not
      return {
        dayOfWeek: index === past7Days.length - 1 ? "Today" : day,
        // totalCalories: matchedIntake ? matchedIntake.total_calories : 0,
        totalCarbs: matchedIntake ? matchedIntake.total_carbohydrates : 0,
        totalProtein: matchedIntake ? matchedIntake.total_protein : 0,
        totalFats: matchedIntake ? matchedIntake.total_fats : 0,
      };
    });

    // finally set the populated data
    setChartData(data);
  };

  // POPULATE past7Days AND weeklyNutritions FIRST BEFORE POPULATING CHART DATA
  useEffect(() => {
    calculateDates(), getWeeklyNutritionalIntake();
  }, []);

  // POPULATE CHART DATA
  useEffect(() => {
    if (past7Days && weeklyNutritions) populateChartData();
  }, [past7Days, weeklyNutritions]);

  // MANIPULATE THIS TO CHANGE THE CHART'S LEGEND AND COLOURS
  const chartConfig = {
    // totalCalories: {
    //   label: "Calories",
    //   color: "var(--chart-1)",
    // },
    totalCarbs: {
      label: "Carbs",
      color: "var(--chart-2)",
    },
    totalProtein: {
      label: "Protein",
      color: "var(--chart-3)",
    },
    totalFats: {
      label: "Fats",
      color: "var(--chart-4)",
    },
  };

  return (
    <>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="dayOfWeek"
            tickLine={false}
            tickMargin={8}
            axisLine={true}
            interval={0} // ENSURE ALL TICKS ARE DISPLAYED
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={true}
            content={<ChartTooltipContent indicator="line" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          {/* <Area
            dataKey="totalCalories"
            type="natural"
            fill={chartConfig.totalCalories.color}
            fillOpacity={0.4}
            stroke={chartConfig.totalCalories.color}
            //   stackId="a" // <- THIS IS FOR STACKED CHART, CHANGE IF YOU WANT STACKED
          /> */}
          <Area
            dataKey="totalCarbs"
            type="natural"
            fill={chartConfig.totalCarbs.color}
            fillOpacity={0.4}
            stroke={chartConfig.totalCarbs.color}
            //   stackId="a" // <- THIS IS FOR STACKED CHART, CHANGE IF YOU WANT STACKED
          />
          <Area
            dataKey="totalProtein"
            type="natural"
            fill={chartConfig.totalProtein.color}
            fillOpacity={0.4}
            stroke={chartConfig.totalProtein.color}
            //   stackId="a" // <- THIS IS FOR STACKED CHART, CHANGE IF YOU WANT STACKED
          />
          <Area
            dataKey="totalFats"
            type="natural"
            fill={chartConfig.totalFats.color}
            fillOpacity={0.4}
            stroke={chartConfig.totalFats.color}
            //   stackId="a" // <- THIS IS FOR STACKED CHART, CHANGE IF YOU WANT STACKED
          />
        </AreaChart>
      </ChartContainer>
      <p>{JSON.stringify(past7Days)}</p>
    </>
  );
};

export default ChartIntake;
