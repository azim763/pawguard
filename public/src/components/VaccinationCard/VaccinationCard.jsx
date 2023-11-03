import React, { useState } from "react";
import Typography from "../Typography/Typography";
import DeleteSVG from "../SVG/DeleteSVG";
import styles from "./VaccinationCard.module.css";
import Button from "../Button/Button";
import axios from "axios";
import { deletePetVaccinationByIdRoute } from "../../utils/APIRoutes.js";
import Modal from "react-modal";
import modalStyles from "../Modal/Modal.module.css";
Modal.setAppElement("#root");

const VaccinationCard = ({ VaccineName, VaccineDate, VaccineId, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${deletePetVaccinationByIdRoute}/${VaccineId}`)
      .then((response) => {
        console.log(`Log entry with ID ${VaccineId} deleted successfully.`);
        onDelete();
      })
      .catch((error) => {
        console.error(`Error deleting log entry with ID ${VaccineId}:`, error);
      });
    setIsDeleteModalOpen(false);
  };

  const vDate = VaccineDate.toLocaleDateString();
  const [month, day, year] = vDate.split("/");
  const formattedDate = `${day}-${month}-${year}`;

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
          <DeleteSVG width="30" height="30" onClick={handleDeleteClick} />
        </div>
      </div>

      <div className={styles.secondRow}>
        <Typography variant="body1-poppins-semibold">Date</Typography>
        <Typography variant="body3-poppins-regular">{formattedDate}</Typography>
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

export default VaccinationCard;
