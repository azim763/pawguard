import React, { useState, useEffect } from "react";
import styles from "./operationHrsCard.module.css";
import Typography from "../Typography/Typography";

export function Aws({ operationHrsString }) {
  const [showAll, setShowAll] = useState(false);
  const [operationHrsArray, setOperationHrsArray] = useState([]);

  // const visibleEntries = showAll ? hoursOfOperation : hoursOfOperation.slice(0, 3);

  useEffect(() => {
    const operationHrsArray = operationHrsString.split("\n");
    setOperationHrsArray(operationHrsArray);
  }, [operationHrsString]);

  const toggleView = () => {
    setShowAll(!showAll);
  };
  const viewMoreText = showAll ? "View Less" : "View More";

  return (
    <div className={styles.container}>
      <div className={styles.OperationTitle}>
        <Typography variant="sub-h1-poppins-semibold">Hours of Operation</Typography>
      </div>
      <ul className={styles.list}>
        <Typography variant="body2-poppins-medium">
        {operationHrsArray.map((hours, index) => (
          <li key={index} className={styles.entry}>
            <div className={styles.entryContent}>{hours}
              {/* <span className={styles.day}>{hours}</span> */}
              {/* <span className={styles.hours}>{hours.timeSlots.join(", ")}</span> */}
            </div>
          </li>
        ))}
        </Typography>
      </ul>
      {/* {operationHrsArray.length > 3 && (
        <div className={styles.viewMore}>
          <button onClick={toggleView}>{viewMoreText} &#9662;</button>
        </div>
      )} */}
    </div>
  );
}

export default Aws;
