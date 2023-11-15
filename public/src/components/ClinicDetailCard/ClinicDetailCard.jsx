import { useState, useEffect } from "react";
import styles from "./ClinicDetailCard.module.css";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import LocationSVG from "../../components/SVG/LocationSVG";
import ClockSVG from "../../components/SVG/ClockSVG";
import SpecialtySVG from "../../components/SVG/SpecialtySVG";

const ClinicDetailCard = ({
  key,
  clinicName,
  clinicRating,
  clinicRatingStar,
  // numberOfRatings,
  clinicAddress,
  specialtiesString,
  handleClickDetails,
  source,
  open24,
}) => {
  const [specialtiesArray, setspecialtiesArray] = useState([]);

  useEffect(() => {
    const specialtiesArray = specialtiesString.split(",");
    setspecialtiesArray(specialtiesArray);
  }, [specialtiesString]);

  // const [isOpen, setIsOpen] = useState(null);

  // useEffect(() => {
  //   // something something
  //   //  .then(response => {
  //   //    setIsOpen(response.data.isOpen); // Assuming the API response has an "isOpen" property
  //   //  })
  //   //  .catch(error => {
  //   //    console.error('Error fetching clinic status:', error);
  //   //  });
  //   setIsOpen(true);
  // }, []);

  return (
    <div className={styles.clinicCard}>
      <div className={styles.imageContainer}>
        {" "}
        <img src={source} alt="clinic" />
      </div>
      <div className={styles.clinicInfo}>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {clinicName}
        </Typography>
        <div className={styles.clinicRating}>
          <Typography variant="body3-poppins-regular" color="almost-black">
            {clinicRating}
          </Typography>
            {clinicRatingStar}
        </div>
        <div className={styles.clinicAddress}>
          <LocationSVG className={styles.locationSVG} />
          <div className="add-description">
            <Typography variant="body3-poppins-regular" color="almost-black">
              {clinicAddress}
            </Typography>
          </div>
        </div>

        <div className={styles.clinicOpen}>
          <ClockSVG className={styles.clockSVG}/>
          <div className="open-description">
            <Typography variant="body3-poppins-regular" color="almost-black">
              {open24}
            </Typography>
          </div>
        </div>

        <div className={styles.clinicSpecialties}>
          <SpecialtySVG className={styles.specialtySVG} />
          <ul className={styles.listing}>
            {specialtiesArray.map((item, index) => (
              <Typography variant="body3-poppins-regular" color="almost-black">
                <li className={styles.listingList} key={index}>
                  {item}
                </li>
              </Typography>
            ))}
          </ul>
        </div>
        <Button
          variant="dark-blue"
          label="View details"
          size="dk-sm"
          onClick={handleClickDetails}
        />
      </div>
    </div>
  );
};

export default ClinicDetailCard;
