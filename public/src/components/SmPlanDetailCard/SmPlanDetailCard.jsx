import React from "react";
import Typography from "../Typography/Typography";
import styles from "./smPlanDetailCard.module.css";
import Button from "../Button/Button";

const SmPlanDetailCard = ({
  smSource,
  smAlt,
  smDeductibleNum,
  smReimbursementNum,
  smCoverageNum,
  smPrice,
  ...props
}) => {
  return (
    <div className={`${styles["plan-detail-card-wrapper"]}`}>
      <div className={`${styles["image-container"]}`}>
        <img src={smSource} alt={smAlt} />
      </div>
      <div className={`${styles["detail-card-deductible"]}`}>
        <Typography variant="textfield-poppins-regular" color="small-text-gray">
          Annual Deductible per year
        </Typography>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          ${smDeductibleNum}
        </Typography>
      </div>

      <div className={`${styles["detail-card-reimbursement"]}`}>
        <Typography variant="textfield-poppins-regular" color="small-text-gray">
          Reimbursement per year
        </Typography>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {smReimbursementNum}
        </Typography>
      </div>

      <div className={`${styles["detail-card-coverage"]}`}>
        <Typography variant="textfield-poppins-regular" color="small-text-gray">
          Annual Coverage per year
        </Typography>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {smCoverageNum}%
        </Typography>
      </div>

      <div className={`${styles["detail-card-price"]}`}>
        <Typography
          variant="user-greeting-poppins-semibold"
          color="almost-black"
        >
          {smPrice}
        </Typography>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          <sup>{smPrice}</sup>
        </Typography>
        <Typography variant="textfield-poppins-regular" color="almost-black">
          per month
        </Typography>
      </div>
      <div className={`${styles["button-container"]}`}>
        <Button variant="light-blue" label="View Detail" size="dk-sm" />
      </div>
    </div>
  );
};

export default React.memo(SmPlanDetailCard);