import React, { useState } from "react";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import TextInput from "../TextInput/TextInput";
import DatePicker from "../DatePicker/DatePicker";
import { createPetMedicationRoute } from "../../utils/APIRoutes.js";
import axios from "axios";
import styles from "./MedicationForm.module.css";
import CloseSVG from "./../SVG/CloseSVG";
import TimePicker from "../TimePicker/TimePicker";

const MedicationForm = ({ selectedPet, onMedicationSubmit }) => {
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

    const value = event.target.value;
    const [year, month, day] = value.split("T")[0].split("-");
    const resultDate = `${day}-${month}-${year}`;
    setFormData({
      ...formData,
      MedicationDate: resultDate,
    });
    console.log("date is changing");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (selectedPet && selectedPet._id) {
      const updatedFormData = { ...formData,
         PetID: selectedPet._id,
         UserID: storedData._id
        };
      setFormData(updatedFormData);

      try {
        const response = await axios.post(
          createPetMedicationRoute,
          updatedFormData
        );
        console.log("Form submitted with data:", updatedFormData);
        console.log("Response from server:", response);
          // ...
          onMedicationSubmit(updatedFormData);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };

  return (
    <div className={styles.medicineContainer}>
      <div className={styles.medicineTitle}>
        <Typography variant="h2-poppins-semibold">Add Medicine</Typography>
        <CloseSVG width="27" height="28" />
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="MedicineName"
          size="md"
          label={
            <Typography variant="body2-poppins-medium">
              Medicine Name
            </Typography>
          }
          placeholder="Enter Medicine Name"
          onChange={handleInputChange}
        />
        <div>
          <Typography variant="body2-poppins-medium">Dosage Amount</Typography>
          <div className={styles.unitContainer}>
            <TextInput id="DosageAmount" onChange={handleInputChange} />
            <div style={{ marginLeft: "10px" }}>
              <Typography variant="textfield-poppins-regular">ml</Typography>
            </div>
          </div>
        </div>
        <div className={styles.medTimePicker}>
          <Typography variant="body2-poppins-medium">
            Set Medication Time
          </Typography>
          <TimePicker id="MedicineTime" onChange={handleInputChange} />
        </div>
        <div>
          <Typography variant="body2-poppins-medium">
            MedicationPeriod
          </Typography>
          <div className={styles.unitContainer}>
            <TextInput
              size="small"
              id="MedicationPeriod"
              onChange={handleInputChange}
            />
            <div style={{ marginLeft: "10px" }}>
              <Typography variant="textfield-poppins-regular">days</Typography>
            </div>
          </div>
        </div>
        <div className={styles.medDatePicker}>
          <Typography variant="body2-poppins-medium">
            <label>Medication Start Date</label>
          </Typography>
          <DatePicker id="MedicationDate" onChange={handleDateChange} />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="yellow" label="Save" size="dk-md-s" />
        </div>
      </form>
    </div>
  );
};

export default MedicationForm;
