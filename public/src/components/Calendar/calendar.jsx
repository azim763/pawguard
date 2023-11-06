import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DashCalendarCard from "../DashCalendarCard/DashCalendarCard";
import styles from "./calendar.module.css";
import "./calendar.css";
import Typography from "../Typography/Typography";

const DashCalendar = ({ petAppointments, pets }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getSelectedEvents() {
    if (!selectedDate) return []; // If no date is selected, return an empty array

    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();

    const formattedDay = String(selectedDay).padStart(2, "0");
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    const selectedDateStr = `${formattedDay}-${formattedMonth}-${selectedYear}`;

  
    const petData = localStorage.getItem("petsData");
    const petArray = JSON.parse(petData);
    console.log(petArray);
    console.log(petAppointments)
    const petIdNameArray = [];

    petArray.forEach((pet) => {
      petIdNameArray.push({ id: pet._id, name: pet.PetName });
    });
    const matchingEvents = petAppointments
    .filter((event) => event.AppointmentDate === selectedDateStr)
    .map((event) => ({ ...event }));
  
  matchingEvents.forEach((event) => {
    const petInfo = petIdNameArray.find((pet) => pet.id === event.PetID);

    if (petInfo) {
      event.PetName = petInfo.name;
    } else {
      event.PetName = "Unknown Pet";
    }
  });

    console.log(selectedDateStr);
    console.log(matchingEvents);
    console.log(matchingEvents.length);
    return matchingEvents;
  }

  function handleDateSelect(selectedDate) {
    setSelectedDate(selectedDate);
  }

  function renderCell(selectedDate) {
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();

    const formattedDay = String(selectedDay).padStart(2, "0");
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    const selectedDateStr = `${formattedDay}-${formattedMonth}-${selectedYear}`;

    const matchingEvent = petAppointments.find(
      (event) => event.AppointmentDate === selectedDateStr
    );

    if (matchingEvent) {
      return <Badge className="calendar-todo-item-badge" />;
    }
    return null;
  }

  return (
    <div className={styles.calendar}>
      <Calendar
        compact
        bordered
        renderCell={renderCell}
        onSelect={handleDateSelect}
      />

      {selectedDate && getSelectedEvents().length > 0 && (
        <div>
          <Typography
            variant="sub-poppins-medium"
            color="dark-blue"
            style={{ textAlign: "center", margin: "24px 0" }}
          >
            {formatDate(selectedDate)}
          </Typography>
          {getSelectedEvents().map((item, index) => (
            <div key={index}>
              <DashCalendarCard
                petName={item.PetName}
                cardTime={item.AppointmentTime}
                aptReason={item.AppointmentReason}
                clinicName={item.ClinicName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashCalendar;
