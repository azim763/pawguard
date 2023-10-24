import React, { useState } from 'react'
import styles from '../PetLogForm/PetLogForm.module.css'
import TextInput from '../TextInput/TextInput';
import Dropdown from '../Dropdown/Dropdown';
import Typography from '../Typography/Typography';
import DatePicker from '../DatePicker/DatePicker';
import Button from '../Button/Button';
import RadioButton from '../RadioButton/RadioButton';
import Checkbox from '../Checkbox/Checkbox';
import FoodForm from './FoodForm/FoodForm';

const PetLogform = () => {
  const [foodData, setFoodData] = useState({
    foodName: '',
    mealPerDay: '',
    quantity: '',
    kibble: false,
    canned: false,
    semiMoist: false,
    homeCooked: false,
    raw: false,
    protein: '',
    fat: '',
    fiber: '',
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodData((prevData) => {
      if (type === 'checkbox') {
        return {
          ...prevData,
          [name]: checked,
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  
  const handleSubmit = () => {
    // Handle form submission
    console.log(foodData);
  };

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // You can perform actions with the form data here, such as sending it to a server or processing it in some way.
  //   console.log('Form submitted with data:', formData);
  // };

  // const handleChange = () => {
  //   console.log("asd")
  // }

  const [selectedOption, setSelectedOption] = useState('option1');

  const options = [
    { label: 'High ', value: 'High' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Low', value: 'Low' },
  ];

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };



  return (
    <div>
      <div>
        <h2>Add Pet Log</h2>

      </div>

      <div className={styles.addPetForm}>
        <form action="/submit" method="post">
          <div className={styles.petLogFormGeneral}>
            <div>
              <h3>General</h3>
            </div>
            <div className={styles.petLogFormLine1}>
              <Typography variant="body2-poppins-medium">Date</Typography>
              <DatePicker />
              <div className={styles.petWeight}>
                <TextInput id="petWeight" label="Pet Weight" placeholder="Eg: 30" />
                <Typography variant="body2-poppins-medium">lbs</Typography>
              </div>
            </div>
            <div className={styles.petLogRadioButtons}>
              <div>
                <h4>Activity Level</h4>
                <div>
                  {options.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      checked={selectedOption === option.value}
                      onChange={() => handleRadioChange(option.value)
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4>Urine Amount</h4>
                <div>
                  {options.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      checked={selectedOption === option.value}
                      onChange={() => handleRadioChange(option.value)
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4>Stool Amount</h4>
                <div>
                  {options.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      checked={selectedOption === option.value}
                      onChange={() => handleRadioChange(option.value)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>Food </h3>
            <FoodForm handleSubmit={handleSubmit} handleChange={handleChange} />
          </div>
          <div>
            <h3>Additional Information</h3>
            <TextInput  id="Notes"
              label="other Notes"           
              placeholder="Enter Observations for your pet"
              onChange={handleInputChange}  />
                      <Button
                variant="yellow"
                label="save"
                size="dk-md-s"
                onClick={handleSubmit}
            />

          </div>

        </form>
      </div>
    </div>
  );
};
export default PetLogform
