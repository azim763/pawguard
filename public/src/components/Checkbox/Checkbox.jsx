import React from "react";
import styles from "./Checkbox.module.css";
import Typography from "../Typography/Typography";

const Checkbox = ( { id, value, label, placeholder, disabled, required, onChange, variant, size } ) => {

  return (
    <div className= {styles.checkboxStyle}>
      <input
        className={`${styles[variant]} ${styles[size]} ${styles["input"]}`}
        type="checkbox"
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
      <div className={styles.checkboxLabel}>
        <Typography variant="body2-poppins-medium" color="almost-black">
          <label htmlFor={id}>{label}</label>
        </Typography>
      </div>
    </div>
  );
};

export default Checkbox;
