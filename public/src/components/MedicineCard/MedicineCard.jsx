import React from "react";
import Typography from "../Typography/Typography";
import styles from "./MedicineCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";
import axios from "axios";
import { deletePetMedicationByIdRoute } from "../../utils/APIRoutes.js";

const MedicineCard = ({
  medicineName,
  dosage,
  startDate,
  Period,
  medicationTime,
  MedicationId,
  onDelete,
}) => {
  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, "0");
  const day = String(startDate.getDate()).padStart(2, "0");

  const date = new Date(medicationTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;
  const formattedDate = `${day}-${month}-${year}`;
  const handleDeleteClick = () => {
    axios
      .delete(`${deletePetMedicationByIdRoute}/${MedicationId}`)
      .then((response) => {
        console.log(`Log entry with ID ${MedicationId} deleted successfully.`);
        onDelete();
      })
      .catch((error) => {
        console.error(
          `Error deleting log entry with ID ${MedicationId}:`,
          error
        );
      });
  };
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
          <DeleteSVG width="30" height="30" onClick={handleDeleteClick} />
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
            {timeString}
          </Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Start date</Typography>
          <Typography variant="body3-poppins-regular">
            {formattedDate}
          </Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Period</Typography>
          <Typography variant="body3-poppins-regular">{Period} days</Typography>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
