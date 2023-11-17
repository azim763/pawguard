import React from "react";
import Typography from "../Typography/Typography";
import styles from "./dashAptCard.module.css";
import DoctorSVG from "./../SVG/DoctorSVG";

const DashAptCard = ({ numOfApt, ...props }) => {
  return (
    <div className={`${styles["apt-card-container"]}`}>
      <div className={`${styles["icon-container"]}`}>
        <DoctorSVG width="65" height="65" />
      </div>

      <div style= {{maxWidth: '130px'}}>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {numOfApt}
        </Typography>

        <Typography variant="textfield-poppins-regular" color="almost-black">
          Upcoming Appointments
        </Typography>
      </div>

    </div>
  );
};

export default React.memo(DashAptCard);
