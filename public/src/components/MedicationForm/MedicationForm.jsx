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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicationForm = ({
  selectedPet,
  onMedicationSubmit,
  getToggleProps,
  closeMedForm,
}) => {
  const [formData, setFormData] = useState({
    PetID: "",
    MedicineName: "",
    DosageAmount: 0,
    MedicationPeriod: 0,
    MedicationDate: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const validateForm = () => {
    const { MedicineName, DosageAmount, MedicationPeriod, MedicationDate } =
      formData;
    if (MedicineName === "") {
      toast.error("Medicine Name is required.", toastOptions);
      return false;
    } else if (DosageAmount === "") {
      toast.error("Dosage Amount is required.", toastOptions);
      return false;
    } else if (MedicationPeriod === "") {
      toast.error("Medication Period is required.", toastOptions);
      return false;
    } else if (MedicationDate === "") {
      toast.error("Medication Date is required.", toastOptions);
      return false;
    }
    return true;
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
    console.log("handleDateChange");

    const date = new Date(value);
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    console.log(timezoneOffset);
    date.setMinutes(date.getMinutes() + timezoneOffset);
    console.log(date);

    setFormData({
      ...formData,
      MedicationDate: date.toString(),
    });
    console.log("date is changing");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (selectedPet && selectedPet._id) {
      if (validateForm()) {
        const updatedFormData = {
          ...formData,
          PetID: selectedPet._id,
          UserID: storedData._id,
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
          onMedicationSubmit(response.data);
          setFormData({
            PetID: "",
            MedicineName: "",
            DosageAmount: 0,
            MedicationPeriod: 0,
            MedicationDate: "",
          });
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error submitting form.", toastOptions);
        }
      }
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };

  return (
    <div className={styles.medicineContainer}>
      <div className={styles.medicineTitle}>
        <Typography variant="h2-poppins-semibold">Add Medicine</Typography>
        <div {...getToggleProps()}>
          <CloseSVG width="27" height="28" onClick={closeMedForm} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.medName}>
          <TextInput
            id="MedicineName"
            size="md"
            label="Medicine Name"
            propInputValue={formData.MedicineName}
            placeholder="Enter Medicine Name"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.dosageAm}>
          <div className={styles.unitContainer}>
            <TextInput
              
              id="DosageAmount"
              label="Dosage Amount"
              onChange={handleInputChange}
              placeholder="20"
              propInputValue={formData.DosageAmount}
            />
            <div style={{ position: "relative", bottom: "16px" }}>
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
          <div className={styles.unitContainer}>
            <TextInput
              label="Medication Period"
              id="MedicationPeriod"
              propInputValue={formData.MedicationPeriod}
              onChange={handleInputChange}
              placeholder="15"
            />
            <div style={{ position: "relative", bottom: "16px" }}>
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
      <ToastContainer />
    </div>
  );
};

export default MedicationForm;
