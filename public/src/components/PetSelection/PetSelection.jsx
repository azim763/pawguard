import React, { useState } from "react";
import styles from "./petSelection.module.css";
import Typography from "../Typography/Typography";
import ImageDisplay from "../ImageDisplay/ImageDisplay";

const PetSelection = ({ PetName, PetImageData, onClick }) => {
  return (
    <div
      className={styles.petCard}
      onClick={onClick}
    >
      <ImageDisplay PetImageData={PetImageData} />
      <Typography variant="sub-h1-poppins-semibold">{PetName}</Typography>
    </div>
  );
};

export default PetSelection;
