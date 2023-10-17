import React , { useState } from 'react'

const PetLogform = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
          <h2>PetLog Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
export default PetLogform
