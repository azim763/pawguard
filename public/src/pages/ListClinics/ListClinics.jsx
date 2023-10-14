import React from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicDetailCard from "../../components/ClinicDetailCard/ClinicDetailCard";
import styles from "./ListClinics.module.css";

const ListClinics = () => {
  const specialties = ["allergies", "cancer"]
  return (
    <div>
        <Header/>
        <main>
        <ClinicDetailCard clinicName="Vancouver Veterinary Clinic" clinicRating="4.6" numberOfRatings="32" clinicAddress="5790 Sophia St" specialties={specialties} source="https://picsum.photos/200" / >
        </main>
      
    </div>
  )
}

export default ListClinics
