import React from "react";
import styles from "./TextInput.module.css";
import Typography from "../Typography/Typography";

const TextInput = ({
  label,
  id,
  propInputValue,
  placeholder,
  onChange,
  variant,
  size,
  required
}) => {
  return (
    <div>
      <Typography variant="body2-poppins-medium" color="almost-black">
        <label htmlFor={id}>{label}</label>
      </Typography>

      <Typography variant="textfield-poppins-regular" color="small-text-gray">
        <input
          className={`${styles[variant]} ${styles[size]} ${styles["input"]}`}
          type="text"
          id={id}
          name={id}
          value={propInputValue}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        ></input>
      </Typography>
    </div>
  );
};

export default TextInput;
