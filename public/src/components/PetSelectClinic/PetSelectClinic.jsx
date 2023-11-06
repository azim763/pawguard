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
    onClick(specialties);
    // setIsSelected(true);
  };

  return (
    <div
      className={selected ? styles.petSelect : styles.petNotSelect}
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
