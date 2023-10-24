import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import { getClinicByIdRoute } from "../../utils/APIRoutes";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicContactCard from "../../components/ClinicContactCard/ClinicContactCard";
import ClinicSpecialtiesCard from "../../components/ClinicSpecialtiesCard/ClinicSpecialtiesCard";
import styles from "./individualClinic.module.css";
import ClinicLocationCard from "../../components/ClinicLocationCard/ClinicLocationCard";
import Aws from "../../components/ClinicOperationsHours/OperHrsCard";

const IndividualClinic = () => {
  const specialties = ["Dentistry", "Allergy"];
  const [clinicDetails, setClinicDetails] = useState([]);
  const [hoursOfOperation, setHoursOfOperation] = useState([]);

  const { clinicId } = useParams(); // Get the clinic ID from the URL
  console.log(clinicId);

  useEffect(() => {
    axios
      .get(`${getClinicByIdRoute}/${clinicId}`)
      .then((response) => {
        console.log(response.data);
        setClinicDetails(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [clinicId]);

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className={styles.IndividualClinicContainer}>
        <div>
          <ClinicLocationCard
            address={clinicDetails.Address}
            hours={clinicDetails.Open24 ? "Open 24" : "Not open 24"}
            urgentCare={
              clinicDetails.UrgentCare
                ? "Urgent Care Clinic"
                : "Not Urgent Care Clinic"
            }
            latitude={clinicDetails.latitude}
            longitude={clinicDetails.longitude}
            markerlong={clinicDetails.longitude}
            markerlat={clinicDetails.latitude}
          />
        </div>
        <div className={styles.ClinicContact}>
          <ClinicContactCard
            clinicTel={clinicDetails.PhoneNumber}
            clinicUrl={clinicDetails.ClinicUrl}
          />
        </div>
        <div className={styles.ClinicSpeciality}>
          <ClinicSpecialtiesCard
            key="1"
            specialties={clinicDetails.specialities}
          />
        </div>

        <div className={styles.OpenHrs}>
          <Aws hoursOfOperation={clinicDetails.OpeningHours} />
        </div>
      </div>
    </div>
  );
};

export default IndividualClinic;
