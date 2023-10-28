import React from "react";
import ClockSVG from "../SVG/ClockSVG";
import Typography from "../Typography/Typography";
import styles from "./DashCalendarCard.module.css"

const DashCalendarCard = ( { petName, cardTime, aptReason, clinicName } ) => {
  return (
    <div className={styles.dashCalendarCard}>
      <Typography variant="sub-h2-poppins-medium" color="dark-blue">
        {petName}
      </Typography>
      <div className={styles.calendarTime}>
        <ClockSVG width="26" height="27"/>
        <Typography variant="textfield-poppins-regular" color="almost-black">
          {cardTime}
        </Typography>
      </div>
      <Typography variant="body2-poppins-medium" color="dark-blue">
        {aptReason}
      </Typography>
      <Typography variant="detailtext1-poppins-medium" color="almost-black">
        {clinicName}
      </Typography>
    </div>
  );
}; 

export default DashCalendarCard;
