import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoSVG from "../SVG/LogoSVG";
import styles from "./header.module.css";
import Typography from "../Typography/Typography";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <Typography variant="body1-poppins-semibold">
        <LogoSVG />
        <ul>
          <li>
            <NavLink to="/home" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/petPage">My Pets</NavLink>
          </li>
          <li>
            <NavLink to="/clinics">Clinics</NavLink>
          </li>
          <li>
            <NavLink to="/getinsurances">Insurances</NavLink>
          </li>
        </ul>
      </Typography>
    </nav>
  );
};

export default Header;
