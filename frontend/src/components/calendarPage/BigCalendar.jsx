"use client";

import * as React from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

const BigCalendar = () => {
  const [range, setRange] = React.useState({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 5, 17),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={range?.from}
      selected={range}
      onSelect={setRange}
      numberOfMonths={1}
      captionLayout="dropdown"
      className="rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)] w-full"
      formatters={{
        formatMonthDropdown: (date) => {
          return date.toLocaleString("default", { month: "long" });
        },
      }}
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          const events = [
            { title: "Meeting", date: "2025-06-12" },
            { title: "Lunch", date: "2025-06-12" },
          ];

          const dayEvents = events.filter(
            (e) => e.date === day.date.toISOString().split("T")[0] // comparing yyyy-mm-dd
          );

          return (
            <CalendarDayButton day={day} modifiers={modifiers} {...props}>
              {children}
              {dayEvents.map((event, i) => (
                <div key={i} className="text-xs text-blue-500">
                  {event.title}
                </div>
              ))}
            </CalendarDayButton>
          );
        },
      }}
    />
  );
};

export default BigCalendar;
