import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DashCalendarCard from "../DashCalendarCard/DashCalendarCard";
import DashCalendarCardMed from "../DashCalendarCardMed/DashCalendarCardMed";
import styles from "./calendar.module.css";
import "./calendar.css";
import Typography from "../Typography/Typography";
import { SelectedElement } from "rsuite/esm/Picker";

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
    if (!selectedDate) return [];

    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();

    const formattedDay = String(selectedDay).padStart(2, "0");
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    const selectedDateStr = `${formattedDay}-${formattedMonth}-${selectedYear}`;

    const duplicateObjectWithUpdatedDate = (obj, daysToAdd) => {
      const newObj = { ...obj };
      const originalDate = new Date(obj.MedicationDate);
      const newDate = new Date(
        originalDate.setDate(originalDate.getDate() + daysToAdd)
      );
      const formattedDate =
        newDate.getDate().toString().padStart(2, "0") +
        "-" +
        (newDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        newDate.getFullYear();

      newObj.MedicationDate = formattedDate;
      return newObj;
    };

    const createDuplicatedArray = (petMedications) => {
      let duplicatedArray = [];
      petMedications.forEach((obj) => {
        const medicationPeriod = parseInt(obj.MedicationPeriod, 10);
        for (let i = 0; i < medicationPeriod; i++) {
          duplicatedArray.push(duplicateObjectWithUpdatedDate(obj, i));
        }
      });
      return duplicatedArray;
    };

    const newArray = createDuplicatedArray(petMedications);
    for (let i = 0; i < petAppointments.length; i++) {
      newArray.push(petAppointments[i]);
    }

    const parseDate = (dateString) => {
      const [day, month, year] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const sortedArray = newArray.sort((a, b) => {
      const dateA = parseDate(a.MedicationDate || a.AppointmentDate);
      const dateB = parseDate(b.MedicationDate || b.AppointmentDate);

      if (dateA.getTime() === dateB.getTime()) {
        const timeA = a.MedicineTime || a.AppointmentTime;
        const timeB = b.MedicineTime || b.AppointmentTime;

        return timeA.localeCompare(timeB);
      }

      return dateA - dateB;
    });

    const petData = localStorage.getItem("petsData");
    const petArray = JSON.parse(petData);
    const petIdNameArray = [];

    petArray.forEach((pet) => {
      petIdNameArray.push({ id: pet._id, name: pet.PetName });
    });
    const matchingEvents = sortedArray
    .filter(
      (event) =>
        event.AppointmentDate === selectedDateStr ||
        event.MedicationDate === selectedDateStr
    )
    .map((event) => ({ ...event }));

    matchingEvents.forEach((event) => {
      const petInfo = petIdNameArray.find((pet) => pet.id === event.PetID);

      if (petInfo) {
        event.PetName = petInfo.name;
      } else {
        event.PetName = "Unknown Pet";
      }
    });
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

    const matchingAppointment = petAppointments.find(
      (event) => event.AppointmentDate === selectedDateStr
    );

    if (matchingAppointment) {
      return <Badge className="calendar-todo-item-badge-appointment" />;
    }

    const duplicateObjectWithUpdatedDate = (obj, daysToAdd) => {
      const newObj = { ...obj };
      const originalDate = new Date(obj.MedicationDate);
      const newDate = new Date(
        originalDate.setDate(originalDate.getDate() + daysToAdd)
      );
      const formattedDate =
        newDate.getDate().toString().padStart(2, "0") +
        "-" +
        (newDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        newDate.getFullYear();

      newObj.MedicationDate = formattedDate;
      return newObj;
    };

    const createDuplicatedArray = (petMedications) => {
      let duplicatedArray = [];
      petMedications.forEach((obj) => {
        const medicationPeriod = parseInt(obj.MedicationPeriod, 10);
        for (let i = 0; i < medicationPeriod; i++) {
          duplicatedArray.push(duplicateObjectWithUpdatedDate(obj, i));
        }
      });
      return duplicatedArray;
    };

    const newArray = createDuplicatedArray(petMedications);

    const matchingMedication = newArray.find(
      (event) => event.MedicationDate === selectedDateStr
    );

    if (matchingMedication) {
      return <Badge className="calendar-todo-item-badge-appointment" />;
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

      {selectedDate &&
        getSelectedEvents().length > 0 && (
          <div>
            <Typography
              variant="sub-poppins-medium"
              color="dark-blue"
              style={{ textAlign: "center", margin: "12px 0" }}
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
                {item.hasOwnProperty("AppointmentReason") && (
                  <DashCalendarCard
                    petName={item.PetName}
                    cardTime={item.AppointmentTime}
                    aptReason={item.AppointmentReason}
                    clinicName={item.ClinicName}
                  />
                )}
                {item.hasOwnProperty("MedicineName") && (
                  <DashCalendarCardMed
                    petName={item.PetName}
                    MedicineTime={item.MedicineTime}
                    MedicineName={item.MedicineName}
                    DosageAmount={item.DosageAmount}
                  />
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default DashCalendar;
