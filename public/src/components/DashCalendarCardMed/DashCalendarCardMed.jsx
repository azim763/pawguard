import React from 'react';
import ClockSVG from "../SVG/ClockSVG";
import Typography from "../Typography/Typography";
import styles from "./DashCalendarCardMed.module.css"

const DashCalendarCardMed = ({ petName, MedicineTime, MedicineName, DosageAmount }) => {
  return (
    <div className={styles.dashCalendarCardMed}>
      <Typography variant="sub-poppins-medium" color="dark-blue">
        {petName}
      </Typography>
      <div className={styles.calendarTime}>
        <ClockSVG width="26" height="27"/>
        <Typography variant="detailtext1-poppins-medium" color="almost-black">
          {MedicineTime}
        </Typography>
      </div>
      <Typography variant="body2-poppins-medium" color="dark-blue">
        {MedicineName}
      </Typography>
      <Typography variant="detailtext1-poppins-medium" color="almost-black">
        {DosageAmount} ml
      </Typography>
    </div>
  )
}

export default DashCalendarCardMed
