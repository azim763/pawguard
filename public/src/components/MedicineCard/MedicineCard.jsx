import React from "react";
import Typography from "../Typography/Typography";
import styles from "./MedicineCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";

const MedicineCard = ({
  medicineName,
  dosage,
  startDate,
  Period,
  medicationTime,
}) => {
  return (
    <div className={styles.medicineCardContainer}>
      <div className={styles.firstRow}>
        <div>
          <Typography variant="body1-poppins-semibold">
            Medicine Name
          </Typography>
          <Typography variant="body3-poppins-regular">
            {medicineName}
          </Typography>
        </div>
        <div>
          <DeleteSVG width="30" height="30" />
        </div>
      </div>
      <div className={styles.otherRow}>
        <div>
          <Typography variant="body1-poppins-semibold">Dosage</Typography>
          <Typography variant="body3-poppins-regular">{dosage}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Time</Typography>
          <Typography variant="body3-poppins-regular">
            {medicationTime}
          </Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Start date</Typography>
          <Typography variant="body3-poppins-regular">{startDate}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Period</Typography>
          <Typography variant="body3-poppins-regular">{Period}</Typography>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
