import React from "react";
import styles from "./clinicSpecialtiesCard.module.css";
import Typography from "../Typography/Typography";

const ClinicSpecialtiesCard = ({ specialties }) => {
  return (
    <div className={`${styles["specialty-card-container"]}`}>
      <div className={`${styles["heading-container"]}`}>
        <Typography variant="sub-h1-poppins-semibold">Specialties</Typography>
      </div>
      <div className={`${styles["specialties-container"]}`}>
        <ul style={{paddingLeft: "5%"}}>
          {specialties.map((specialty, index) => (
            <li key={index}>{specialty}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClinicSpecialtiesCard;
