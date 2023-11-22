import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoSVG from "../SVG/LogoSVG";
import styles from "./header.module.css";
import Typography from "../Typography/Typography";
import UserSVG from "../SVG/UserSVG";
import Burger from "../Burger/Burger";
import Logout from "../Logout";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const handleNavLinkClick = () => {
    setIsActive(true);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedData = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );
      if (!storedData) {
      } else {
        const userData = JSON.parse(storedData);
        setCurrentUser(userData);
      }
    };

    checkLoggedIn();
  }, []);

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      {currentUser ? (
        <div>
          <NavLink to="/">
            <LogoSVG width="224" height="45" />
          </NavLink>
          <div className={menuOpen ? styles.menuOpen : styles.RightNav}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={
                    location.pathname === "/" ? styles.activeLink : ""
                  }
                >
                  <Typography variant="body1-poppins-semibold">Home</Typography>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/petPage"
                  className={
                    location.pathname === "/petPage" ? styles.activeLink : ""
                  }
                >
                  <Typography variant="body1-poppins-semibold">
                    My Pets
                  </Typography>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/clinics"
                  className={
                    location.pathname === "/clinics" ? styles.activeLink : ""
                  }
                >
                  <Typography variant="body1-poppins-semibold">
                    Clinics
                  </Typography>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/getinsurances"
                  className={
                    location.pathname === "/getinsurances" ? styles.activeLink : ""
                  }
                >
                  <Typography variant="body1-poppins-semibold">
                    Insurances
                  </Typography>
                </NavLink>
              </li>
              <li className={styles.profileIcon}>
                <div onClick={handleProfileClick}>
                  <UserSVG width="48" height="40" />
                </div>
                {profileMenuOpen && (
                  <div className={styles.profileMenu}>
                    <ul>
                      <li>
                          <NavLink
                            to="/AccountSettings"
                            className={
                              location.pathname === "/AccountSettings"
                            }
                          >
                        <Typography
                          variant="body1-poppins-semibold"
                          color="almost-black"
                        >
                          {currentUser.username}
                        </Typography>
                        </NavLink>
                      </li>
                      <Logout />
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <Burger open={menuOpen} toggleMenu={handleMenuToggle} />
        </div>
      ) : (
        <div>
          <NavLink to="/login">
            <LogoSVG width="224" height="45" />
          </NavLink>
          <div className={menuOpen ? styles.menuOpen : styles.RightNav}>
            <ul>
              <li>
                <NavLink to="/AboutUs" className={
                    location.pathname === "/AboutUs" ? styles.activeLink : ""
                  }>
                  <Typography variant="body1-poppins-semibold">
                    About Us
                  </Typography>
                </NavLink>
              </li>
              <li>
                <NavLink to="/clinics" className={
                    location.pathname === "/clinics" ? styles.activeLink : ""
                  }>
                  <Typography variant="body1-poppins-semibold">
                    Clinics
                  </Typography>
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <Typography variant="body1-poppins-semibold">
                    Insurances
                  </Typography>
                </NavLink>
              </li>
            </ul>
          </div>
          <Burger open={menuOpen} toggleMenu={handleMenuToggle} />
        </div>
      )}
    </nav>
  );
};

export default Header;
