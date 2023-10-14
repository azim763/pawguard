import React, { useState } from "react";
import styles from "./buttonGroup.module.css";

const ButtonGroup = ({ groupId, buttons }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div>
      {buttons.map((label, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={index === activeButton ? styles.active : styles.inactive }
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
