import React from "react";
import Typography from "../Typography/Typography";
import DeleteSVG from "../SVG/DeleteSVG";
import styles from "./VaccinationCard.module.css";
import axios from "axios"
import {
  deletePetVaccinationByIdRoute,

} from "../../utils/APIRoutes.js";

const VaccinationCard = ({ VaccineName, VaccineDate, VaccineId,onDelete }) => {
  const handleDeleteClick = () => {
    
    axios.delete(`${deletePetVaccinationByIdRoute}/${VaccineId}`) 
      .then(response => {
        console.log(`Log entry with ID ${VaccineId} deleted successfully.`);
        onDelete();
      })
      .catch(error => {
        console.error(`Error deleting log entry with ID ${VaccineId}:`, error);
      });
  };
  return (
    <div className={styles.vaccinationCardContainer}>
      <div className={styles.firstRow}>
        <div>
          <Typography variant="body1-poppins-semibold">
            Vaccination Name
          </Typography>
          <Typography variant="body3-poppins-regular">{VaccineName}</Typography>
        </div>
        <div>
          <DeleteSVG width="30" height="30" onClick={handleDeleteClick}/>
        </div>
      </div>

      <div className={styles.secondRow}>
        <Typography variant="body1-poppins-semibold">Date</Typography>
        <Typography variant="body3-poppins-regular">{VaccineDate}</Typography>
      </div>
    </div>
  );
};

export default VaccinationCard;
