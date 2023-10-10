import React from "react";
import styles from "./TextInput.module.css";

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
  size
}) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <label htmlFor={key}>{label}</label>
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
    </>
  );
};

export default TextInput;
