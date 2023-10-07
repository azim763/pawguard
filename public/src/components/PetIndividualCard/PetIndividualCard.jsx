import React from "react";
import Button from "../Button/Button";
import styles from "./petIndividualCard.module.css";

const PetIndividualCard = ({ imgUrl, headerTxt }) => {
  return (
    <div className={`${styles["pet-in-card-container"]}`}>
      <div className={`${styles["pet-image-container"]}`}>
        <img src={imgUrl} alt={headerTxt + "image"} />
      </div>
      <h2>{headerTxt}</h2>
      <Button variant="pet-profile-btn" label="Visit" />
    </div>
  );
};

export default React.memo(PetIndividualCard);
