import React from "react";
import styles from "./clinicContactCard.module.css";
import PhoneSVG from "../SVG/PhoneSVG";
import EarthSVG from "../SVG/EarthSVG";
import Typography from "../Typography/Typography";

const ClinicContactCard = ({ clinicTel, clinicUrl }) => {
  return (
<div className={`${styles["contact-card-wrapper"]}`}>
      <div className={`${styles["heading-wrapper"]}`}>
        <Typography variant="sub-poppins-medium">Contacts</Typography>
      </div>
      <div className={`${styles["phone-wrapper"]}`}>
        <PhoneSVG width="30" height="30" />
        <Typography variant="body2-poppins-medium">{clinicTel}</Typography>
      </div>
      <div className={`${styles["clinic-url-wrapper"]}`}>
        <EarthSVG width="30" height="30" />
        <Typography variant="body2-poppins-medium">{clinicUrl}</Typography>
      </div>
    </div>
  );
};

export default ClinicContactCard;
