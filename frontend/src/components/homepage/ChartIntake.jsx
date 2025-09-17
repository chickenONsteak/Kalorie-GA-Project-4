import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const ChartIntake = () => {
  const chartData = [
    { dayOfWeek: "Monday", desktop: 186, mobile: 80 },
    { dayOfWeek: "Tuesday", desktop: 305, mobile: 200 },
    { dayOfWeek: "Wednesday", desktop: 237, mobile: 120 },
    { dayOfWeek: "Thursday", desktop: 73, mobile: 190 },
    { dayOfWeek: "Friday", desktop: 209, mobile: 130 },
    { dayOfWeek: "Saturday", desktop: 214, mobile: 140 },
    { dayOfWeek: "Sundary", desktop: 214, mobile: 140 },
  ];

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
  );
};

export default ChartIntake;
