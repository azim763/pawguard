import React, { useState, useEffect } from "react";
import styles from "./clinicSpecialtiesCard.module.css";
import Typography from "../Typography/Typography";

const ClinicSpecialtiesCard = ({ specialtiesCardString }) => {
  const [specialtiesCardArray, setSpecialtiesCardArray] = useState([]);

  useEffect(() => {
    const specialtiesCardArray = specialtiesCardString.split(",");
    setSpecialtiesCardArray(specialtiesCardArray);
  }, [specialtiesCardString]);

  return (
    <div className={`${styles["specialty-card-container"]}`}>
      <div className={`${styles["heading-container"]}`}>
        <Typography variant="sub-h1-poppins-semibold">Specialties</Typography>
      </div>
      <div className={`${styles["specialties-container"]}`}>
        <ul style={{ paddingLeft: "5%" }}>
        <Typography variant=".sub-poppins-medium">
          {specialtiesCardArray.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          </Typography>
        </ul>
      </div>
    </div>
  );
};

export default ClinicSpecialtiesCard;
