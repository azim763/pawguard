import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import LogoSVG from "../SVG/LogoSVG";
import styles from "./header.module.css";
import Typography from "../Typography/Typography";
import UserSVG from "../SVG/UserSVG";
import Burger from "../Burger/Burger";
import Logout from "../Logout";
import { useLocation } from 'react-router-dom'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Function to handle the menu toggle based on Burger click
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // useEffect(() => {

  //   const checkLoggedIn = async () => {
  //     const storedData = localStorage.getItem(
  //       process.env.REACT_APP_LOCALHOST_KEY
  //     );
  //     if (!storedData) {
  //       if (!(location.pathname == '/getinsurances' || location.pathname == '/clinics'))
  //         navigate("/login");
  //     } else {
  //       const userData = JSON.parse(storedData);
  //       setCurrentUser(userData);
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div>
        <LogoSVG width="224" height="45" />
        {currentUser ? (
          <div>
            <div className={menuOpen ? styles.menuOpen : styles.RightNav}>
              <ul>
                <li>
                  <NavLink to="/">
                    <Typography variant="body1-poppins-semibold">
                      Home
                    </Typography>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/petPage">
                    <Typography variant="body1-poppins-semibold">
                      My Pets
                    </Typography>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/clinics">
                    <Typography variant="body1-poppins-semibold">
                      Clinics
                    </Typography>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/getinsurances">
                    <Typography variant="body1-poppins-semibold">
                      Insurances
                    </Typography>
                  </NavLink>
                </li>
                <li className={styles.profileIcon}>
                  <div onClick={handleProfileClick}>
                    <UserSVG width="48" height="48" />
                  </div>
                  {profileMenuOpen && (
                    <div className={styles.profileMenu}>
                      <ul>
                        <li>
                          <NavLink to="/">
                            <Typography variant="body3-poppins-regular" color="almost-black">
                              Account Settings
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
            <div className={menuOpen ? styles.menuOpen : styles.RightNav}>
              <ul>
                <li>
                  <NavLink to="/AboutUs">
                    <Typography variant="body1-poppins-semibold">
                      About Us
                    </Typography>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/clinics">
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
      </div>
    </nav>
  );
};

export default Header;
