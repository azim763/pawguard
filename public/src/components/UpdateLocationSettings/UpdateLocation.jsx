import React from 'react';
import './UpdateLocation.css';
import image from "./../../assets/images/icon-location1.png";
import Typography from '../Typography/Typography';

const UpdateLocation = () => {
  return (
    <div className="update-location-box">
      <Typography variant="body2-poppins-medium">
      <h2>Update Location</h2>
      </Typography>
      <div className='content-box'>
        <Typography varient="body3-poppins-regular">
          <label>Location</label>
        </Typography>
      <div className="location-input-container">
        <img src={image} alt="Location Icon" className="location-icon" />
        <input id='loc-input' type="text" placeholder="Enter your location" />
      </div>
      </div>
    </div>
  );
};

export default UpdateLocation;
