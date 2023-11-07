import React, { useState } from "react";
import styles from "./PageTabs.module.css";

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
          <li
            key={index}
            className={`desktop-tab ${index === activeIndex ? active : ""}`}
            onClick={() => handleTabChange(index)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <div className={styles.mobileView}>
        {tabs.length > 1 && (
          <button className="arrow" onClick={prevTab}>&lt;</button>
        )}

        <div className={styles.mobileTabContent}>
          <div className={`mobile-tab ${active}`}>
            {tabs[activeIndex]}
          </div>
        </div>

        {tabs.length > 1 && (
          <button className="arrow" onClick={nextTab}>&gt;</button>
        )}
      </div>
    </div>
  );
};

export default PageTabs;
