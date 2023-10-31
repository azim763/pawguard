import React, { useState } from "react";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import TextInput from "../TextInput/TextInput";
import DatePicker from "../DatePicker/DatePicker";
import {createPetMedicationRoute} from "../../utils/APIRoutes.js"
import axios from "axios";


const MedicationForm = ({selectedPet,onMedicationSubmit}) => {
  const [formData, setFormData] = useState({
    PetID: "",
    MedicineName: "",
    DosageAmount: "",
    MedicationPeriod: "",
    MedicationDate: "",
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
      MedicationDate: event.target.value,
    });
    console.log("date is changing")
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (selectedPet && selectedPet._id) {
      const updatedFormData = { ...formData, PetID: selectedPet._id };
      setFormData(updatedFormData);
  
      try {
        const response = await axios.post(createPetMedicationRoute, updatedFormData);
        console.log("Form submitted with data:", updatedFormData);
        console.log("Response from server:", response);
        if (selectedPet && selectedPet._id) {
          // ...
          onMedicationSubmit(response.data); 
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };
  
  return (
    <div>
      <Typography variant="h2-poppins-semibold">Add Medicine</Typography>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="MedicineName"
          label="Medicine Name"
          placeholder="Enter Medicine Name"
          onChange={handleInputChange}
        />
        <TextInput
          id="DosageAmount"
          label="Dosage Amount"
          onChange={handleInputChange}
        />
        <TextInput
          id="MedicineTime"
          label="Set Medication Time"
          onChange={handleInputChange}
        />
        <TextInput
          id="MedicationPeriod"
          label="MedicationPeriod"
          onChange={handleInputChange}
        />
        <Typography variant="body2-poppins-medium">
          <label>Medication Start Date</label>
        </Typography>
        <DatePicker id="MedicationDate" onChange={handleDateChange} />
        <Button variant="yellow" label="Add New Medication" size="dk-md-s" />
      </form>
    </div>
  );
};

export default MedicationForm;
