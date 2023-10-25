import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { createPetRoute } from "../../utils/APIRoutes";
import styles from "./AddPet.module.css";
import SingleImageUpload from "../../components/SingleImageUpload/SingleImageUpload";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";

import Header from "../../components/Header/header";

const AddPet = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const petType = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
  ];

  const gender = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  let bloodType;
  let breedType;

  //   const breedType = fetch function from db;

  const preExistingMedical = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  const [petData, setPetData] = useState({
    PetName: "",
    Gender: "",
    Species: "",
    Breed: "",
    Birthday: "",
    BloodType: "",
    Height: "",
    Weight: "",
    PreExistingMedical: "",
    PetImageName: "",
    Description: "",
  });

  const handleDateChange = (event) => {
    setPetData({
      ...petData,
      Birthday: event.target.value,
    });
  };

  const handleInputChange = (event) => {
    console.log("change is changing okrrr");
    setPetData({
      ...petData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDropdownChange = (name, value) => {
    console.log("dropdown is dropping");
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  if (petData.Species === "cat") {
    bloodType = [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "AB", label: "AB" },
    ];
  } else
    bloodType = [
      { value: "DEA1", label: "DEA 1" },
      { value: "DEA3", label: "DEA 3" },
      { value: "DEA4", label: "DEA 4" },
      { value: "DEA5", label: "DEA 5" },
      { value: "DEA7", label: "DEA 7" },
    ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPetData({
        ...petData,
        PetImageName: imageUrl, // Set the selected image as PetImageName
      });
    }
  };

  const onClickHandler = async (event) => {
    event.preventDefault();
    try {
      // Send data to the server using Axios or fetch
      const response = await axios.post(createPetRoute, petData);

      // Handle successful submission
      console.log("Data submitted successfully:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };

  return (
    <div>
      <Header />
      <Typography variant="large-h1-poppins-bold" color="almost-black">
        Add Pet
      </Typography>
      {/* <img src={selectedImage} alt="Selected" width="200" height="200" /> */}
      <div className={styles.addPetForm}>
        <form action="/submit" method="post" onSubmit={onClickHandler}>
          <SingleImageUpload onChange={handleImageChange} />

          <TextInput
            size="md"
            id="PetName"
            label="Name *"
            onChange={handleInputChange}
            required={true}
          />
          <Dropdown
            size="md"
            label="Type of pet *"
            id="petType"
            options={petType}
            onChange={(selectedValue) =>
              handleDropdownChange("Species", selectedValue)
            }
            required={true}
          />
          <Dropdown
            size="md"
            label="Breed *"
            id="Breed"
            options={petType}
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
            onChange={(selectedValue) =>
              handleDropdownChange("Gender", selectedValue)
            }
            required={true}
          />
          <div>
            <Typography variant="body2-poppins-medium">Birthday</Typography>
            <DatePicker
              id="birthday"
              value={petData.Birthday}
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
              placeholder="Eg: 11"
              onChange={handleInputChange}
              required={true}
            />
            <Typography variant="body2-poppins-medium">in</Typography>
          </div>
          <div className={styles.petWeight}>
            <TextInput
              size="sm"
              id="Weight"
              label="Pet Weight *"
              placeholder="Eg: 7"
              onChange={handleInputChange}
              required={true}
            />
            <Typography variant="body2-poppins-medium">lbs</Typography>
          </div>
          <Dropdown
            size="md"
            label="Pre-existing medical conditions"
            id="PreExistingMedical"
            options={preExistingMedical}
            onChange={(selectedValue) =>
              handleDropdownChange("PreExistingMedical", selectedValue)
            }
          />
          <TextInput
            size="md"
            id="Description"
            label="Pet Notes"
            placeholder="Add your pets Pet preferences, special needs, favourite food or favourite toys."
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="yellow"
            label="Add Pet"
            size="dk-md-s"
          />
        </form>
      </div>
    </div>
  );
};

export default AddPet;
