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
  const { clinicId } = useParams(); // Get the clinic ID from the URL
  console.log(clinicId);
  // const specialties = ["Dentistry", "Allergy"];
  const [clinicDetails, setClinicDetails] = useState({});
  const [hoursOfOperation, setHoursOfOperation] = useState([]);

  useEffect(() => {
    axios
      .get(`${getClinicByIdRoute}/${clinicId}`)
      .then((response) => {
        console.log(response.data);
        setClinicDetails(response.data);
        console.log(response.data.Address);
        console.log(clinicDetails);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [clinicId]);

  useEffect(() => {
    if (clinicDetails) {
      console.log(clinicDetails.Address);
      console.log(clinicDetails.Latitude);
    }
  }, [clinicDetails]);

  console.log(clinicDetails.latitude); // This might not print the updated value immediately.

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      
      <div style={{padding: "5%"}}>
        <div style={{marginBottom: "20px"}}>
          <Typography variant="h1-poppins-semibold">{clinicDetails.Name}</Typography>
        </div>
        {clinicDetails._id && (
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
                latitude={clinicDetails.Latitude}
                longitude={clinicDetails.Longitude}
                markerlong={clinicDetails.Longitude}
                markerlat={clinicDetails.Latitude}
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
                specialtiesCardString={clinicDetails.Specialty}
              />
            </div>
            <div className={styles.OpenHrs}>
              <Aws operationHrsString={clinicDetails.OpeningHours} />
            </div>
      </div>
      )}
      </div>
    </div>
  );
};

export default IndividualClinic;
