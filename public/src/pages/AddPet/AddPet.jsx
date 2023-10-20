import React from "react";
import styles from "./AddPet.module.css";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";

const AddPet = () => {
  const petType = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
  ];

  //   const breedType = fetch function from db;

  const gender = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  return (
    <div>
      <Typography variant="large-h1-poppins-bold" color="almost-black">
        Add Pet
      </Typography>
      <div className={styles.addPetForm}>
        <form action="/submit" method="post">
          <TextInput id="petName" label="Name" />
          <Typography>
            <label>Type of pet</label>
          </Typography>
          <Dropdown id="petType" options={petType} />
          {/* <Dropdown id="petName" label="Name" /> */}
          <DatePicker />
          <TextInput id="petName" label="Name" />
          <TextInput id="petHeight" label="Height" />
          <TextInput id="petWeight" label="Weight" />
          <TextInput id="petName" label="Name" />
          <TextInput id="petName" label="Name" />
        </form>
      </div>
    </div>
  );
};

export default AddPet;
