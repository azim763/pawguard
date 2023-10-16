import React from "react";
import styles from "./Checkbox.module.css";
import Typography from "../Typography/Typography";

const Checkbox = ( { key, value, label, placeholder, disabled, required, onClickHandler, variant, size } ) => {
  return (
    <div>
      <input
        className={`${styles[variant]} ${styles[size]} ${styles["input"]}`}
        type="checkbox"
        id={key}
        name={key}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onClick={onClickHandler}
      />
      <Typography variant="body2-poppins-medium" color="almost-black">
        <label htmlFor={key}>{label}</label>
      </Typography>
    </div>
  );
};

export default Checkbox;
