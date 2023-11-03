import React,{useState} from "react";
import Typography from "../Typography/Typography";
import styles from "./AppointmentCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";
import axios from "axios"
import {
  deletePetAppointmentByIdRoute,

} from "../../utils/APIRoutes.js";
import Modal from "react-modal"; 
import modalStyles from "../Modal/Modal.module.css";
Modal.setAppElement('#root');


const AppointmentCard = ({ ClinicName, AppointmentTime, AppointmentReason, AppointmentDateTime,AppointmentId,onDelete }) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    
    axios.delete(`${deletePetAppointmentByIdRoute}/${AppointmentId}`) 
      .then(response => {
        console.log(`Log entry with ID ${AppointmentId} deleted successfully.`);
        onDelete();
      })
      .catch(error => {
        console.error(`Error deleting log entry with ID ${AppointmentId}:`, error);
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
          <DeleteSVG width="30px" height="30px" onClick={handleDeleteClick}/>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div>
          <Typography variant="body1-poppins-semibold">Purpose</Typography>
          <Typography variant="body3-poppins-regular">{AppointmentReason}</Typography>
        </div>
        <div>
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
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this Appointment card?</p>
        <div className={modalStyles.CardButtonGroup}>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentCard;
