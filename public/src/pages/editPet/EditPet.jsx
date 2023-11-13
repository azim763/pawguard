import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  updatePetByIdRoute,
  searchPetsByUserIDRoute,
} from "../../utils/APIRoutes.js";
import styles from "./EditPet.module.css";
import SingleImageUpload from "../../components/SingleImageUpload/SingleImageUpload";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";
import Header from "../../components/Header/header";
import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";
import ImageDisplay from "../../components/ImageDisplay/ImageDisplay";

const EditPet = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreExistingMedical, setSelectedPreExistingMedical] = useState(
    []
  );
  const { petID } = useParams();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const originalValue = 'initial value';
  const [editedValue, setEditedValue] = useState(originalValue);
  

  // Define a function to handle changes in the input
  const handleChange = (event) => {
    setEditedValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (storedData) {
          const petData = localStorage.getItem("petsData");
          if (petData) {
            const petArray = JSON.parse(petData);
            setPets(petArray);

            if (!selectedPet && petArray.length > 0) {
              setSelectedPet(petArray[0]); // Set the first pet by default
            }

            if (petID) {
              // Find the pet with the matching ID and set it as the selectedPet
              const matchingPet = petArray.find((pet) => pet._id === petID);
              if (matchingPet) {
                setSelectedPet(matchingPet);
              }
            }
          } else {
            const data = JSON.parse(storedData);
            console.log(data);
            const response = await axios.get(searchPetsByUserIDRoute, {
              params: { userID: data._id },
            });
            setPets(response.data);
            if (!selectedPet && response.data.length > 0) {
              setSelectedPet(response.data[0]);
            }
          }
        }
      } catch (error) {}
    };

    fetchData();
  }, [petID]);

  const petType = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
  ];

  let bloodType = [
    { value: "DEA1", label: "DEA 1" },
    { value: "DEA3", label: "DEA 3" },
    { value: "DEA4", label: "DEA 4" },
    { value: "DEA5", label: "DEA 5" },
    { value: "DEA7", label: "DEA 7" },
  ];
  let breedType = [
    { value: "Beagle", label: "Beagle" },
    { value: "Golden Retriever", label: "Golden Retriever" },
    { value: "Poodle", label: "Poodle" },
    { value: "Rottweiler", label: "Rottweiler" },
    { value: "Siberian Husky", label: "Siberian Husky" },
  ];

  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const preExistingMedical = [
    "Arthritis XD",
    "Bloodwork",
    "Cardiology",
    "Cytology",
    "Dentistry",
    "Dermatology",
    "Endoscopy",
    "Euthanasia",
    "Internal-medicine",
    "Laser-therapy",
    "Microchipping",
    "Neurology",
    "Nutrition",
    "Oncology",
    "Radiography",
    "Senior",
    "Surgery",
    "Ultrasound",
  ];

  const petBday = selectedPet.Birthday;
  const originalDate = new Date(petBday);

  const formattedDate = `${originalDate.getFullYear()}-${String(
    originalDate.getMonth() + 1
  ).padStart(2, "0")}-${String(originalDate.getDate()).padStart(2, "0")}`;

  const [petData, setPetData] = useState({
    UserID: "",
    PetName: "",
    Gender: gender[0].value,
    Species: petType[0].value,
    Breed: breedType[0].value,
    Birthday: "",
    BloodType: bloodType[0].value,
    Height: "",
    Weight: "",
    PreExistingMedical: "",
    PetImageName: "",
    Description: "",
  });

  useEffect(() => {
    if (selectedPet) {
      setPetData({
        ...petData,
        PetName: selectedPet.PetName,
        Gender: selectedPet.Gender,
        Species: selectedPet.Species,
        Breed: selectedPet.Breed,
        Birthday: selectedPet.Birthday,
        BloodType: selectedPet.BloodType,
        Height: selectedPet.Height,
        Weight: selectedPet.Weight,
        PreExistingMedical: selectedPet.PreExistingMedical,
        PetImageName: selectedPet.PetImageName,
        Description: selectedPet.Description,
      });
    }
  }, [selectedPet]);

  const handleDateChange = (event) => {
    setPetData({
      ...petData,
      Birthday: event.target.value,
    });
  };

  const handleInputChange = (event) => {
    console.log("Input changed:", event.target.value);
    // const { name, value } = event.target;
  
    // setPetData((prevPetData) => ({
    //   ...prevPetData,
    //   [name]: value,
    // }));
  };

  if (petData.Species === "Cat") {
    bloodType = [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "AB", label: "AB" },
    ];

    breedType = [
      { value: "Domestic Shorthair", label: "Domestic Shorthair" },
      { value: "American Shorthair", label: "American Shorthair" },
      { value: "Domestic Longhair", label: "Domestic Longhair" },
      { value: "Ragdoll", label: "Ragdoll" },
      { value: "Siamese", label: "Siamese" },
    ];
  } else {
    bloodType = [
      { value: "DEA1", label: "DEA 1" },
      { value: "DEA3", label: "DEA 3" },
      { value: "DEA4", label: "DEA 4" },
      { value: "DEA5", label: "DEA 5" },
      { value: "DEA7", label: "DEA 7" },
    ];

    breedType = [
      { value: "Beagle", label: "Beagle" },
      { value: "Golden Retriever", label: "Golden Retriever" },
      { value: "Poodle", label: "Poodle" },
      { value: "Rottweiler", label: "Rottweiler" },
      { value: "Siberian Husky", label: "Siberian Husky" },
    ];
  }

  const handleDropdownChange = (name, value) => {
    console.log("dropdown is dropping");
    setPetData({
      ...petData,
      [name]: value,
    });
    console.log(petData);
  };

  const handleMultipleDropdownChange = (e) => {
    setSelectedPreExistingMedical(e);
    console.log(e.join(","));
    setPetData({
      ...petData,
      PreExistingMedical: e.join(","),
    });
  };

  const handleImageUpload = (data) => {
    setPetData({
      ...petData,
      PetImageName: data,
    });
    setSelectedImage(data);
  };

  const onClickHandler = async (event) => {
    event.preventDefault();
    console.log(petData);

    // try {
    //   const storedData = await JSON.parse(
    //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    //   );

    //   const updatedPetData = {
    //     ...petData,
    //     UserID: storedData._id,
    //   };

    //   setPetData(updatedPetData);

    //   const response = await axios.put(updatePetByIdRoute, updatedPetData);

    //   // Handle successful submission
    //   console.log("Data submitted successfully:", response.data);
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error while submitting data:", error);
    //   // Handle the error, e.g., display an error message to the user.
    // }
  };

  return (
    <div>
      <Header />
      <div className={styles.editPetHeader}>
        <Typography variant="large-h1-poppins-bold" color="almost-black">
          Edit Pet Details
        </Typography>
      </div>
      <div className={styles.editPetForm}>
        <form action="/submit" method="post" onSubmit={onClickHandler}>
          <div className={styles.editPetImage}>
            <ImageDisplay PetImageData={selectedPet.PetImageName} />
            <SingleImageUpload
              label="Change Pet Image"
              onImageUpload={handleImageUpload}
            />
          </div>

          <TextInput
            size="md"
            id="PetName"
            label="Name *"
            propInputValue={selectedPet.PetName}
            onChange={handleInputChange}
            required={true}
          />

          <Dropdown
            size="md"
            label="Type of pet *"
            id="petType"
            options={petType}
            defaultValue={selectedPet.Species}
            onChange={(selectedValue) =>
              handleDropdownChange("Species", selectedValue)
            }
            required={true}
          />
          <Dropdown
            size="md"
            label="Breed *"
            id="Breed"
            options={breedType}
            defaultValue={selectedPet.Breed}
            onChange={(selectedValue) =>
              handleDropdownChange("Breed", selectedValue)
            }
            required={true}
          />
          <Dropdown
            size="md"
            label="Gender *"
            id="Gender"
            options={gender}
            defaultValue={selectedPet.Gender}
            onChange={(selectedValue) =>
              handleDropdownChange("Gender", selectedValue)
            }
            required={true}
          />
          <div>
            <Typography variant="body2-poppins-medium">Birthday</Typography>
            <DatePicker
              id="birthday"
              value={formattedDate}
              onChange={handleDateChange}
            />
          </div>

          <Dropdown
            size="md"
            label="Blood type"
            id="BloodType"
            options={bloodType}
            onChange={(selectedValue) =>
              handleDropdownChange("BloodType", selectedValue)
            }
          />
          <div className={styles.petHeight}>
            <TextInput
              size="sm"
              id="Height"
              label="Pet Height *"
              propInputValue={selectedPet.Height}
              onChange={handleInputChange}
              required={true}
            />
            <Typography variant="textfield-poppins-regular">in</Typography>
          </div>
          <div className={styles.petWeight}>
            <TextInput
              size="sm"
              id="Weight"
              label="Pet Weight *"
              propInputValue={selectedPet.Weight}
              onChange={handleInputChange}
              required={true}
            />
            <Typography variant="textfield-poppins-regular">lbs</Typography>
          </div>
          <MultipleDropDown
            label="Medical Necessities"
            options={preExistingMedical}
            selectedValues={
              typeof selectedPet.PreExistingMedical === "string"
                ? selectedPet.PreExistingMedical.split(",")
                : []
            }
            onSelect={handleMultipleDropdownChange}
          />
          <div>
            <Typography variant="body2-poppins-medium">
              <label htmlFor="Description">Pet Notes</label>
            </Typography>
            <textarea
              name="Description"
              id="Description"
              cols="30"
              rows="10"
              defaultValue={selectedPet.Description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <Button type="submit" variant="yellow" label="Save" size="dk-md-s" />
        </form>
      </div>
    </div>
  );
};

export default EditPet;