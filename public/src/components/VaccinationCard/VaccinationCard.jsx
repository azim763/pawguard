import React,{useState} from "react";
import Typography from "../Typography/Typography";
import DeleteSVG from "../SVG/DeleteSVG";
import styles from "./VaccinationCard.module.css";
import axios from "axios"
import {
  deletePetVaccinationByIdRoute,

} from "../../utils/APIRoutes.js";
import Modal from "react-modal"; 
import modalStyles from "../Modal/Modal.module.css";
Modal.setAppElement('#root');

const VaccinationCard = ({ VaccineName, VaccineDate, VaccineId,onDelete }) => {


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    
    axios.delete(`${deletePetVaccinationByIdRoute}/${VaccineId}`) 
      .then(response => {
        console.log(`Log entry with ID ${VaccineId} deleted successfully.`);
        onDelete();
      })
      .catch(error => {
        console.error(`Error deleting log entry with ID ${VaccineId}:`, error);
      });
      setIsDeleteModalOpen(false);

  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal without performing the delete
    setIsDeleteModalOpen(false);
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
      <Modal
        isOpen={isDeleteModalOpen}
        contentLabel="Delete Confirmation"
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className={modalStyles.modal} // Apply the modal styles
        overlayClassName={modalStyles.overlay} // You can also style the overlay
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this Vaccination card?</p>
        <div className={modalStyles.CardButtonGroup}>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default VaccinationCard;
