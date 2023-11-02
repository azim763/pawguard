import React from "react";
import Typography from "../Typography/Typography";
import styles from "./radioButton.module.css"

const RadioButton = ({ label, checked, onChange }) => {
  const handleRadioChange = () => {
    onChange(!checked);
  };
  return (
    <div>
      <input type="radio" checked={checked} onChange={handleRadioChange} />
      <div className={styles.label}>
        <label>
          <Typography variant="body3-poppins-regular ">{label}</Typography>
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
