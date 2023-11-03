import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./VaccinationForm.module.css";
import DatePicker from "../DatePicker/DatePicker";
import Typography from "../Typography/Typography";
import { createPetVaccinationRoute } from "../../utils/APIRoutes.js";
import axios from "axios";
import CloseSVG from "../SVG/CloseSVG";
import Dropdown from "../Dropdown/Dropdown";

const Vaccination = ({ selectedPet, onVaccinationSubmit }) => {
  const [formData, setFormData] = useState({
    PetID: "",
    // NameOfVaccination: "",
    VaccinationDate: "",
  });

  const [petVaccine, setPetVaccine] = useState({});

  const options = [
    { value: "felinePanleukopeniaVirus", label: "Feline panleukopenia virus" },
    { value: "FHV-1", label: "Feline viral rhinotracheitis (FHV-1)" },
    { value: "felineCaliciviruses", label: "Feline caliciviruses" },
    { value: "RabiesVirus", label: "Rabies virus" },
    { value: "FeLV", label: "Feline leukemia virus (FeLV)" },
  ];

  const handleDropdownChange = (fieldName, selectedValue) => {
    setPetVaccine({
      ...petVaccine,
      [fieldName]: selectedValue,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    const [year, month, day] = value.split("T")[0].split("-");
    const resultDate = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript dates
    setFormData({
      ...formData,
      VaccinationDate: resultDate,
    });
    console.log("date is changing");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPet && selectedPet._id) {
      const updatedFormData = { ...formData, PetID: selectedPet._id };
      setFormData(updatedFormData);
      try {
        const response = await axios.post(
          createPetVaccinationRoute,
          updatedFormData
        );
        console.log("Form submitted with data:", updatedFormData);
        console.log("Response from server:", response);
          // ...

          onVaccinationSubmit(updatedFormData); 
        
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
      <div className={styles.vaccineTitle}>
        <Typography variant="h2-poppins-semibold">Add Vaccination</Typography>
        <CloseSVG width="27" height="28" />
      </div>
      <form onSubmit={handleSubmit}>
        <Dropdown
          size="md"
          label="Name of Vaccination *"
          id="NameOfVaccination"
          options={options}
          value={petVaccine.NameOfVaccination}
          onChange={(selectedValue) =>
            handleDropdownChange("NameOfVaccination", selectedValue)
          }
          required={true}
        />
        {/* <TextInput
          label="Name of Vaccination"
          id="NameOfVaccination"
          type="text"
          name="NameOfVaccination"
          onChange={handleInputChange}
          value={formData.name}
        /> */}
        <div>
          <Typography variant="body2-poppins-medium">
            <label htmlFor="">Date</label>
          </Typography>
          <DatePicker
            id="VaccinationDate"
            onChange={handleDateChange}
          ></DatePicker>
        </div>
        <div className={styles.vaccineButton}>
          <Button variant="yellow" label="Add New Vaccination" size="dk-md-s" />
        </div>
      </form>
    </div>
  );
};

export default Vaccination;
