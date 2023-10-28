import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoSVG from "../SVG/LogoSVG";
import styles from "./header.module.css";
import Typography from "../Typography/Typography";
import UserSVG from "../SVG/UserSVG";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <Typography variant="body1-poppins-semibold">
        <LogoSVG width="224" height="45" />
        <ul>
          <li>
            <NavLink to="/">
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
          <li>
            <UserSVG width="33" height="33" />
          </li>
        </ul>
      </Typography>
    </nav>
  );
};

export default Header;
