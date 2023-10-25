import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllClinicsRoute } from "../../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicDetailCard from "../../components/ClinicDetailCard/ClinicDetailCard";
import styles from "./ListClinics.module.css";
import PetSelection from "../../components/PetSelection/PetSelection";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import TextInputIcon from "../../components/TextInputIcon/TextInputIcon";

const ListClinics = () => {
  // const specialties = ["allergies", "cancer"];
  const [selectedPet, setSelectedPet] = useState(null);
  const [clinicData, setClinicData] = useState([]);

  const navigate = useNavigate();
  const petData = [
    { imgUrl: "https://picsum.photos/200", petName: "Pet 1", index: 1 },
    { imgUrl: "https://picsum.photos/200", petName: "Pet 2", index: 2 },
    // Add more pet data as needed
  ];

  useEffect(() => {
    axios
      .get(getAllClinicsRoute)
      .then((response) => {
        console.log(response.data);
        setClinicData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const handlePetClick = (index) => {
    setSelectedPet(index);
  };

  const handleClickDetails = (clinicId) => {
    navigate(`/clinic/details/${clinicId}`);
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
                <div className={styles.clinicTag}>
                  Best clinics for your pets in Vancouver
                </div>
              </Typography>
            </div>
          </Typography>
        </div>
      </div>
      <main>
        <div>
          <Typography variant="h2-poppins-semibold" color="almost-black">
            Select the pet you would like to find clinics for.
          </Typography>
          <Typography variant="sub-h2-poppins-medium" color="almost-black">
            Specialties will be recommended for your pet’s needs.
          </Typography>
        </div>
        <div className={styles.multiplePetSelection}>
          {petData.map((pet, index) => (
            <PetSelection
              key={index}
              imgUrl={pet.imgUrl}
              petName={pet.petName}
              isSelected={index === selectedPet}
              // onClick={() => handlePetClick(index)}
            />
          ))}
        </div>
        <div className={styles.clinicSearch}>
          <div className={styles.dropDownClinics}>
            <Dropdown
              key="specialityDropDown"
              // onChange={handleDropdownChange}
              defaultValue="Allergies"
              options={[
                { value: "1", label: "Allergies" },
                { value: "Cardiology", label: "Cardiology" },
              ]}
              size="large"
            />
            <TextInputIcon label="Zip Code" />
          </div>

          <Checkbox id="urgCare" label="Urgent Care" value="urgCare" />
          <Checkbox id="24hrs" label="Open 24 hours" value="24hrs" />

          <Button variant="yellow" label="Search" size="dk-md-s" />
        </div>

        {clinicData.map((clinic) => (
          <ClinicDetailCard
            key={clinic._id}
            clinicName={clinic.Name}
            clinicRating={clinic.Rating}
            // numberOfRatings={clinic.numberOfRatings}`
            clinicAddress={clinic.Address}
            specialtiesString={clinic.Specialty}
            source={clinic.ImageUrl}
            open24={clinic.Open24 ? "Open 24" : "Not open 24"}
            handleClickDetails={() => handleClickDetails(clinic._id)}
          />
        ))}
      </main>
    </div>
  );
};

export default ListClinics;
