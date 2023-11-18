import React, { useState } from "react";
import styles from "./buttonGroup.module.css";

const ButtonGroup = ({ groupId, buttons, onClick, selected }) => {
  const handleButtonClick = (buttonId) => {
    onClick(buttons[buttonId]); // Pass the selected button label to the parent component
  };

  return (
    <div className={styles.buttonGroup}>
      {buttons.map((label, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={label === selected ? styles.active : styles.inactive }
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
