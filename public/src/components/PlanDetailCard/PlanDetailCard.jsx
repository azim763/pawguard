import React from "react";
import Typography from "../Typography/Typography";
import styles from "./planDetailCard.css";
const PlanDetailCard = ({
  source,
  itemName,
  dateApproved,
  quantity,
  price,
  label,
  alt,
  ...props
}) => {
  return (
    <div className={`${styles["plan-detail-card-wrapper"]}`}>
         <div className={`${styles["image-container"]}`}>
          <img src={source} alt={alt} />
        </div>
        <div className={`${styles["detail-card-deductible"]}`}>
          <Typography variant="h4-graphik-bold" color="dark-blue">
            {itemName}
          </Typography>

      <Typography
        variant="h2-graphik-bold"
        style={{ margin: "16px 16px 12px" }}
      >
       {label}
      </Typography>
      <div className={`${styles["selling-item-card"]}`}>
        <div className={`${styles["image-container"]}`}>
          <img src={source} alt={alt} />
        </div>
        
          <Typography variant="body-1-medium">Date approved: </Typography>
          <Typography variant="body-2-regular" color="gray">
            {dateApproved}
          </Typography>
          <div className={`${styles["quantity-container"]}`}>
            <Typography
              variant="body-1-medium"
              style={{ marginRight: "0.3rem" }}
            >
              Quantity:
            </Typography>
            <Typography variant="body-1-medium">{quantity}</Typography>
          </div>
          <Typography variant="h3-graphik-bold">${price}</Typography>
        </div>
      </div>
    </div>
  );
};
export default React.memo(PlanDetailCard);
