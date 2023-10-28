import React, { useState } from "react";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import TextInput from "../TextInput/TextInput";
import DatePicker from "../DatePicker/DatePicker";
import {createPetMedicationRoute} from "../../utils/APIRoutes.js"
import axios from "axios";


const MedicationForm = ({selectedPet}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPet && selectedPet._id) {
      const updatedFormData = { ...formData, PetID: selectedPet._id };
      setFormData(updatedFormData);
  
      try {
        const response = axios.post(createPetMedicationRoute, updatedFormData);
        console.log("Form submitted with data:", updatedFormData);
        console.log("Response from server:", response);
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
        {/* <Dropdown /> */}
        <TextInput
          id="MedicineTime"
          label="Set Medication Time"
          onChange={handleInputChange}
        />
        {/* plus icon, to add times, medicineTime should be stored as an array */}
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
