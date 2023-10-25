import styles from "./AptInfoCard.module.css";
import { FaPoop } from "react-icons/fa";

import Button from "../Button";

const AptInfoCard = ({ aptDate, aptTime, aptAddress, petName, clinicName }) => {
  return (
    <div className={`${styles["AptInfoCard"]}`}>
      <h2>
        Appointment for {petName}
      </h2>
      <p>{clinicName}</p>
      <div className={`${styles["aptDetails"]}`}>
        <FaPoop></FaPoop>
        <p>{aptDate}</p>
        <p>{aptTime}</p>
      </div>
      <div className={`${styles["aptAddress"]}`}>
        <FaPoop></FaPoop>
        <p>{aptAddress}</p>
      </div>
        <Button label="See details" />
    </div>
  );
};

export default AptInfoCard;
