import React from "react";
import Typography from "../Typography/Typography";
import styles from "./AppointmentCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";
import axios from "axios"
import {
  deletePetAppointmentByIdRoute,

} from "../../utils/APIRoutes.js";

const AppointmentCard = ({ ClinicName, AppointmentTime, AppointmentReason, AppointmentDateTime,AppointmentId,onDelete }) => {
  const handleAppointmentDelete = () => {
    
    axios.delete(`${deletePetAppointmentByIdRoute}/${AppointmentId}`) 
      .then(response => {
        console.log(`Log entry with ID ${AppointmentId} deleted successfully.`);
        onDelete();
      })
      .catch(error => {
        console.error(`Error deleting log entry with ID ${AppointmentId}:`, error);
      });
  };
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
          <DeleteSVG width="30px" height="30px" onClick={handleAppointmentDelete}/>
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
