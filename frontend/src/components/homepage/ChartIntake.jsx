import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const ChartIntake = () => {
  const [past7Days, setPast7Days] = useState([]);

  const calculateDates = () => {
    const today = new Date();
    const past7DaysArr = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      past7DaysArr.push(date.toLocaleDateString("en-US", { weekday: "long" }));
    }

    setPast7Days(past7DaysArr);
  };

  useEffect(calculateDates, []);

  // MANIPULATE THIS TO CHANGE YOUR DATA
  const chartData = [
    { dayOfWeek: past7Days[6], desktop: 186, mobile: 80 },
    { dayOfWeek: past7Days[5], desktop: 305, mobile: 200 },
    { dayOfWeek: past7Days[4], desktop: 237, mobile: 120 },
    { dayOfWeek: past7Days[3], desktop: 73, mobile: 190 },
    { dayOfWeek: past7Days[2], desktop: 209, mobile: 130 },
    { dayOfWeek: past7Days[1], desktop: 214, mobile: 140 },
    { dayOfWeek: "Today", desktop: 214, mobile: 140 },
  ];

  // MANIPULATE THIS TO CHANGE THE CHART'S LEGEND AND COLOURS
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
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
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={true}
            content={<ChartTooltipContent indicator="line" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="desktop"
            type="natural"
            fill={chartConfig.desktop.color}
            fillOpacity={0.4}
            stroke={chartConfig.desktop.color}
            //   stackId="a" // <- THIS IS FOR STACKED CHART, CHANGE IF YOU WANT STACKED
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill={chartConfig.mobile.color}
            fillOpacity={0.4}
            stroke={chartConfig.mobile.color}
            //   stackId="a" // <- THIS IS FOR STACKED CHART, CHANGE IF YOU WANT STACKED
          />
        </AreaChart>
      </ChartContainer>
      <p>{past7Days}</p>
    </>
  );
};

export default ChartIntake;
