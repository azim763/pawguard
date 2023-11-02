import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoSVG from "../SVG/LogoSVG";
import styles from "./header.module.css";
import Typography from "../Typography/Typography";
import UserSVG from "../SVG/UserSVG";
import Burger from "../Burger/Burger";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle the menu toggle based on Burger click
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div>
        <LogoSVG width="224" height="45" />
        <div className={menuOpen ? styles.menuOpen : styles.RightNav}>
          <ul>

              <li>
                <NavLink to="/"><Typography variant="body1-poppins-semibold">Home</Typography></NavLink>
              </li>
              <li>
                <NavLink to="/petPage"><Typography variant="body1-poppins-semibold">My Pets</Typography></NavLink>
              </li>
              <li>
                <NavLink to="/clinics"><Typography variant="body1-poppins-semibold">Clinics</Typography></NavLink>
              </li>
              <li>
                <NavLink to="/getinsurances"><Typography variant="body1-poppins-semibold">Insurances</Typography></NavLink>
              </li>
              <li>
                <UserSVG width="48" height="48" />
              </li>
          </ul>
        </div>
        <Burger open={menuOpen} toggleMenu={handleMenuToggle} />
        </div>
    </nav>
  );
};

export default Header;
