import React, { useState } from 'react'
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import DatePicker from '../DatePicker/DatePicker';

   const AppointmentForm = () => {
     const [formData, setFormData] = useState({
    name: '',
    date: '',
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
    console.log('Form submitted with data:', formData);
  };
  return (

    
    <div>
    <h2>Add Appointment</h2>
    <form onSubmit={handleSubmit}>
      <div>       
        <TextInput label  = "Name of Vaccination" type ="text" onChange={handleInputChange} value={formData.name} />
      </div>
      <div>     
        <DatePicker label="Date of Vaccination" ></DatePicker>  
      </div>  
      <Button variant="yellow" label="Add New Vaccination" size="dk-md-s"/>

     
    </form>
         
       </div>
     )
   }
   
   export default AppointmentForm
   