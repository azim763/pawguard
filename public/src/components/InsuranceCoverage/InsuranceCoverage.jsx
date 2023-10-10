import React from "react";
import Typography from "../Typography/Typography";
import styles from "../InsuranceCoverage/InsuranceCoverage.module.css";

const InsuranceCoverage = ({descriptions, ...props}) => {
  return (
    <div className={styles.InsuranceCoverage}>
      <div className={styles.InsuranceCoverageheaderCovered}>
        <Typography variant="sub-h2-poppins-medium">What's Covered</Typography>
      </div>
      <div>
        <Typography variant="body2-poppins-medium" color="almost-black">
          {descriptions}
        </Typography>
      </div>
    </div>
  );
};

export default InsuranceCoverage;
