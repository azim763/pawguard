import React, { useState } from "react";
import styles from "./operationHrsCard.module.css";

export function Aws({ hoursOfOperation }) {
  const [showAll, setShowAll] = useState(false);

  const visibleEntries = showAll ? hoursOfOperation : hoursOfOperation.slice(0, 3);

  const toggleView = () => {
    setShowAll(!showAll);
  };
  const viewMoreText = showAll ? "View Less" : "View More";


  return (
    <div className={styles.container}>
      <h2>Hours of Operation</h2>
      <ul className={styles.list}>
        {visibleEntries.map((hours, index) => (
          <li key={index} className={styles.entry}>
            <div className={styles.entryContent}>
              <span className={styles.day}>{hours.day}</span>
              <span className={styles.hours}>{hours.timeSlots.join(', ')}</span>
            </div>
          </li>
        ))}
      </ul>
      {hoursOfOperation.length > 3 && (
        <div className={styles.viewMore}>
          <button onClick={toggleView}>{viewMoreText} &#9662;</button>
        </div>
      )}
    </div>
  );
}

export default Aws;
