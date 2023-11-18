import React from "react";
import styles from "./petSelectionInsurance.module.css";
import Typography from "../Typography/Typography";

const PetSelectionInsurance = ({
  imgUrl,
  alt,
  PetName,
  onClick,
  selected,
}) => {
  const handleSelectionClick = () => {
    onClick(PetName);
  };

  return (
    <div
      className={`${styles.petSelection} ${selected ? styles.selected : ""}`}
      onClick={handleSelectionClick}
    >
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img src={`data:image/jpeg;base64,${imgUrl}`} alt={alt} />
        </div>
        <div
          className={styles.petInfo}
        >
          <Typography variant="h2-poppins-semibold">{PetName}</Typography>
        </div>
      </div>
    </div>
  );
};

export default PetSelectionInsurance;
