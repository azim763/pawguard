import React from "react";
import styles from "./AboutUsProfile.module.css";
import Typography from "../Typography/Typography";
import LinkedInIcon from "../SVG/LinkedInSVG";

const AboutUsProfile = ({ src, alt, title, description, linkedinProfile,linkedinText }) => {
  return (
    <div className={styles.AboutUsProfile}>
      <img src={src} alt={alt} />
      <div className={styles.textContainer}>
        <Typography variant="body2-poppins-medium" color="almost-black">
          {title}
        </Typography>
        
          <Typography variant="body3-poppins-regular" color="almost-black">
            {description}
          </Typography>
        
          <div className={styles.descriptionContainer}>
              <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
            </a>
            <Typography variant="body3-poppins-regular" color="almost-black" className={styles.linkedinText}>
              <a id="linkedInTxt" href={linkedinProfile} target="_blank" rel="noopener noreferrer">
                {linkedinText}
              </a>
            </Typography>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUsProfile;
