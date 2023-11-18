import React,{useState} from "react";
import Typography from "../Typography/Typography";
import styles from "./FoodCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";
import axios from "axios";
import { deletePetFoodByIdRoute } from "../../utils/APIRoutes.js";
import Modal from "react-modal";
import modalStyles from "../Modal/Modal.module.css";
import Button from "../Button/Button.jsx";
Modal.setAppElement("#root");



const FoodCard = ({ FoodName, MealPerDay, QuantityPerMeal, KibbleDry,FoodDate,logId,onDelete,Canned,SemiMoist,Raw,HomeCooked}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const foodTypes = [];
  
  if (KibbleDry) foodTypes.push("Kibble-Dry");
  if (Canned) foodTypes.push("Canned");
  if (SemiMoist) foodTypes.push("Semi-Moist");
  if (HomeCooked) foodTypes.push("Home-Cooked");
  if (Raw) foodTypes.push("Raw");

  const foodType = foodTypes.join(', ');

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = () => {
    axios
      .delete(`${deletePetFoodByIdRoute}/${logId}`)
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
    <div className={styles.foodFormContainer}>
      <div className={styles.firstRow}>
        <div className={styles.foodName}>
          <Typography variant="body1-poppins-semibold">Food Name</Typography>
          <Typography variant="body3-poppins-regular">{FoodName}</Typography>
        </div>
        <DeleteSVG width="30px" height="30px" onClick={handleDeleteClick} />
      </div>

      <div className={styles.secondRow}>
        <div>
          <Typography variant="body1-poppins-semibold">Meal</Typography>
          <Typography variant="body3-poppins-regular">{MealPerDay}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Quantity</Typography>
          <Typography variant="body3-poppins-regular">
            {QuantityPerMeal} g
          </Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1-poppins-semibold">Type</Typography>
        <Typography variant="body3-poppins-regular">{foodType}</Typography>
      </div>
      <div>
        <Typography variant="body1-poppins-semibold">Date</Typography>
        <Typography variant="body3-poppins-regular">{FoodDate}</Typography>
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

export default FoodCard;
