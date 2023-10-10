import React from "react";
import styles from "./textArea.module.css";
  const TextArea = ({
    value,
    defaultValue,
    label,
    onClickHandler,
    hoverable,
    maxLength,
    minLength,
    readOnly,
    ...props
  }) => {

  return ( 
    <textarea  
    className={`${styles[value]} ${styles[defaultValue]} ${styles["textArea"]} ${styles["maxLength"]} ${styles["minLength"]} ${styles["readOnly"]} ${
      label && styles["hover"]
    }`}
    onClick={onClickHandler}
    {...props}
    >
    </textarea>
  )
}

export default React.memo(TextArea);