import React, { useState } from 'react';
import  "./UpdateProfileSettings.css";
import Typography from '../Typography/Typography';

const UpdateProfileSettings = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="update-profile-box">
      <Typography variant="sub-poppins-medium">
        Update Profile
      </Typography>
      <div className="form-group-profile">
        <Typography  varient="body2-poppins-medium">
          <label htmlFor="firstName">First Name</label>
        </Typography>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="form-group-profile">
      <Typography  varient="body2-poppins-medium">
        <label htmlFor="lastName">Last Name</label>
      </Typography>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="form-group-profile">
      <Typography  varient="body2-poppins-medium">
        <label htmlFor="email">Email Address</label>
      </Typography>
        <input
          type="text"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
    </div>
  );
};

export default UpdateProfileSettings;
