import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DashCalendarCard from "../DashCalendarCard/DashCalendarCard";
import DashCalendarCardMed from "../DashCalendarCardMed/DashCalendarCardMed";
import styles from "./calendar.module.css";
import "./calendar.css";
import Typography from "../Typography/Typography";

const DashCalendar = ({ petAppointments, petMedications }) => {
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
    console.log(petAppointments);
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

  function getUserMeds() {
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
    console.log(petMedications);
    const petIdNameArray = [];

    petArray.forEach((pet) => {
      petIdNameArray.push({ id: pet._id, name: pet.PetName });
    });
    const matchingEvents = petMedications
      .filter((event) => event.MedicationDate === selectedDateStr)
      .map((event) => ({ ...event }));

    matchingEvents.forEach((event) => {
      const petInfo = petIdNameArray.find((pet) => pet.id === event.PetID);

      if (petInfo) {
        event.PetName = petInfo.name;
      } else {
        event.PetName = "Unknown Pet";
      }
    });
    console.log(matchingEvents);
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
    
    // console.log(selectedDate);
    const matchingAppointment = petAppointments.find(
      (event) => event.AppointmentDate === selectedDateStr
    );

    if (matchingAppointment) {
      return <Badge className="calendar-todo-item-badge-appointment" />;
    }

    // const matchingMedication = petMedications.find(
    //   (event) => event.MedicationDate === selectedDateStr
    // );

    // if (matchingMedication) {
    //   const [day, month, year] = matchingMedication.MedicationDate.split("-");
    //   const startMedicationDate = new Date(year, month - 1, day);
    //   const endMedicationDate = new Date(startMedicationDate);
    //   endMedicationDate.setDate(endMedicationDate.getDate() + parseInt(matchingMedication.MedicationPeriod));
  
    //   console.log(startMedicationDate);
    //   console.log(endMedicationDate);
    //   console.log(selectedDate)

    //   if (selectedDate >= startMedicationDate && selectedDate <= endMedicationDate) {
    //     return <Badge className="calendar-todo-item-badge-medication" />;
    //   }
    // }

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

      {selectedDate &&
        (getSelectedEvents().length > 0 || getUserMeds().length > 0) && (
          <div>
            <Typography
              variant="sub-poppins-medium"
              color="dark-blue"
              style={{ textAlign: "center", margin: "24px 0" }}
            >
              {formatDate(selectedDate)}
            </Typography>
            <div className={styles.legend}>
              <div className={styles.legendapt}>
                <div></div>
                <Typography
                  variant="detailtext1-poppins-medium"
                  color="almost-black"
                >
                  Appointments
                </Typography>
              </div>
              <div className={styles.legendmed}>
                <div></div>
                <Typography
                  variant="detailtext1-poppins-medium"
                  color="almost-black"
                >
                  Medications
                </Typography>
              </div>
            </div>
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
            {getUserMeds().map((item, index) => (
              <div key={index}>
                <DashCalendarCardMed
                  petName={item.PetName}
                  MedicineTime={item.MedicineTime}
                  MedicineName={item.MedicineName}
                  DosageAmount={item.DosageAmount}
                />
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default DashCalendar;
