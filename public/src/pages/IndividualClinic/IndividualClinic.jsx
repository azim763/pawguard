import React from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicContactCard from "../../components/ClinicContactCard/ClinicContactCard";
import styles from "./individualClinic.module.css";

const IndividualClinic = () => {
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div>
        <ClinicContactCard clinicTel="+1 234 313-3213" clinicUrl="www.clinic.com" />
      </div>
    </div>
  );
};

export default IndividualClinic;
