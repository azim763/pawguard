import React from "react";
import styles from "./petSelectClinic.module.css";
import Typography from "../Typography/Typography";

const PetSelectionClinic = ({ specialties, imgUrl, alt, onClick, clinicPetName }) => {
  const handleClick = () => {
    onClick(specialties);
  };

  return (
    <div className={styles.petSelect} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img src={`data:image/jpeg;base64,${imgUrl}`} alt={alt} />
      </div>
      <Typography variant="sub-poppins-medium">{clinicPetName}</Typography>
    </div>
  );
};

export default PetSelectionClinic;
