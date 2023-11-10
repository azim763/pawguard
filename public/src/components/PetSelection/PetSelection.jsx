import React, { useState } from "react";
import styles from "./petSelection.module.css";
import Typography from "../Typography/Typography";
import ImageDisplay from "../ImageDisplay/ImageDisplay";

const PetSelection = ({ PetName, PetImageData, onClick ,is }) => {
  return (
    <div
      className={styles.petCard}
      onClick={onClick}
    >
      <div className={styles.imageContainer}>
        <ImageDisplay PetImageData={PetImageData} />
      </div>
      <Typography variant="body2-poppins-medium" color="almost-black">{PetName}</Typography>
    </div>
  );
};

export default PetSelection;
