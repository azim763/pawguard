import React, { useState } from "react";
import styles from "./petSelectClinic.module.css";
import Typography from "../Typography/Typography";

const PetSelectionClinic = ({
  // id,
  specialties,
  imgUrl,
  alt,
  onClick,
  clinicPetName,
  selected,
}) => {
  // const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    // if (isSelected) {
    //   setIsSelected(false); // If it's already selected, unselect it
    // } else {
    onClick(specialties); // Otherwise, select it
    // setIsSelected(true);
    // }
  };

  return (
    <div
      className={`${styles.petSelect} ${selected ? styles.selected : ""}`}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        <img src={`data:image/jpeg;base64,${imgUrl}`} alt={alt} />
      </div>
      <Typography variant="sub-poppins-medium">{clinicPetName}</Typography>
    </div>
  );
};

export default PetSelectionClinic;
