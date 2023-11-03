import React, { useState } from "react";
import Typography from "../Typography/Typography";
import DeleteSVG from "../SVG/DeleteSVG";
import styles from "./petLogCard.module.css";
import axios from "axios";
import { deletePetLogByIdRoute } from "../../utils/APIRoutes.js";
import Modal from "react-modal";
import modalStyles from "../Modal/Modal.module.css";
Modal.setAppElement("#root");

const PetLogCard = ({ PetLogDate, PetLogTime, logId, onDelete }) => {
  const date = new Date(PetLogTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${deletePetLogByIdRoute}/${logId}`)
      .then((response) => {
        console.log(`Log entry with ID ${logId} deleted successfully.`);
        onDelete();
      })
      .catch((error) => {
        console.error(`Error deleting log entry with ID ${logId}:`, error);
      });
    setIsDeleteModalOpen(false);
  };
  const handleCancelDelete = () => {
    // Close the delete confirmation modal without performing the delete
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles.petlogcardContainer}>
      <div>
        <div>
          <Typography variant="body1-poppins-semibold">Date</Typography>
          <Typography variant="body3-poppins-regular">{PetLogDate}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1-poppins-semibold">Time</Typography>
        <Typography variant="body3-poppins-regular">{timeString}</Typography>
      </div>

      <div>
        <DeleteSVG width="30" height="30" onClick={handleDeleteClick} />
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        contentLabel="Delete Confirmation"
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className={modalStyles.modal} // Apply the modal styles
        overlayClassName={modalStyles.overlay} // You can also style the overlay
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this PetLog card?</p>
        <div className={modalStyles.CardButtonGroup}>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default PetLogCard;
