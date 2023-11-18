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
      <div className={styles.insurHead}>
        <div className={`${styles["image-container"]}`}>
          <img src={smSource} alt={smAlt} />
        </div>
        <div className={`${styles["image-info"]}`}>
          <Typography variant="body1-poppins-semibold">{planName}</Typography>
        </div>
      </div>

      <div className={`${styles["detail-card-price"]}`}>
        <Typography className={styles.smPrice}>
          ${smPrice}
          {/* <sup style={{ fontSize: "30px", fontWeight: "500" }}>{smPrice}</sup> */}
        </Typography>
        <Typography className={`${styles.detailTypo} ${styles.price}`}>
          per month
        </Typography>
      </div>

      <div className={`${styles["detail-card-reimbursement"]}`}>
        <Typography className={styles.detailTypo}>
          Reimbursement <br /> per year
        </Typography>
        <Typography variant="sub-poppins-medium" color="almost-black">
          {smReimbursementNum}%
        </Typography>
      </div>

      <div className={`${styles["detail-card-coverage"]}`}>
        <Typography className={styles.detailTypo}>
          Annual Coverage <br /> per year
        </Typography>
        <Typography variant="sub-poppins-medium" color="almost-black">
          {smCoverageNum}
        </Typography>
      </div>

      <div className={`${styles["detail-card-deductible"]}`}>
        <Typography className={styles.detailTypo}>
          Annual Deductible <br /> per year
        </Typography>
        <Typography variant="sub-poppins-medium" color="almost-black">
          ${smDeductibleNum}
        </Typography>
      </div>

      <div className={`${styles["button-container"]}`}>
        <Button
          variant="light-blue"
          label="View Details"
          size="dk-md"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default React.memo(SmPlanDetailCard);
