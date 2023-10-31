import React from "react";
import Typography from "../Typography/Typography";
import styles from "./dashAptCard.module.css";
import { useNavigate } from "react-router-dom";
import DoctorSVG from "./../SVG/DoctorSVG";

const DashAptCard = ({ numOfApt, ...props }) => {
  return (
    <div className={`${styles["apt-card-container"]}`}>
      <div className={`${styles["icon-container"]}`}>
        <DoctorSVG width="80" height="80" />
      </div>

      <div>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {numOfApt}
        </Typography>

        <Typography variant="textfield-poppins-regular" color="almost-black">
          Upcoming Appointments
        </Typography>
      </div>

      {/* <div>
        <Typography variant="detailtext1-poppins-medium" color="dark-blue">
          <a>See Details</a>
        </Typography>
      </div> */}
    </div>
  );
};

export default React.memo(DashAptCard);
