import React from 'react';
import styles from "./AboutUsProfile.module.css";
import Typography from '../Typography/Typography';

const AboutUsProfile = ( { src, alt, title, description }) => {
  return (
    <div>
        <div className={styles.AboutUsProfile}>
        <img src={src} alt={alt} />
        <Typography variant="sub-h3-poppins-regular" color="almost-black">{title}</Typography>
        <Typography variant="body2-poppins-medium" color="almost-black">{description}</Typography>
    </div>
    </div>
  )
}

export default AboutUsProfile
