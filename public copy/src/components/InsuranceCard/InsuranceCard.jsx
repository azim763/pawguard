import React from "react";
import styles from "./insuranceCard.module.css";
import Typography from "../Typography/Typography";

function InsuranceCard({ title, text, subtitle, body }) {
  return (
    <div className={styles.cardContainer}>
      <div>
          <div className={styles.cardTitle}>
            <Typography variant="sub-poppins-medium" color="almost-black">
              {title}
            </Typography>
          </div>
          <div className={styles.titleBody}>
            <Typography variant="body3-poppins-regular" color="almost-black">
              {text}
            </Typography>
          </div>
      </div>
      <div>
          <div className={styles.cardBody}>
            <Typography variant="body1-poppins-semibold" color="almost-black">
              {subtitle}
            </Typography>
          </div>
          <div className={styles.bodyText}>
            <Typography variant="body3-poppins-regular" color="almost-black">
              {body}
            </Typography>
          </div>
      </div>
    </div>
  );
}
export default React.memo(InsuranceCard);

// to use the card component :-

// <InsuranceCard
//     title=""
//     text=""
//     subtitle=""
//     body=""
// />
