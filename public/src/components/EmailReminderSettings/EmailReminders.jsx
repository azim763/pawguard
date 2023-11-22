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
      <Typography variant="sub-poppins-medium">
      Email Reminders
      </Typography>
      <div className="content-part">
      <Typography  varient="body2-poppins-medium">
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
