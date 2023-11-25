// RadioButton.js

import React from "react";
import Typography from "../Typography/Typography";
import styles from "./radioButton.module.css";

const RadioButton = ({ label, checked, onChange, readOnly, readOnlyValue }) => {
  const handleRadioChange = () => {
    if (!readOnly) {
      onChange(!checked);
    }
  };

  return (
    <div className={styles.RadioButton}>
      <input
        type="radio"
        checked={readOnly ? readOnlyValue : checked}
        onChange={handleRadioChange}
        disabled={readOnly}
      />

      <label>
        <Typography variant="body3-poppins-regular">{label}</Typography>
      </label>
    </div>
  );
};

export default RadioButton;
