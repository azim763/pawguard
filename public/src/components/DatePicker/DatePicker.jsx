import React from "react";
import styles from "./date-picker.module.css"

const DatePicker = ({ id, value, onChange }) => {
  return (
    <div>
      <input className={styles.input} type="date" id={id} value={value} name={id} onChange={onChange} />
    </div>
  );
};

export default DatePicker;
