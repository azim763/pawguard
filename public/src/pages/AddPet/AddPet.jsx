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
import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";
import ImageDisplay from "../../components/ImageDisplay/ImageDisplay";
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

  const defaultGender = gender && gender.length > 0 ? gender[0].value : "";
  const defaultSpecies = petType && petType.length > 0 ? petType[0].value : "";

  const [petData, setPetData] = useState({
    UserID: "",
    PetName: "",
    Gender: defaultGender,
    Species: defaultSpecies,
    Breed: "Beagle",
    Birthday: "",
    BloodType: "DEA1",
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

  if (petData.Species === "cat") {
    breedType = [
      { value: "Domestic Shorthair", label: "Domestic Shorthair" },
      { value: "American Shorthair", label: "American Shorthair" },
      { value: "Domestic Longhair", label: "Domestic Longhair" },
      { value: "Ragdoll", label: "Ragdoll" },
      { value: "Siamese", label: "Siamese" },
    ];
  } else
    breedType = [
      { value: "Beagle", label: "Beagle" },
      { value: "Golden Retriever", label: "Golden Retriever" },
      { value: "Poodle", label: "Poodle" },
      { value: "Rottweiler", label: "Rottweiler" },
      { value: "Siberian Husky", label: "Siberian Husky" },
    ];

  const handleImageUpload = (data) => {
    // Handle the image data in the parent component
    setPetData({
      ...petData,
      PetImageName: data, // Use the 'data' parameter instead of 'imageData'
    });
    setSelectedImage(data);
    console.log(data); // This logs the image data
    console.log(petData); // This logs the petData with the updated PetImageName
  };

  const onClickHandler = async (event) => {
    event.preventDefault();

    try {
      const storedData = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const updatedPetData = {
        ...petData,
        UserID: storedData._id,
      };

      setPetData(updatedPetData);

      const response = await axios.post(createPetRoute, updatedPetData);

      // Handle successful submission
      console.log("Data submitted successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error while submitting data:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.addPetHeader}>
        <Typography variant="large-h1-poppins-bold" color="almost-black">
          Add Pet
        </Typography>
      </div>
      <div className={styles.addPetForm}>
        <form action="/submit" method="post" onSubmit={onClickHandler}>
          <div>
            <SingleImageUpload onImageUpload={handleImageUpload} />
            <div className={styles.showImage}>
              <ImageDisplay PetImageData={selectedImage}></ImageDisplay>
            </div>
          </div>

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
            options={breedType}
            value={breedType[0]}
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
            value={bloodType[0]}
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
          <MultipleDropDown
            label="Pre-existing medical conditions"
            options={preExistingMedical}
          />
          <div>
          <Typography variant="body2-poppins-medium"><label htmlFor="Description">Pet Notes</label></Typography>
            <textarea
              name="Description"
              id="Description"
              cols="30"
              rows="10"
              placeholder="Add your pets Pet preferences, special needs, favourite food or favourite toys."
              onChange={handleInputChange}
            ></textarea>
          </div>
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
