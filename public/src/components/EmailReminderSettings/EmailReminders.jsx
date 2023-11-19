import React, { useState } from 'react';
import './EmailReminders.css';
import Typography from '../Typography/Typography';

const EmailReminders = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="email-reminders-box">
      <Typography variant="body2-poppins-medium">
      <h2>Email Reminders</h2>
      </Typography>
      <div className="content-part">
      <Typography  varient="body3-poppins-regular">
        <label htmlFor="appointments">Appointments</label>
        </Typography>
        <div className="spacer"></div>
        <div className={`toggle-container ${toggle ? 'on' : 'off'}`} onClick={handleToggle}>
          {toggle ? 'ON' : 'OFF'}
        </div>
        <input
          type="checkbox"
          id="appointments"
          checked={toggle}
          onChange={handleToggle}
          className="hidden-checkbox"
        />
      </div>
    </div>
  );
};

export default EmailReminders;
