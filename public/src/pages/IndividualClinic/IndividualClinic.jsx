import React from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicContactCard from "../../components/ClinicContactCard/ClinicContactCard";
import ClinicSpecialtiesCard from "../../components/ClinicSpecialtiesCard/ClinicSpecialtiesCard";
import styles from "./individualClinic.module.css";
import ClinicLocationCard from "../../components/ClinicLocationCard/ClinicLocationCard";

const IndividualClinic = () => {
  const specialties = ["Dentistry", "Allergy"];

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div>
        <ClinicContactCard
          clinicTel="+1 234 313-3213"
          clinicUrl="www.clinic.com"
        />
      </div>
      <div>
        <ClinicSpecialtiesCard key="1" specialties={specialties} />
      </div>

      <div>
        <ClinicLocationCard address="1541 Kingsway, Vancouver, BC V5N 2R8" hours="Open 24 Hours" urgentCare="urgent care clinic" />
      </div>
    </div>
  );
};

export default IndividualClinic;
