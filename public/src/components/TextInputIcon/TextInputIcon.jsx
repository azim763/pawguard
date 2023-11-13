import React from "react";
import { CiLocationOn } from "react-icons/ci";
import styles from "./TextInputIcon.module.css";
import Typography from "../Typography/Typography";

const TextInputIcon = ( { variant, label, size, key, value, placeholder, disabled, required, style }) => {
  return (
    <div>
      <Typography variant="body2-poppins-medium" color="almost-black">
        <label htmlFor={key}>{label}</label>
      </Typography>
      <div className={styles.inputContainer}>
        <CiLocationOn size="20px"/>
        <input
          className={`${styles[variant]} ${styles[size]} ${styles["input"]}`}
          type="text"
          id={key}
          name={key}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={style}
        />
      </div>
    </div>
  );
};

export default TextInputIcon;
