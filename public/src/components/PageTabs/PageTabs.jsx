import React, { useState } from "react";
import styles from "./PageTabs.module.css";
import Typography from "../Typography/Typography";

const { active } = styles;

const PageTabs = ({ tabs, onTabChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index) => {
    setActiveIndex(index);
    onTabChange(tabs[index]);
  };

  const nextTab = () => {
    const newIndex = (activeIndex + 1) % tabs.length;
    handleTabChange(newIndex);
  };

  const prevTab = () => {
    const newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    handleTabChange(newIndex);
  };

  return (
    <div className={styles.pageTabs}>
      <ul className={styles.desktopView}>
        {tabs.map((tab, index) => (
          <Typography variant="body2-poppins-medium">
          <li
            key={index}
            className={`desktop-tab ${index === activeIndex ? active : ""}`}
            onClick={() => handleTabChange(index)}
          >
            {tab}
          </li>
          </Typography>
        ))}
      </ul>

      <div className={styles.mobileView}>
        {tabs.length > 1 && (
          <button className="arrow" onClick={prevTab}>&lt;</button>
        )}

        <div className={styles.mobileTabContent}>
          <Typography variant="body1-poppins-semibold">
          <div className={`mobile-tab ${active}`}>
            {tabs[activeIndex]}
          </div>
          </Typography>
        </div>

        {tabs.length > 1 && (
          <button className="arrow" onClick={nextTab}>&gt;</button>
        )}
      </div>
    </div>
  );
};

export default PageTabs;
