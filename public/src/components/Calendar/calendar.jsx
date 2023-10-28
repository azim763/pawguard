import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllPetAppointmentsRoute } from "../../utils/APIRoutes";
import { Calendar, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DashCalendarCard from "../DashCalendarCard/DashCalendarCard";
import styles from "./calendar.module.css";
import "./calendar.css"
import Typography from "../Typography/Typography";

const DashCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [petAppointments, setPetAppointments] = useState([]);

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

    const formattedDay = String(selectedDay).padStart(2, '0');
    const formattedMonth = String(selectedMonth).padStart(2, '0');
    const selectedDateStr = `${formattedDay}-${formattedMonth}-${selectedYear}`;

    const matchingEvents = petAppointments.filter(
      (event) => event.AppointmentDate === selectedDateStr
    );

    console.log(selectedDateStr);
    console.log(matchingEvents);
    console.log(matchingEvents.length);
    return matchingEvents
  }

  function handleDateSelect(selectedDate) {
    setSelectedDate(selectedDate);
  }

  function renderCell(selectedDate) {
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();

    const formattedDay = String(selectedDay).padStart(2, '0');
    const formattedMonth = String(selectedMonth).padStart(2, '0');
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
      <Typography variant="sub-h2-poppins-medium" color="dark-blue" style={{textAlign: "center", margin: "24px 0"}}>
      {formatDate(selectedDate)}
      </Typography>
          {getSelectedEvents().map((item, index) => (
            <div key={index}>
              <DashCalendarCard
              petName="Oreo"
              cardTime= {item.AppointmentTime}
              aptReason= {item.AppointmentReason}
              clinicName= {item.ClinicName}

              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashCalendar;
