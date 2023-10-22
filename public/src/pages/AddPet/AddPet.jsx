import React, { useState, useEffect } from "react";
import styles from "./AddPet.module.css";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";
import { useNavigate, Link } from "react-router-dom";

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

//   const [petData, setPetData] = useState({
//     petName = "",
//     gender="",
//     species="",
//     breed="", 
//     birthday="", 
//     bloodType="", 
//     height="", 
//     weight="", 
//     preExistingMedical="",
//     petImageName="", 
//     description=""
//   });

//   const handleInputChange = (event) => {
//     setPetData({ ...petData, [event.target.name]: event.target.value });
//   };

//   const onClickHandler = async (event) => {
//     event.preventDefault();
//     if (handleValidation()) {
//       const { PetName, Gender, Species, Breed, Birthday, BloodType, Height, Weight, PreExistingMedical,PetImageName, Description } = values;
//       const { data } = await axios.post(createPetRoute, {
//         petName, Gender, Species, Breed, Birthday, BloodType, Height, Weight, PreExistingMedical,PetImageName, Description 
//       });


//   useEffect(() => {
//     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//       navigate("/");
//     }
//   }, []);

  return (
    <div>
      <Typography variant="large-h1-poppins-bold" color="almost-black">
        Add Pet
      </Typography>
      <div className={styles.addPetForm}>
        <form action="/submit" method="post">
          <TextInput id="petName" label="Name" />
          <Dropdown label={"Type of pet"} id="petType" options={petType} />
          <Dropdown label="Gender" id="Gender" options={gender} />
          <Typography variant="body2-poppins-medium">Birthday</Typography>
          <DatePicker />
          <Dropdown label="Blood type" id="bloodType" options={bloodType} />
          <div className={styles.petHeight}>
            <TextInput id="petHeight" label="Pet Height" placeholder="Eg: 11" />
            <Typography variant="body2-poppins-medium">in</Typography>
          </div>
          <div className={styles.petWeight}>
            <TextInput id="petWeight" label="Pet Weight" placeholder="Eg: 30" />
            <Typography variant="body2-poppins-medium">lbs</Typography>
          </div>
          <Dropdown
            label="Pre-existing medical conditions"
            id="petConditions"
            options={petConditions}
          />
          <TextInput id="petNotes" label="petNotes" />
          <Button
            variant="yellow"
            label="Save"
            size="dk-md-s"
            // onClickHandler={onClickHandler}
          />
        </form>
      </div>
    </div>
  );
};

export default AddPet;