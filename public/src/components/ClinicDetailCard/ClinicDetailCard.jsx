import { useState, useEffect } from "react";
import styles from "./ClinicDetailCard.module.css";
import { FaPoop } from "react-icons/fa";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";

const ClinicDetailCard = ({
  clinicName,
  clinicRating,
  numberOfRatings,
  clinicAddress,
  specialties,
  source,
}) => {
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
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {clinicName}
        </Typography>
        <div className={styles.clinicRating}>
        <Typography variant="body3-poppins-regular" color="almost-black">
          {clinicRating}
        </Typography>
          {/* <img src="" alt="" /> */}
          <Typography variant="body3-poppins-regular" color="almost-black">
          {numberOfRatings}
          </Typography>
        </div>
        <div className={styles.clinicAddress}>
          <FaPoop />
          <Typography variant="body3-poppins-regular" color="almost-black">
          {clinicAddress}
          </Typography>
        </div>

        <div className={styles.clinicOpen}>
          <FaPoop />
          <Typography variant="body3-poppins-regular" color="almost-black">
            {isOpen ? "Open Now" : "Closed"}
            </Typography>
        </div>

        <div className={styles.clinicSpecialties}>
          <FaPoop />
          <ul>
            {specialties.map((item, index) => (
              <Typography variant="body3-poppins-regular" color="almost-black">
                <li key={index}>{item}</li>
                </Typography>
            ))}
          </ul>
        </div>
        <Button variant="dark-blue" label="View details" size="dk-sm" />
      </div>
    </div>
  );
};

export default ClinicDetailCard;
