import React, { useState, useEffect } from "react";
import styles from "./operationHrsCard.module.css";
import Typography from "../Typography/Typography";

export function Aws({ operationHrsString }) {
  const [showAll, setShowAll] = useState(false);
  const [operationHrsArray, setOperationHrsArray] = useState([]);

  useEffect(() => {
    const separatedData = operationHrsString.split("\n").map((entry) => {
      const [day, hours] = entry.split(": ");
      return { day, hours };
    });

    setOperationHrsArray(separatedData);
  }, [operationHrsString]);

  const toggleView = () => {
    setShowAll(!showAll);
  };

  const viewMoreText = showAll ? "View Less" : "View More";

  return (
    <div className={styles.container}>
      <div className={styles.OperationTitle}>
        <Typography variant="sub-poppins-medium">Hours of Operation</Typography>
      </div>
      <div className={styles.grid}>
        {operationHrsArray.map((entry, index) => (
          <Typography variant="body2-poppins-medium">
            <div className={styles.ophrs} key={index}>
              <div>{entry.day}</div>
              <div>{entry.hours}</div>
            </div>
          </Typography>
        ))}
        <div>
          {operationHrsArray.length > 3 && (
            <div className={styles.viewMore}>
              <button onClick={toggleView}>{viewMoreText} &#9662;</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Aws;
