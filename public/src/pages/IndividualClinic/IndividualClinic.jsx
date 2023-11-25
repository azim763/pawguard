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
import StarRating from "../../components/StarRating/StarRating";

const IndividualClinic = ({ clinicDetails }) => {
  return (
    <div>
      <div className={styles.IndividualClinicContainer}>
        <div className={styles.IndividualClinicInnerWrapper}>
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="h1-poppins-semibold">
              {clinicDetails.Name}
            </Typography>
          </div>
          <div className={styles.clinicRating}>
            <Typography variant="body3-poppins-regular" color="dark-blue">
              {clinicDetails.Rating}
            </Typography>
            <StarRating rating={clinicDetails.Rating} />
          </div>
          <div className={styles.clinicDetailsContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default IndividualClinic;
