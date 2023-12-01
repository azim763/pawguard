import React, { useState } from "react";
import Typography from "../Typography/Typography";
import styles from "./AppointmentCard.module.css";
import Button from "../Button/Button";
import DeleteSVG from "../SVG/DeleteSVG";
import axios from "axios";
import { deletePetAppointmentByIdRoute } from "../../utils/APIRoutes.js";
import Modal from "react-modal";
import modalStyles from "../Modal/Modal.module.css";
Modal.setAppElement("#root");

const AppointmentCard = ({
  ClinicName,
  AppointmentTime,
  AppointmentReason,
  AppointmentDateTime,
  AppointmentId,
  onDelete,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${deletePetAppointmentByIdRoute}/${AppointmentId}`)
      .then((response) => {
        //console.log(`Log entry with ID ${AppointmentId} deleted successfully.`);
        onDelete();
      })
      .catch((error) => {
        console.error(
          `Error deleting log entry with ID ${AppointmentId}:`,
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
    <div className={styles.appointmentCardContainer}>
      <div className={styles.firstRow}>
        <div>
          <Typography variant="body1-poppins-semibold">Clinic Name</Typography>
          <Typography variant="body3-poppins-regular">{ClinicName}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Time</Typography>
          <Typography variant="body3-poppins-regular">
            {AppointmentTime}
          </Typography>
        </div>
        <div>
          <DeleteSVG width="30px" height="30px" onClick={handleDeleteClick} />
        </div>
      </div>
      <div className={styles.secondRow}>
        <div>
          <Typography variant="body1-poppins-semibold">Purpose</Typography>
          <Typography variant="body3-poppins-regular">
            {AppointmentReason}
          </Typography>
        </div>
        <div className={styles.aptDate}>
          <Typography variant="body1-poppins-semibold">Date</Typography>
          <Typography variant="body3-poppins-regular">
            {AppointmentDateTime}
          </Typography>
        </div>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        contentLabel="Delete Confirmation"
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className={modalStyles.modal} // Apply the modal styles
        overlayClassName={modalStyles.overlay} // You can also style the overlay
      >
        <Typography variant="sub-poppins-medium">Delete Entry</Typography>
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

export default AppointmentCard;
