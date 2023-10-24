import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AddPet.module.css";
import SingleImageUpload from "../../components/SingleImageUpload/SingleImageUpload";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";
import { useNavigate, Link } from "react-router-dom";
import { createPetRoute } from "../../utils/APIRoutes";

const AddPet = ( ) => {
  const [selectedImage, setSelectedImage] = useState(null);

 
  const navigate = useNavigate();
  const petType = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
  ];

  //   const breedType = fetch function from db;

  const gender = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  const bloodType = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

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

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];

  //   if (selectedImage) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImage(e.target.result);
  //       onImageSelect(e.target.result); // Pass the image to the parent component
  //     };
  //     reader.readAsDataURL(selectedImage);
  //   } else {
  //     setImage(null);
  //     onImageSelect(null); // Pass null when no image is selected
  //   }
  // };

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
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };

  return (
    <div>
      <Typography variant="large-h1-poppins-bold" color="almost-black">
        Add Pet
      </Typography>

      {/* <img src={selectedImage} alt="Selected" width="200" height="200" /> */}
      <div className={styles.addPetForm}>
        
        <form action="/submit" method="post" onSubmit={onClickHandler}>
        <SingleImageUpload onChange={handleImageChange} />

          <TextInput id="PetName" label="Name" onChange={handleInputChange} />
          <Dropdown
            label="Type of pet"
            id="petType"
            options={petType}
            onChange={(selectedValue) =>
              handleDropdownChange("petType", selectedValue)
            }
          />
          <Dropdown
            label="Gender"
            id="Gender"
            options={gender}
            onChange={(selectedValue) =>
              handleDropdownChange("Gender", selectedValue)
            }
          />
          <Typography variant="body2-poppins-medium">Birthday</Typography>
          <DatePicker
            id="birthday"
            value={petData.Birthday}
            onChange={handleDateChange}
          />
          <Dropdown
            label="Blood type"
            id="BloodType"
            options={bloodType}
            onChange={(selectedValue) =>
              handleDropdownChange("BloodType", selectedValue)
            }
          />
          <div className={styles.petHeight}>
            <TextInput
              id="Height"
              label="Pet Height"
              placeholder="Eg: 11"
              onChange={handleInputChange}
            />
            <Typography variant="body2-poppins-medium">in</Typography>
          </div>
          <div className={styles.petWeight}>
            <TextInput
              id="Weight"
              label="Pet Weight"
              placeholder="Eg: 7"
              onChange={handleInputChange}
            />
            <Typography variant="body2-poppins-medium">lbs</Typography>
          </div>
          <Dropdown
            label="Pre-existing medical conditions"
            id="PreExistingMedical"
            options={preExistingMedical}
            onChange={(selectedValue) =>
              handleDropdownChange("PreExistingMedical", selectedValue)
            }
          />
          <TextInput
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
