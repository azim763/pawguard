import React from "react";
import Typography from "../Typography/Typography";
import DeleteSVG from "../SVG/DeleteSVG";
import styles from "./petLogCard.module.css";
import axios from "axios"
import {
  deletePetLogByIdRoute,

} from "../../utils/APIRoutes.js";


const PetLogCard = ({ PetLogDate, PetLogTime,logId, onDelete }) => {
  const date = new Date(PetLogTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;
 
  const handleDeleteClick = () => {
    
    axios.delete(`${deletePetLogByIdRoute}/${logId}`) 
      .then(response => {
        console.log(`Log entry with ID ${logId} deleted successfully.`);
        onDelete();
      })
      .catch(error => {
        console.error(`Error deleting log entry with ID ${logId}:`, error);
      });
  };

  return (
    <div className={styles.petlogcardContainer}>
      <div>
        <div>
          <Typography variant="body1-poppins-semibold">Time</Typography>
          <Typography variant="body3-poppins-regular">{timeString}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1-poppins-semibold">Date</Typography>
        <Typography variant="body3-poppins-regular">{PetLogDate}</Typography>
      </div>
      <div>
        <DeleteSVG width="30" height="30"  onClick={handleDeleteClick}/>
      </div>
    </div>
  );
};

export default PetLogCard;
