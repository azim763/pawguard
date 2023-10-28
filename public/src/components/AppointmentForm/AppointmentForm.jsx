import React, { useState, useEffect } from "react";
import Typography from "../Typography/Typography";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";
import axios from "axios";
import {
  createPetAppointmentRoute,
  getAllClinicsRoute,
} from "../../utils/APIRoutes";
import AutocompleteComponent from "../AutocompleteTextfield/AutocompleteTextfield";

const AppointmentForm = () => {
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
    PetId: null,
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
    const storedData = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setFormData({
      ...formData,
      UserID: storedData._id,
    });
    const response = axios.post(createPetAppointmentRoute, formData);
    // You can perform actions with the form data here, such as sending it to a server or processing it in some way.
    console.log("Form submitted with data:", formData);
  };
  return (
    <div>
      <Typography variant="h2-poppins-semibold">Add Appointment</Typography>
      <form onSubmit={handleSubmit}>
        {clinicData.length > 0 && (
          <AutocompleteComponent
            clinicData={clinicData}
            handleSelection={(selectedClinic) => {
              console.log("Selected Clinic:", selectedClinic);
              // Use the selected clinic object to retrieve latitude and longitude
              // const { ID } = selectedClinic;
              // console.log(ID);

              const { latitude, longitude } = selectedClinic;

              console.log("Latitude:", selectedClinic.Latitude);
              console.log("Longitude:", selectedClinic.Longitude);
              setFormData({
                ...formData,
                Latitude: selectedClinic.Latitude,
                Longitude: selectedClinic.Longitude,
                ClinicName: selectedClinic.ClinicName,
              });
              console.log(selectedClinic);
              // Make API call to retrieve latitude and longitude using the clinic ID
            }}
          />
        )}
        {/* <TextInput
          id="ClinicName"
          label="Clinic Name"
          onChange={handleInputChange}
        /> */}
        <TextInput
          id="AppointmentReason"
          label="Appointment Reason"
          onChange={handleInputChange}
        />
        <Typography variant="body2-poppins-medium">
          Date of Appointment
        </Typography>
        <DatePicker
          onChange={handleDateChange}
          id="AppointmentDate"
          value={appointmentDate}
        />
        <Typography variant="body2-poppins-medium">Appointment Time</Typography>
        <TimePicker onChange={handleInputChange} id="AppointmentTime" />
        <Button type="submit" variant="yellow" label="Add Pet" size="dk-md-s" />
      </form>
    </div>
  );
};

export default AppointmentForm;
