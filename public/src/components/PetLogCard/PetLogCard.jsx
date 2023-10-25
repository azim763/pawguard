import React from "react";
import Typography from "../Typography/Typography";
import DeleteSVG from "../SVG/DeleteSVG";
import styles from "./petLogCard.module.css";

const PetLogCard = ({ PetLogDate, PetLogTime }) => {
  return (
    <div className={styles.petlogcardContainer}>
      <div>
        <div>
          <Typography variant="body1-poppins-semibold">Time</Typography>
          <Typography variant="body3-poppins-regular">{PetLogDate}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1-poppins-semibold">Date</Typography>
        <Typography variant="body3-poppins-regular">{PetLogTime}</Typography>
      </div>
      <div>
        <DeleteSVG width="30" height="30" />
      </div>
    </div>
  );
};

export default PetLogCard;
