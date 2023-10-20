import React from "react";
import styles from "./clinicLocationCard.module.css";
import Typography from "../Typography/Typography";
import AlertSVG from "../SVG/AlertSVG";
import ClockSVG from "../SVG/ClockSVG";
import LocationSVG from "../SVG/LocationSVG";

const ClinicLocationCard = ({ address, hours, urgentCare }) => {
  return (
    <div className={`${styles["location-card-container"]}`}>
      <div className={`${styles["heading-container"]}`}>
        <Typography variant="sub-h1-poppins-semibold">Details</Typography>
      </div>
      <div className={`${styles["address-container"]}`}>
        <LocationSVG width="23" height="34" />
        {address}
      </div>
      <div className={`${styles["hours-container"]}`}>
        <ClockSVG width="26" height="27" />
        {hours}
      </div>
      <div className={`${styles["alert-container"]}`}>
        <AlertSVG width="30" height="30" />
        {urgentCare}
      </div>
    </div>
  );
};

export default ClinicLocationCard;
