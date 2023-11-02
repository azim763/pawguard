import React, { useState, useEffect } from "react";
import Typography from "../Typography/Typography";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";
import styles from "./appointmentForm.module.css";
import axios from "axios";
import {
  createPetAppointmentRoute,
  getAllClinicsRoute,
} from "../../utils/APIRoutes";
import AutocompleteComponent from "../AutocompleteTextfield/AutocompleteTextfield";
import CloseSVG from "./../SVG/CloseSVG";

const AppointmentForm = ({ selectedPet, onAppointmentSubmit }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  // const clinicData = ["Clinic A", "Clinic B", "Clinic C"];
  const [clinicData, setClinicData] = useState([]);

  useEffect(() => {
    axios
      .get(getAllClinicsRoute)
      .then((response) => {
        console.log(response.data);
        setClinicData(response.data);
        console.log(clinicData);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    PetID: "",
    ClinicName: "",
    Latitude: "",
    Longitude: "",
    AppointmentReason: "",
    AppointmentDate: "",
    AppointmentTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const [year, month, day] = value.split("T")[0].split("-");
    const resultDate = `${day}-${month}-${year}`;

    setFormData({
      ...formData,
      [name]: resultDate,
    });
    setAppointmentDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPet && selectedPet._id) {
      const updatedFormData = { ...formData, PetID: selectedPet._id };
      setFormData(updatedFormData);
      try {
        const response = await axios.post(
          createPetAppointmentRoute,
          updatedFormData
        );
        console.log("Form submitted with data:", updatedFormData);
        console.log("Response from server:", response);
        if (selectedPet && selectedPet._id) {
          // ...
          onAppointmentSubmit(response.data);
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
    <div className={styles.appointmentContainer}>
      <div className={styles.appointmentTitle}>
        <Typography variant="h2-poppins-semibold">Add Appointment</Typography>
        <CloseSVG width="27" height="28" />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="body2-poppins-medium">Clinic Name</Typography>
          {clinicData.length > 0 && (
            <AutocompleteComponent
              clinicData={clinicData}
              handleSelection={(selectedClinic) => {
                console.log("Selected Clinic:", selectedClinic);

                const { Latitude, Longitude } = selectedClinic;
                console.log("Latitude:", selectedClinic.Latitude);
                console.log("Longitude:", selectedClinic.Longitude);
                console.log("Clinic Name", selectedClinic.Name);
                setFormData({
                  ...formData,
                  Latitude: selectedClinic.Latitude,
                  Longitude: selectedClinic.Longitude,
                  ClinicName: selectedClinic.Name,
                });
                console.log(selectedClinic);
              }}
            />
          )}
        </div>
        <div>
          <TextInput
            id="AppointmentReason"
            label="Appointment Reason"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Typography variant="body2-poppins-medium">
            Date of Appointment
          </Typography>
          <DatePicker
            onChange={handleDateChange}
            id="AppointmentDate"
            value={appointmentDate}
          />
        </div>
        <div>
          <Typography variant="body2-poppins-medium">
            Appointment Time
          </Typography>
          <div className={styles.timepickerContainer}>
            <TimePicker onChange={handleInputChange} id="AppointmentTime" />
          </div>
        </div>
        <div className={styles.button}>
          <Button
            type="submit"
            variant="yellow"
            label="Save"
            size="dk-md-s"
          />
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
