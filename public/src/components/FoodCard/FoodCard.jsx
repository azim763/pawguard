import React from "react";

const FoodCard = ( { FoodName, MealPerDay, QuantityPerMeal, TypeOfFood }) => {
  return (
    <div>
      <div>
        <div>
          <Typography variant="body1-poppins-semibold">Food Name</Typography>
          <Typography variant="body3-poppins-regular">{FoodName}</Typography>
        </div>
        <div className="icon"></div>
      </div>
      <div>
        <div>
            <Typography variant="body1-poppins-semibold">Meal</Typography>
            <Typography variant="body3-poppins-regular">
              {MealPerDay}
            </Typography>
        </div>
        <div>
            <Typography variant="body1-poppins-semibold">Quantity</Typography>
            <Typography variant="body3-poppins-regular">
              {QuantityPerMeal}
            </Typography>
        </div>
      </div>
      <div>
            <Typography variant="body1-poppins-semibold">Type</Typography>
            <Typography variant="body3-poppins-regular">
              {TypeOfFood}
            </Typography>
        </div>
    </div>
  );
};

export default FoodCard;
