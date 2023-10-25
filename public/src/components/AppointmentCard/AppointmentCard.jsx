import React from "react";
import Typography from "../Typography/Typography";
import styles from "./appointmentCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";

const AppointmentCard = ({ ClinicName, AppointmentTime, AppointmentReason, AppointmentDateTime }) => {
  return (
    <div className={styles.appointmentCardContainer}>
      <div className={styles.firstRow}>
        <div>
          <Typography variant="body1-poppins-semibold">Clinic Name</Typography>
          <Typography variant="body3-poppins-regular">{ClinicName}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Time</Typography>
          <Typography variant="body3-poppins-regular">
            {AppointmentTime}
          </Typography>
        </div>
        <div>
          <DeleteSVG width="30px" height="30px"/>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div>
          <Typography variant="body1-poppins-semibold">Purpose</Typography>
          <Typography variant="body3-poppins-regular">{AppointmentReason}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Date</Typography>
          <Typography variant="body3-poppins-regular">
            {AppointmentDateTime}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
