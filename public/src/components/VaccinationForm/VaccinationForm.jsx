import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./VaccinationForm.module.css";
import DatePicker from "../DatePicker/DatePicker";
import Typography from "../Typography/Typography";

const Vaccination = () => {
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
    <div className={styles.vaccinationForm}>
      <Typography variant="h2-poppins-semibold">Add Vaccination</Typography>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name of Vaccination"
          type="text"
          onChange={handleInputChange}
          value={formData.name}
        />
        <div>
          <Typography variant="body2-poppins-medium">
            <label htmlFor="">Date</label>
          </Typography>
          <DatePicker label="Date of Vaccination"></DatePicker>
        </div>
        <Button variant="yellow" label="Add New Vaccination" size="dk-md-s" />
      </form>
    </div>
  );
};

export default Vaccination;
