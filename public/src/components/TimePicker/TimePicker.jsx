import React from "react";
import styles from "./time-picker.module.css";

const TimePicker = ({ id,time, setTime,onChange, ...props }) => {

  return (
    <div className={`${styles["wrapper"]}`}>
      <input
        className={`${styles["input"]}`}
        type="time"
        id={id}
        name={id}
        value={time}
        onChange={onChange}
        style={props}
      ></input>
    </div>
  );
};

export default React.memo(TimePicker);
