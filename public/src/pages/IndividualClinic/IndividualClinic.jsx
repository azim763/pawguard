import React from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicContactCard from "../../components/ClinicContactCard/ClinicContactCard";
import ClinicSpecialtiesCard from "../../components/ClinicSpecialtiesCard/ClinicSpecialtiesCard";
import styles from "./individualClinic.module.css";
import ClinicLocationCard from "../../components/ClinicLocationCard/ClinicLocationCard";
import Aws from "../../components/ClinicOperationsHours/OperHrsCard";

const IndividualClinic = () => {
  const specialties = ["Dentistry", "Allergy"];
  const hoursOfOperation = [
    { day: "Monday", timeSlots: ["9:00 AM - 5:00 PM", "6:00 PM - 9:00 PM"] },
    { day: "Tuesday", timeSlots: ["10:00 AM - 4:00 PM"] },
  ];

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className={styles.IndividualClinicContainer}>
        <div>
          <ClinicLocationCard
            address="1541 Kingsway, Vancouver, BC V5N 2R8"
            hours="Open 24 Hours"
            urgentCare="urgent care clinic"
            latitude={49.246292}
            longitude={-123.116226}
            markerlong={-123.116226}
            markerlat={49.246292}
          />
        </div>
        <div className={styles.ClinicContact}>
          <ClinicContactCard
            clinicTel="+1 234 313-3213"
            clinicUrl="www.clinic.com"
          />
        </div>
        <div className={styles.ClinicSpeciality}>
          <ClinicSpecialtiesCard key="1" specialties={specialties} />
        </div>

        <div className={styles.OpenHrs}>
          <Aws hoursOfOperation={hoursOfOperation} />
        </div>
      </div>
    </div>
  );
};

export default IndividualClinic;
