import React from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicContactCard from "../../components/ClinicContactCard/ClinicContactCard";
import ClinicSpecialtiesCard from "../../components/ClinicSpecialtiesCard/ClinicSpecialtiesCard";
import styles from "./individualClinic.module.css";

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
        <ClinicSpecialtiesCard 
        key="1"
        specialties={specialties} />
      </div>
    </div>
  );
};

export default IndividualClinic;
