import React from 'react'
import PropTypes from "prop-types";
import styles from "./AboutUsFeature.module.css";
import Typography from '../Typography/Typography';


const AboutUsFeature = ({title,description}) => {
  return (
    <div className={styles.AboutUsFeature}>
        <Typography variant="sub-poppins-medium" color="almost-black">{title}</Typography>
        <Typography variant="body2-poppins-medium" color="almost-black">{description}</Typography>
    </div>
  )
}

export default AboutUsFeature
