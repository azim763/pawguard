import React from "react";
import Typography from "../Typography/Typography";
import styles from "./planDetailCard.css";
const PlanDetailCard = ({
  source,
  alt,
  deductibleNum,
  reimbursementNum,
  coverageNum,
  price,
  ...props
}) => {
  return (
    <div className={`${styles["plan-detail-card-wrapper"]}`}>
      <div className={`${styles["image-container"]}`}>
        <img src={source} alt={alt} />
      </div>
      <div className={`${styles["detail-card-deductible"]}`}>
        <Typography variant="textfield-poppins-regular" color="small-text-gray">
          Annual Deductible per year
        </Typography>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {deductibleNum}
        </Typography>
      </div>

      <div className={`${styles["detail-card-reimbursement"]}`}>
        <Typography variant="textfield-poppins-regular" color="small-text-gray">
          Reimbursement per year
        </Typography>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {reimbursementNum}
        </Typography>
      </div>

      <div className={`${styles["detail-card-coverage"]}`}>
        <Typography variant="textfield-poppins-regular" color="small-text-gray">
          Annual Coverage per year
        </Typography>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {coverageNum}
        </Typography>
      </div>


      <div className={`${styles["detail-card-price"]}`}>
        <Typography variant="user-greeting-poppins-semibold" color="almost-black">
          {price}
        </Typography>

        <Typography variant="textfield-poppins-regular" color="almost-black">
          {coverageNum}
        </Typography>
      </div>

    </div>
  );
};
export default React.memo(PlanDetailCard);
