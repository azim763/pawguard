import React from 'react';
import './UpdateLocation.css';
import image from "./../../assets/images/icon-location1.png";
import Typography from '../Typography/Typography';

const UpdateLocation = () => {
  return (
    <div className="update-location-box">
      <Typography variant="sub-poppins-medium">
      Update Location
      </Typography>
      <div className='content-box'>
        <Typography varient="body2-poppins-medium">
          Location
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
