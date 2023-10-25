import React, { useState } from "react";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import TextInput from "../TextInput/TextInput";
import DatePicker from "../DatePicker/DatePicker";

const MedicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here, such as sending it to a server or processing it in some way.
    console.log("Form submitted with data:", formData);
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
        <DatePicker />
        <Button variant="yellow" label="Add New Vaccination" size="dk-md-s" />
      </form>
    </div>
  );
};

export default MedicationForm;
