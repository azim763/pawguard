import React, { useState } from "react";
import Typography from "../Typography/Typography";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";

const AppointmentForm = () => {
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
      <Typography variant="h2-poppins-semibold">Add Appointment</Typography>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="ClinicName"
          label="Clinic Name"
          onChange={handleInputChange}
        />
        <TextInput
          id="AppointmentReason"
          label="Appointment Reason"
          onChange={handleInputChange}
        />
        <Typography variant="body2-poppins-medium">Date of Appointment</Typography>
        <DatePicker />
        <Typography variant="body2-poppins-medium">Appointment Time</Typography>
        <TimePicker />
        <Button type="submit" variant="yellow" label="Add Pet" size="dk-md-s" />
      </form>
    </div>
  );
};

export default AppointmentForm;
