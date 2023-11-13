import React from "react";
import Typography from "../Typography/Typography";
import styles from "./planDetailCard.module.css";
import Button from "../Button/Button";
const PlanDetailCard = ({
  source,
  alt,
  deductibleNum,
  reimbursementNum,
  coverageNum,
  price,
  onClick,
  showButton = true,
  ...props
}) => {
  return (
    <div className={`${styles["plan-detail-card-wrapper"]}`}>
      <div className={`${styles["image-container"]}`}>
        <img src={source} alt={alt} />
      </div>
      <div className={`${styles["detail-card-deductible"]}`}>
        <Typography className={styles.titleTypo}>
          Annual Deductible <br /> per year
        </Typography>
        <Typography className={styles.contentTypo}>${deductibleNum}</Typography>
      </div>
      <div className={`${styles["detail-card-reimbursement"]}`}>
        <Typography className={styles.titleTypo}>
          Reimbursement <br />
          per year
        </Typography>
        <Typography className={styles.contentTypo}>
          {reimbursementNum}%
        </Typography>
      </div>
      <div className={`${styles["detail-card-coverage"]}`}>
        <Typography className={styles.titleTypo}>
          Annual Coverage <br />
          per year
        </Typography>
        <Typography className={styles.contentTypo}>${coverageNum}</Typography>
      </div>
      <div className={`${styles["detail-card-price"]}`}>
        <div className={styles.priceNum}>
          <Typography className={styles.priceTypo}>
            ${price}
            {/* <sup style={{ fontSize: "30px", fontWeight: "500" }}>{price}</sup> */}
          </Typography>
        </div>
        <Typography variant="body2-poppins-medium" color="almost-black">
          per month
        </Typography>
      </div>
      {showButton && (
        <div className={`${styles["button-container"]}`}>
          <Button
            variant="light-blue"
            label="View Details"
            size="dk-sm"
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};
export default React.memo(PlanDetailCard);
