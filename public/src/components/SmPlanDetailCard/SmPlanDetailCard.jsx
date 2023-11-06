import React from "react";
import Typography from "../Typography/Typography";
import styles from "./smPlanDetailCard.module.css";
import Button from "../Button/Button";

const SmPlanDetailCard = ({
  smSource,
  planName,
  smAlt,
  smDeductibleNum,
  smReimbursementNum,
  smCoverageNum,
  smPrice,
  onClick,
  ...props
}) => {
  return (
    <div className={`${styles["plan-detail-card-wrapper"]}`}>
      <div className={`${styles["image-container"]}`}>
        <img src={smSource} alt={smAlt} />
        <div
          className={`${styles["image-info"]}`}
        >
          <Typography variant="sub-poppins-medium">{planName}</Typography>
        </div>
      </div>
      

      <div className={`${styles["detail-card-price"]}`}>
        <Typography variant="h1-poppins-semibold" color="almost-black">
          ${smPrice}{" "}
          {/* <sup style={{ fontSize: "30px", fontWeight: "500" }}>{smPrice}</sup> */}
        </Typography>
        <Typography variant="detailtext1-poppins-medium" color="almost-black">
          per month
        </Typography>
      </div>

      <div className={`${styles["detail-card-reimbursement"]}`}>
        <Typography
          variant="detailtext1-poppins-medium"
          color="small-text-gray"
        >
          Reimbursement <br /> per year
        </Typography>
        <Typography variant="sub-h2-poppins-medium" color="almost-black">
          {smReimbursementNum}%
        </Typography>
      </div>

      <div className={`${styles["detail-card-coverage"]}`}>
        <Typography
          variant="detailtext1-poppins-medium"
          color="small-text-gray"
        >
          Annual Coverage <br /> per year
        </Typography>
        <Typography variant="sub-h2-poppins-medium" color="almost-black">
          {smCoverageNum}
        </Typography>
      </div>

      <div className={`${styles["detail-card-deductible"]}`}>
        <Typography
          variant="detailtext1-poppins-medium"
          color="small-text-gray"
        >
          Annual Deductible <br /> per year
        </Typography>
        <Typography variant="sub-h2-poppins-medium" color="almost-black">
          ${smDeductibleNum}
        </Typography>
      </div>

      <div className={`${styles["button-container"]}`}>
        <Button variant="light-blue" label="View Details" size="dk-md"  onClick={onClick} />
      </div>
    </div>
  );
};

export default React.memo(SmPlanDetailCard);
