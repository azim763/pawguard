import React, { useState, useEffect } from "react";
import styles from "./operationHrsCard.module.css";
import Typography from "../Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export function Aws({ operationHrsString }) {
  const [showAll, setShowAll] = useState(false);
  const [operationHrsArray, setOperationHrsArray] = useState([]);
  const hrsArray = operationHrsString.split("\n");
 // console.log(hrsArray);

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

  const viewMoreText = showAll ? (
    <>
      <div className={styles.viewMoreContainer}>View Less</div>{" "}
      <FontAwesomeIcon icon={faAngleUp} />
    </>
  ) : (
    <>
      <div className={styles.viewMoreContainer}>View More</div>{" "}
      <FontAwesomeIcon icon={faAngleDown} />
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.OperationTitle}>
        <Typography variant="sub-poppins-medium">Hours of Operation</Typography>
      </div>

      <div className={styles.grid}>
        {operationHrsArray.map((entry, index) => (
          <Typography variant="body2-poppins-medium" key={index}>
            <div className={styles.ophrs}>
              <div>{entry.day}</div>
              <div>{entry.hours}</div>
            </div>
          </Typography>
        ))}
      </div>

      <div className={styles.gridMobile}>
        {operationHrsArray
          .slice(0, showAll ? hrsArray.length : 3)
          .map((entry, index) => (
            <Typography variant="body2-poppins-medium" key={index}>
              <div className={styles.ophrs}>
                <div>{entry.day}</div>
                <div>{entry.hours}</div>
              </div>
            </Typography>
          ))}
        <div>
          {hrsArray.length > 3 && (
            <div className={`${styles.viewMore} ${styles.viewMoreButton}`}>
              <button onClick={toggleView}>{viewMoreText} </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Aws;
