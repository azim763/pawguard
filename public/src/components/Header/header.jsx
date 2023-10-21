import React from "react";
import LogoSVG from "../SVG/LogoSVG";
import styles from "./header.module.css";
import Typography from "../Typography/Typography";

const header = () => {
  return (
    <nav className={styles.nav}>
      <Typography variant="body1-poppins-semibold">
            <LogoSVG />
        <ul>
          <li>Home</li>
          <li>My Pets</li>
          <li>Clinics</li>
          <li>Insurance</li>
        </ul>
      </Typography>
    </nav>
  );
};

export default header;
