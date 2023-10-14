import React from 'react'
import styles from "./AboutUsFeature.module.css";
import Typography from '../Typography/Typography';


const AboutUsFeature = ({src,alt,title,description}) => {
  return (
    <div className={styles.AboutUsFeature}>
        <img src={src} alt={alt} />
        <Typography variant="sub-h3-poppins-regular" color="almost-black">{title}</Typography>
        <Typography variant="body2-poppins-medium" color="almost-black">{description}</Typography>
    </div>
  )
}

export default AboutUsFeature
