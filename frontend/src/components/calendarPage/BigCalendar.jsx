import React from "react";
import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
} from "react-big-calendar";
import dayjs from "dayjs";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

const myEventsList = [
  {
    title: "Meeting",
    start: new Date(2025, 8, 10, 10, 0), // year, monthIndex (0-based), day, hour, min
    end: new Date(2025, 8, 10, 11, 0),
  },
  {
    title: "Lunch",
    start: new Date(2025, 8, 11, 12, 0),
    end: new Date(2025, 8, 11, 13, 0),
  },
];

const BigCalendar = (props) => {
  //   const [date, setDate] = useState(new Date(2025, 11, 16, 10, 0));

  //   const handleNavigate = (newDateFocus) => {
  //     setDate(newDateFocus);
  //   };

  return (
    <div>
      <ReactBigCalendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]} // i only want to view month, no need for week & day view
        toolbar={false}
        // onNavigate={handleNavigate}
        date={new Date(2025, 8, 16)} // sets the displayed month
      />
    </div>
  );
};

export default BigCalendar;
