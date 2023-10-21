import React from "react";
import Typography from "../Typography/Typography";
import styles from "../InsuranceNotCovered/InsuranceNotCovered.module.css";

const InsuranceNotCovered = ({ descriptions, ...props }) => {
  return (
    <div className={styles.InsuranceNotCovered}>
      <div className={styles.InsuranceNotCoveredheader}>
        <Typography variant="sub-h2-poppins-medium">
          What's Not Covered
        </Typography>
      </div>
      <div >
        <Typography variant="body2-poppins-medium" color="almost-black">
        <ul className={styles.liststyling}>
            {descriptions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Typography>
      </div>
    </div>
  );
};

export default InsuranceNotCovered;
