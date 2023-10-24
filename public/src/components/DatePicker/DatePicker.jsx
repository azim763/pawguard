import React from "react";

const DatePicker = ({ id, value, onChange }) => {
  return (
    <div>
      <input type="date" id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default DatePicker;
