import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllClinicsRoute } from "../../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicDetailCard from "../../components/ClinicDetailCard/ClinicDetailCard";
import styles from "./ListClinics.module.css";
import PetSelection from "../../components/PetSelection/PetSelection";
// import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import TextInputIcon from "../../components/TextInputIcon/TextInputIcon";
import { searchPetsByUserIDRoute } from "../../utils/APIRoutes.js";
import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";

let originalClinicData = [];

const ListClinics = () => {
  const [pets, setPets] = useState([]);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.get(searchPetsByUserIDRoute, {
      params: { userID: data._id },
    });
    setPets(response.data);
  }, []);

  // const options = ["Dentistry", "Allergies"];

  const [selectedPet, setSelectedPet] = useState(null);
  const [clinicData, setClinicData] = useState([]);
  const [urgentCareChecked, setUrgentCareChecked] = useState(false);
  const [open24hrsChecked, setOpen24hrsChecked] = useState(false);

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
        originalClinicData = response.data;
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

  // const onCheckHandler = (event) => {
  //   const { id, checked } = event.target;
  //   if (id === "urgCare") {
  //     setUrgentCareChecked(checked);
  //     console.log("Urgent Care checked:", checked);
  //   } else if (id === "24hrs") {
  //     setOpen24hrsChecked(checked);
  //     console.log("Open 24 Hours checked:", checked);
  //   }
  // };

  const handleUrgCheckboxChange = (event) => {
    const { checked } = event.target;
    setUrgentCareChecked(event.target.checked);
    console.log("Urgent Care checked", checked);
    console.log(originalClinicData);
  };

  const handle24CheckboxChange = (event) => {
    setOpen24hrsChecked(event.target.checked);
    const { checked } = event.target;
    console.log("Open 24 Hours checked", checked);
    console.log(originalClinicData);
  };

  const onClickHandler = () => {
    const matchesUrgentCare = urgentCareChecked;
    const matchesOpen24hrs = open24hrsChecked;

    if (matchesUrgentCare || matchesOpen24hrs) {
      const filteredResults = originalClinicData.filter((clinic) => {
        return (
          (!matchesUrgentCare || clinic.UrgentCare) &&
          (!matchesOpen24hrs || clinic.Open24)
        );
      });

      setClinicData(filteredResults);
      console.log(filteredResults);
    } else if (matchesUrgentCare && matchesOpen24hrs) {
      const filteredResults = originalClinicData.filter((clinic) => {
        return (
          (matchesUrgentCare || clinic.UrgentCare) &&
          (matchesOpen24hrs || clinic.Open24)
        );
      });
      setClinicData(filteredResults);
      console.log(filteredResults);
    } else {
      setClinicData(originalClinicData);
      console.log(originalClinicData);
    }
  };

  //     const matchesUrgentCare = urgentCareChecked ? clinic.UrgentCare : false;
  //     const matchesOpen24hrs = open24hrsChecked ? clinic.Open24 : false;
  //     if (urgentCareChecked && open24hrsChecked) {
  //       return matchesUrgentCare && matchesOpen24hrs;
  //     } else if (urgentCareChecked) {
  //       return matchesUrgentCare;
  //     } else if (open24hrsChecked) {
  //       return matchesOpen24hrs;
  //     } else {
  //       return false;
  //     }
  //   });

  //   setClinicData(
  //     urgentCareChecked || open24hrsChecked ? clinicData : filteredResults
  //   );
  //   console.log(filteredResults);
  //   console.log(clinicData);
  // };

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
            {/* <Dropdown
              key="specialityDropDown"
              // onChange={handleDropdownChange}
              defaultValue="Allergies"
              options={[
                { value: "1", label: "Allergies" },
                { value: "Cardiology", label: "Cardiology" },
              ]}
              size="large"
            /> */}
            <MultipleDropDown options={["Allergies", "Cardiology", "digestive tract"]} />
            <TextInputIcon label="Location" />
          </div>

          <Checkbox
            id="urgCare"
            label="Urgent Care"
            onChangeHandler={handleUrgCheckboxChange}
            value={urgentCareChecked}
          />
          <Checkbox
            id="24hrs"
            label="Open 24 hours"
            onChangeHandler={handle24CheckboxChange}
            value={open24hrsChecked}
          />

          <Button
            variant="yellow"
            label="Search"
            size="dk-md-s"
            onClickHandler={onClickHandler}
          />
        </div>

        {clinicData.map((clinic) => (
          <ClinicDetailCard
            key={clinic._id}
            clinicName={clinic.Name}
            clinicRating={clinic.Rating}
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
