import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllPetAppointmentsRoute } from "../../utils/APIRoutes";
import { Calendar, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const DashCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [petAppointments, setPetAppointments] = useState('');

  useEffect(() => {
    axios
      .get(getAllPetAppointmentsRoute)
      .then((response) => {
        console.log(response.data);
        setPetAppointments(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const calendarEvents = [
    {
      day: "1-10",
      schedule: [
        { time: "09:30 pm", title: "Products Introduction Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "02:00 pm", title: "Product design discussion" },
        { time: "05:00 pm", title: "Product test and acceptance" },
        { time: "06:30 pm", title: "Reporting" },
        { time: "10:00 pm", title: "Going home to walk the dog" },
      ],
    },
    {
      day: "27-10",
      schedule: [
        { time: "09:30 pm", title: "Products Introduction Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "02:00 pm", title: "Product design discussion" },
      ],
    },
    {
      day: "13-10",
      schedule: [
        { time: "09:30 pm", title: "Products Introduction Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "12:00 pm", title: "Lunch" },
        { time: "02:00 pm", title: "Product design discussion" },
      ],
    },
    {
      day: "11-10",
      schedule: [{ time: "02:00 pm", title: "Product design discussion" }],
    },
  ];

  // Define a function to get events for the selected date
  function getSelectedEvents() {
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedDateStr = `${selectedDay}-${selectedMonth}`;

    const matchingEvent = calendarEvents.find(
      (event) => event.day === selectedDateStr
    );

    return matchingEvent ? matchingEvent.schedule : [];
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
  }

  function renderCell(date) {
    const selectedDay = date.getDate();
    const selectedMonth = date.getMonth() + 1;
    const selectedDateStr = `${selectedDay}-${selectedMonth}`;

    const matchingEvent = calendarEvents.find(
      (event) => event.day === selectedDateStr
    );

    if (matchingEvent) {
      return <Badge className="calendar-todo-item-badge" />;
    }
    return null;
  }

  return (
    <div>
      <Calendar
        compact
        bordered
        renderCell={renderCell}
        onSelect={handleDateSelect}
      />

      {selectedDate && (
        <div>
          <ul>
            {getSelectedEvents().map((item, index) => (
              <li key={index}>
                {item.time} - {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashCalendar;
