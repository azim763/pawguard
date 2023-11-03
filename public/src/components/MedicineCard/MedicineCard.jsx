import React, { useState } from "react";
import Typography from "../Typography/Typography";
import styles from "./MedicineCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";
import Button from "../Button/Button";
import axios from "axios";
import { deletePetMedicationByIdRoute } from "../../utils/APIRoutes.js";
import Modal from "react-modal";
import modalStyles from "../Modal/Modal.module.css"; // Import the modal styles

Modal.setAppElement("#root");

const MedicineCard = ({
  medicineName,
  dosage,
  startDate,
  Period,
  medicationTime,
  MedicationId,
  onDelete,
}) => {
  const medDate = startDate.toLocaleDateString();
  const [month, day, year] = medDate.split("/");
  const medFormattedDate = `${day}-${month}-${year}`;

  const date = new Date(medicationTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const timeString = `${hours}:${minutes}`;
  const formattedDate = `${day}-${month}-${year}`;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
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
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal without performing the delete
    setIsDeleteModalOpen(false);
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
          <Typography variant="body3-poppins-regular">{timeString}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Start date</Typography>
          <Typography variant="body3-poppins-regular">
            {medFormattedDate}
          </Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Period</Typography>
          <Typography variant="body3-poppins-regular">{Period} days</Typography>
        </div>
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

export default MedicineCard;
