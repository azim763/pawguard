import { useState, useEffect } from "react";
import styles from "./ClinicDetailCard.module.css";
import { FaPoop } from "react-icons/fa";
import Button from "../Button/Button";

const ClinicDetailCard = ( { clinicName, clinicRating, numberOfRatings, clinicAddress, specialties, source } ) => {
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    // something something
    //  .then(response => {
    //    setIsOpen(response.data.isOpen); // Assuming the API response has an "isOpen" property
    //  })
    //  .catch(error => {
    //    console.error('Error fetching clinic status:', error);
    //  });
    setIsOpen(true);
  }, []);

  return (
    <div className={styles.clinicCard}>
      <img src={source} alt="" />
      <div className={styles.clinicInfo}>
        <h2>{clinicName}</h2>
        <div className={styles.clinicRating}>
          <p>{clinicRating}</p>
          {/* <img src="" alt="" /> */}
          <p>({numberOfRatings})</p>
        </div>
        <div className={styles.clinicAddress}>
          <FaPoop />
          <p>{clinicAddress}</p>
        </div>

        <div className={styles.clinicOpen}>
          <FaPoop />
          <p>{isOpen ? "Open Now" : "Closed"}</p>
        </div>
        
        <div className={styles.clinicSpecialties}>
          <FaPoop />
          <ul>
            {specialties.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Button variant="dark-blue" label="View details" size="dk-sm"/>
        
        
      </div>
    </div>
  );
};

export default ClinicDetailCard;
