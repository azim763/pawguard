import React, { useState } from "react";
import styles from "./PageTabs.module.css";

const { active } = styles;

const PageTabs = ({ tabs, onTabChange }) => {
  const [activeLink, setActiveLink] = useState(tabs[0]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    onTabChange(link);
  };

  const isImageLink = (link) => {
    // COME BACK FOR THIS
    return link.endsWith(".jpg") || link.endsWith(".png") || link.endsWith(".jpeg");
  };

  return (
    <ul className={styles.pageTabs}>
      {tabs.map((item, index) => (
        <li key={index} className={activeLink === item ? active : ""}>
          {isImageLink(item) ? (
            <img src={item} onClick={() => handleLinkClick(item)} />
          ) : (
            <div onClick={() => handleLinkClick(item)}>{item}</div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PageTabs;
