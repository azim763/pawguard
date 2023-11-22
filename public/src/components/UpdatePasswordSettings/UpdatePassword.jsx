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
      <Typography variant="sub-poppins-medium">
      Update Password
      </Typography>
      <div className="form-group-pwd">
      <Typography  varient="body2-poppins-medium">
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
      <Typography  varient="body2-poppins-medium">
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