import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./VaccinationForm.module.css";
import DatePicker from "../DatePicker/DatePicker";
import Typography from "../Typography/Typography";
import {createPetVaccinationRoute} from "../../utils/APIRoutes.js"
import axios from "axios";


const Vaccination = ({selectedPet,onVaccinationSubmit}) => {
  const [formData, setFormData] = useState({
    PetID:"",
    NameOfVaccination: "",
    VaccinationDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (event) => {
    setFormData({
      ...formData,
      VaccinationDate: event.target.value,
    });
    console.log("date is changing")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPet && selectedPet._id) {
      const updatedFormData = { ...formData, PetID: selectedPet._id };
      setFormData(updatedFormData);
      try {
        const response = await axios.post(createPetVaccinationRoute, updatedFormData);
        console.log("Form submitted with data:", updatedFormData);
        console.log("Response from server:", response);
        if (selectedPet && selectedPet._id) {
          // ...
          onVaccinationSubmit(response.data); 
        }
        // You can further handle the response here, such as displaying a success message to the user.
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle the error, e.g., display an error message to the user.
      }
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };
  
  return (
    <div className={styles.vaccinationForm}>
      <Typography variant="h2-poppins-semibold">Add Vaccination</Typography>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name of Vaccination"
          id="NameOfVaccination"
          type="text"
          name="NameOfVaccination"
          onChange={handleInputChange}
          value={formData.name}
        />
        <div>
          <Typography variant="body2-poppins-medium">
            <label htmlFor="">Date</label>
          </Typography>
          <DatePicker id="VaccinationDate" onChange={handleDateChange}></DatePicker>
        </div>
        <Button variant="yellow" label="Add New Vaccination" size="dk-md-s" />
      </form>
    </div>
  );
};

export default Vaccination;
