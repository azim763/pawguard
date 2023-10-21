import React from "react";
import styles from "./TextInput.module.css";
import Typography from "../Typography/Typography";

const TextInput = ({
  label,
  key,
  propInputValue,
  placeholder,
  onChange,
  variant,
  size,
}) => {


  return (
    <div>
      <Typography variant="body2-poppins-medium" color="almost-black">
        <label htmlFor={key}>{label}</label>
      </Typography>
      
      <Typography variant="textfield-poppins-regular" color="small-text-gray">
      <input
        className={`${styles[variant]} ${styles[size]} ${styles["input"]}`}
        type="text"
        id={key}
        name={key}
        value={propInputValue}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      </Typography>
    </div>
  );
};

export default TextInput;
