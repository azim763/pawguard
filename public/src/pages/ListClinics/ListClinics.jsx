import React, { useState } from "react";
import Header from "../../components/Header/header";
import Typography from  "../../components/Typography/Typography";
import ClinicDetailCard from "../../components/ClinicDetailCard/ClinicDetailCard";
import styles from "./ListClinics.module.css";
import PetSelection from '../../components/PetSelection/PetSelection'
import Dropdown from '../../components/Dropdown/Dropdown'
import Button from "../../components/Button/Button";

const ListClinics = () => {
  const specialties = ["allergies", "cancer"]
  const [selectedPet, setSelectedPet] = useState(null);
  const petData = [
    { imgUrl: 'https://picsum.photos/200', petName: 'Pet 1' },
    { imgUrl: 'https://picsum.photos/200', petName: 'Pet 2' },
    // Add more pet data as needed
  ];

  const handlePetClick = (index) => {
    setSelectedPet(index);
  };

  return (
    <div>
      <Header />
      <div className={styles.coverBackground}>
        <div className={styles.opaqueStyle}>
          <Typography variant="h2-poppins-semibold" color="white-white">
            <div className={styles.titleCenter}>
              <div className={styles.title1}>Find Your Clinic</div>
              <Typography variant="sub-h1-poppins-semibold" color="white-white">
              <div className={styles.clinicTag}>Best clinics for your pets in Vancouver</div>
              </Typography>
            </div>
          </Typography>

         

        </div>

      </div>
      <main>
        <div>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          <div>
          Select the pet you would like to find clinics for.
          </div>
          </Typography>
          <Typography variant="sub-h2-poppins-medium" color="almost-black">
          <div>
          Specialties will be recommended for your pet’s needs.
          </div>
          </Typography>

        </div>
        <div className={styles.multiplePetSelection}>
      {petData.map((pet, index) => (
        <PetSelection
          key={index}
          imgUrl={pet.imgUrl}
          petName={pet.petName}
          isSelected={index === selectedPet}
          onClick={() => handlePetClick(index)}
        />
      ))}
    </div>       
     <div className={styles.clincSearch}>
          <div className={styles.dropDownClinics}>
            <Dropdown
                key="specialityDropDown"
                // onChange={handleDropdownChange}
                defaultValue="Allergies"
                options={[
                  { value: "1", label: "Allergies"},
                  { value: "Cardiology", label: "Cardiology" },
                ]}
                size="large"
              />
                <Dropdown
                key="locationDropDown"
                // onChange={handleDropdownChange}
                defaultValue="Vancouver"
                options={[
                  { value: "1", label: "Vancouver"},
                  { value: "Surrey", label: "Surrey" },
                ]}
                size="large"
              />
          </div>
          
          <Button variant="yellow" label="Search" size="dk-md-s"/>
        </div>
    
        <ClinicDetailCard clinicName="Vancouver Veterinary Clinic" clinicRating="4.6" numberOfRatings="32" clinicAddress="5790 Sophia St" specialties={specialties} source="https://picsum.photos/200" />
        <ClinicDetailCard clinicName="Vancouver Veterinary Clinic" clinicRating="4.6" numberOfRatings="32" clinicAddress="5790 Sophia St" specialties={specialties} source="https://picsum.photos/200" />

        <ClinicDetailCard clinicName="Vancouver Veterinary Clinic" clinicRating="4.6" numberOfRatings="32" clinicAddress="5790 Sophia St" specialties={specialties} source="https://picsum.photos/200" />

        <ClinicDetailCard clinicName="Vancouver Veterinary Clinic" clinicRating="4.6" numberOfRatings="32" clinicAddress="5790 Sophia St" specialties={specialties} source="https://picsum.photos/200" />

        <ClinicDetailCard clinicName="Vancouver Veterinary Clinic" clinicRating="4.6" numberOfRatings="32" clinicAddress="5790 Sophia St" specialties={specialties} source="https://picsum.photos/200" />

        <ClinicDetailCard clinicName="Vancouver Veterinary Clinic" clinicRating="4.6" numberOfRatings="32" clinicAddress="5790 Sophia St" specialties={specialties} source="https://picsum.photos/200" />

      </main>

    </div>
  )
}

export default ListClinics
