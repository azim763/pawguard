import React from "react";
import styles from "./date-picker.module.css"

const DatePicker = ({ id, value, onChange,disabled }) => {
  const formattedDate =
    value &&
    value
      .split("-")
      .reverse()
      .join("-");
  return (
    <div className={styles.datestyle}>
      <input className={styles.input} type="date" disabled={disabled} id={id} value={formattedDate} name={id} onChange={onChange} />
    </div>
  );
};

export default DatePicker;
