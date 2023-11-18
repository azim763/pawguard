import React from "react";
import Typography from "../Typography/Typography";
import styles from "../InsuranceCoverage/InsuranceCoverage.module.css";

const InsuranceCoverage = ({descriptions, ...props}) => {
  return (
    <div className={styles.InsuranceCoverage}>
      <div className={styles.InsuranceCoverageheaderCovered}>
        <Typography variant="sub-poppins-medium">What's Covered</Typography>
      </div>
      <div>
        <Typography variant="body2-poppins-medium" color="almost-black">
        <ul>
            {descriptions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Typography>
      </div>
    </div>
  );
};

export default InsuranceCoverage;
