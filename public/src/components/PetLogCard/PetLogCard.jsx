import React, { useState } from "react";
import Typography from "../Typography/Typography";
import DeleteSVG from "../SVG/DeleteSVG";
import styles from "./petLogCard.module.css";
import Button from "../Button/Button";
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
        <Typography variant="sub-h2-poppins-medium">Delete Entry</Typography>
        <hr></hr>
        <Typography variant="body2-poppins-medium">
          This entry will be removed.
        </Typography>
        <div className={modalStyles.CardButtonGroup}>
          <Button
            variant="cancel-btn"
            size="dk-md-s"
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>
          <Button variant="yellow" size="dk-md-s" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PetLogCard;
