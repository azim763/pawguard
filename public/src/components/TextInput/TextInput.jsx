import React from "react";
import styles from "./TextInput.module.css";
import Typography from "../Typography/Typography";

const TextInput = ({
  label,
  type,
  key,
  propInputValue,
  setInputValue,
  placeholder,
  disabled,
  required,
  propHandleInputChange,
  variant,
  size,
}) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Typography variant="body2-poppins-medium" color="almost-black">
        <label htmlFor={key}>{label}</label>
      </Typography>
      
      <Typography variant="textfield-poppins-regular" color="small-text-gray">
      <input
        className={`${styles[variant]} ${styles[size]} ${styles["input"]}`}
        type={type}
        id={key}
        name={key}
        value={propInputValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={propHandleInputChange}
      ></input>
      </Typography>
    </div>
  );
};

export default TextInput;
