import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AddPet.module.css";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";
import { useNavigate, Link } from "react-router-dom";
import { createPetRoute } from "../../utils/APIRoutes";

const AddPet = () => {
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

  const petConditions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  const [petData, setPetData] = useState({
    petName: "",
    gender: "",
    species: "",
    breed: "",
    birthday: "",
    bloodType: "",
    height: "",
    weight: "",
    preExistingMedical: "",
    petImageName: "",
    description: "",
  });

  const handleInputChange = (event) => {
    console.log("change is changing okrrr");
    setPetData({
      ...petData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDropdownChange = (name, value) => {
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  const onClickHandler = async (event) => {
    event.preventDefault();
    const {
      petName,
      gender,
      species,
      breed,
      birthday,
      bloodType,
      height,
      weight,
      preExistingMedical,
      petImageName,
      description,
    } = petData;
    const { data } = await axios.post(createPetRoute, {
      petName,
      gender,
      species,
      breed,
      birthday,
      bloodType,
      height,
      weight,
      preExistingMedical,
      petImageName,
      description,
    });
  };

  return (
    <div>
      <Typography variant="large-h1-poppins-bold" color="almost-black">
        Add Pet
      </Typography>
      <div className={styles.addPetForm}>
        <form action="/submit" method="post">
          <TextInput
            id="petName"
            htmlFor="petName"
            name="petName"
            label="Name"
            value={petData.petName}
            onChange={handleInputChange}
          />
          <Dropdown label={"Type of pet"} id="petType" options={petType} />
          <Dropdown label="Gender" id="Gender" options={gender} />
          <Typography variant="body2-poppins-medium">Birthday</Typography>
          <DatePicker />
          <Dropdown label="Blood type" id="bloodType" options={bloodType} />
          <div className={styles.petHeight}>
            <TextInput
              id="height"
              label="Pet Height"
              htmlFor="height"
              name="height"
              placeholder="Eg: 11"
              value={petData.height}
              onChange={handleInputChange}
            />
            <Typography variant="body2-poppins-medium">in</Typography>
          </div>
          <div className={styles.petWeight}>
            <TextInput
              id="weight"
              label="Pet Weight"
              htmlFor="weight"
              name="weight"
              placeholder="Eg: 7"
              value={petData.weight}
              onChange={handleInputChange}
            />
            <Typography variant="body2-poppins-medium">lbs</Typography>
          </div>
          <Dropdown
            label="Pre-existing medical conditions"
            id="petConditions"
            options={petConditions}
          />
          <TextInput               id="description"
              label="Pet Notes"
              htmlFor="height"
              name="height"
              placeholder="Add your pets Pet preferences, special needs, favourite food or favourite toys."
              value={petData.petName}
              onChange={handleInputChange}  />
          <Button
            variant="yellow"
            label="Save"
            size="dk-md-s"
            onClick={onClickHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default AddPet;
