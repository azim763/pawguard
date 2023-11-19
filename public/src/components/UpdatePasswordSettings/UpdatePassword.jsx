import React, { useState } from 'react';
import './UpdatePassword.css';
import Typography from '../Typography/Typography';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="update-password-box">
      <Typography variant="body2-poppins-medium">
      <h2>Update Password</h2>
      </Typography>
      <div className="form-group-pwd">
      <Typography  varient="body3-poppins-regular">
        <label htmlFor="newPassword">New Password</label>
      </Typography>
        <input
          type="password"
          id="newPassword"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
      </div>
      <div className="form-group-pwd">
      <Typography  varient="body3-poppins-regular">
        <label htmlFor="confirmPassword">Confirm New Password</label>
      </Typography>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Re-Enter new password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
    </div>
  );
};

export default UpdatePassword;