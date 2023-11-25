import React from 'react';
import styles from "./AboutUsProfile.module.css";
import Typography from '../Typography/Typography';
import LinkedInIcon from "../SVG/LinkedInSVG"

const AboutUsProfile = ( { src, alt, title, description, linkedinProfile }) => {
  return (
    <div className={styles.AboutUsProfile}>
      <img src={src} alt={alt} />
      <div className={styles.textContainer}>
        <Typography variant="body2-poppins-medium" color="almost-black">{title}</Typography>
        <div className={styles.descriptionContainer}>
          <Typography variant="body3-poppins-regular" color="almost-black">{description}</Typography>
          <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUsProfile;
