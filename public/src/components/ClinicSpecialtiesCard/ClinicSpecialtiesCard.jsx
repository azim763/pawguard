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
        <Typography variant="sub-poppins-medium">Specialties</Typography>
      </div>
      <div className={`${styles["specialties-container"]}`}>
        <ul className={styles.specialtyList}>
          {specialtiesCardArray.map((item, index) => (
            <li className={styles.specialtyContent} key={index}>
              <Typography variant="body2-poppins-medium">{item}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClinicSpecialtiesCard;
