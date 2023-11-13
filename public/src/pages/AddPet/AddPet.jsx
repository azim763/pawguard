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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPet = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreExistingMedical, setSelectedPreExistingMedical] = useState(
    []
  );
  // const [bloodType, setBloodType] = useState([]);
  // const [breedType, setBreedType] = useState([]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const toastOptionsSuccess = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
  };
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

  const handleValidation = () => {
    const { PetName, Height, Weight } = petData;
    if (PetName.length < 1) {
      console.log(PetName);
      toast.error("Pet name is required.", toastOptions);
      return false;
    }
    else if (isNaN(Height) || Height.length < 1 || Height.trim() == "") {
      toast.error("Height is required and must be number.", toastOptions);
      return false;
    }
    else if (isNaN(Weight) || Weight.length < 1 || Weight.trim() == " ") {
      toast.error("Weight is required and must be number.", toastOptions);
      return false;
    } 
    return true;
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

  // const defaultGender = gender && gender.length > 0 ? gender[0].value : "";
  // const defaultSpecies = petType && petType.length > 0 ? petType[0].value : "";

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
      if (handleValidation()) {
        const response = await axios.post(createPetRoute, updatedPetData);
        // Handle successful submission
      toast.success("Pet profile created successfully.", toastOptionsSuccess);
    //   console.log("Data submitted successfully:", response.data);
   

        navigate("/");
      } else {
        //  console.error("tttttttt");
      }
    } catch (error) {
      console.error("Error while submitting data:", error);
      toast.error("Error while submitting data.", toastOptions);
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
          <div className={styles.addPetImage}>
            <ImageDisplay PetImageData={selectedImage} />
            <SingleImageUpload
              label="Add Pet Image"
              onImageUpload={handleImageUpload}
            />
          </div>

          <TextInput
            size="md"
            id="PetName"
            label="Name *"
            onChange={handleInputChange}

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
            <Typography variant="textfield-poppins-regular">in</Typography>
          </div>
          <div className={styles.petWeight}>
            <TextInput
              size="sm"
              id="Weight"
              label="Pet Weight *"
              placeholder="Eg: 7"
              type="Number"
              onChange={handleInputChange}
              required={true}
            />
            <Typography variant="textfield-poppins-regular">lbs</Typography>
          </div>
          <MultipleDropDown
            label="Medical Necessities"
            options={preExistingMedical}
            selectedValues={selectedPreExistingMedical}
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
      <ToastContainer />
    </div>
  );
};

export default AddPet;
