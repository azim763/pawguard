import React from "react";
import Typography from "../Typography/Typography";
import styles from "./FoodCard.module.css";
import DeleteSVG from "../SVG/DeleteSVG";

const FoodCard = ({ FoodName, MealPerDay, QuantityPerMeal, TypeOfFood }) => {
  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    // setIsDeleteModalOpen(true);
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
        <Typography variant="body3-poppins-regular">{TypeOfFood}</Typography>
      </div>
    </div>
  );
};

export default FoodCard;
