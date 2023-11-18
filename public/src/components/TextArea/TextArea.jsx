import React from "react";
import styles from "./textArea.module.css";
import Typography from "../Typography/Typography";

const TextArea = ({
  value,
  defaultValue,
  label,
  onClickHandler,
  hoverable,
  maxLength,
  minLength,
  readOnly,
  id,
  name,
  ...props
}) => {
  return (
    <div>
      <Typography variant="textfield-poppins-regular">
        <textarea
          className={`${styles[value]} ${styles[defaultValue]} ${
            styles["textArea"]
          } ${styles["maxLength"]} ${styles["minLength"]} ${
            styles["readOnly"]
          } ${label && styles["hover"]}`}
          onClick={onClickHandler}
          id={id}
          name={name}
          value={value}
          disabled={props.disabled}
          {...props}
        ></textarea>
      </Typography>
    </div>
  );
};

export default React.memo(TextArea);
