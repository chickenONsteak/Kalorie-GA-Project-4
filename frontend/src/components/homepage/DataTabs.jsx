import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TableIntake from "./TableIntake";
import ChartIntake from "./ChartIntake";

const DataTabs = () => {
  return (
    <Tabs defaultValue="log" className="w-[800px]">
      <TabsList>
        <TabsTrigger value="log">Log</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
      </TabsList>
      <TabsContent value="log">
        <TableIntake />
      </TabsContent>
      <TabsContent value="trends">
        <ChartIntake />
      </TabsContent>
    </Tabs>
  );
};

export default DataTabs;
