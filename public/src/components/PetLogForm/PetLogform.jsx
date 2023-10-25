import React, { useState } from 'react';;
import styles from '../PetLogForm/PetLogForm.module.css';;
import TextInput from '../TextInput/TextInput';
import Dropdown from '../Dropdown/Dropdown';
import Typography from '../Typography/Typography';
import DatePicker from '../DatePicker/DatePicker';
import Button from '../Button/Button';
import RadioButton from '../RadioButton/RadioButton';
import Checkbox from '../Checkbox/Checkbox';
import { createPetFoodRoute,createPetLogRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import { createPetFoodRoute,createPetLogRoute } from '../../utils/APIRoutes';
import axios from 'axios';

const PetLogForm = () => {
  const MealPerDay = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ];

  const [foodData, setFoodData] = useState({
    foodName: "",
    mealPerDay: "",
    quantity: "",
    kibble: false,
    canned: false,
    semiMoist: false,
    homeCooked: false,
    raw: false,
    protein: "",
    fat: "",
    fiber: "",
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodData((prevData) => {
      if (type === "checkbox") {
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

  const handleFoodFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Handle food form submission
    console.log("Food data:", foodData);
    const response = axios.post(createPetFoodRoute, foodData);
    console.log(response)
    console.log('data submitted');
  };

  const handleAdditionalInfoSubmit = () => {
    // Handle additional information form submission
    console.log('Additional information:', formData);
    const response = axios.post(createPetLogRoute, formData);
    console.log(response);

  };

  const [formData, setFormData] = useState({
    LogDate: new Date(),
    Weight: 0,
    ActivityLevel: "",
    UrineAmount: "",
    StoolAmount: "",
    StoolAppearance: "",
    PetImages: [],
    Notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (option, category) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: option,
    }));
  };
  const handleRadioChange = (option, category) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: option,
    }));
  };
  const options = [
    { label: "High ", value: "High" },
    { label: "Normal", value: "Normal" },
    { label: "Low", value: "Low" },
  ];


  return (
    <div>
      {/* <div>
        <PetLogCard />
      </div> */}
      <div>
        <div>
          <h2>Add Pet Log</h2>
        </div>
        <div className={styles.addPetForm}>
          <form onSubmit={handleFoodFormSubmit}>
            <div className={styles.petLogFormGeneral}>
              <div>
                <h3>General</h3>
              </div>
              <div className={styles.petLogFormLine1}>
                <Typography variant="body2-poppins-medium">Date</Typography>
                {formData.LogDate && (
                  <DatePicker
                    id="LogDate"
                    name="LogDate"
                    value={formData.LogDate.toISOString().split("T")[0]} // Format the date to 'yyyy-MM-dd'
                    onChange={handleInputChange}
                  />
                )}
                <div className={styles.petWeight}>
                  <TextInput
                    id="Weight"
                    name="Weight"
                    label="Pet Weight"
                    placeholder="Eg: 30"
                    value={formData.Weight}
                    onChange={handleInputChange}
                  />
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
                        checked={formData.ActivityLevel === option.value}
                        onChange={() =>
                          handleRadioChange(option.value, "ActivityLevel")
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
                        checked={formData.UrineAmount === option.value}
                        onChange={() =>
                          handleRadioChange(option.value, "UrineAmount")
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
                        checked={formData.StoolAmount === option.value}
                        onChange={() =>
                          handleRadioChange(option.value, "StoolAmount")
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3>Food </h3>
              <div>
                <div className={styles.petLogFood}>
                  <TextInput
                    id="foodName"
                    name="foodName"
                    label="Food Name"
                    value={foodData.foodName}
                    onChange={handleChange}
                  />
                  <div className={styles.petLogFoodAndQuantity}>
                    <Dropdown
                      label="Meals per Day"
                      id="mealPerDay"
                      name="mealPerDay"
                      options={MealPerDay}
                      value={foodData.mealPerDay}
                      onChange={handleChange}
                    />
                    <div className={styles.quantityPerMeal}>
                      <TextInput
                        id="quantity"
                        name="quantity"
                        label="Quantity Per Meal"
                        placeholder="Eg: 500"
                        value={foodData.quantity}
                        onChange={handleChange}
                      />
                      <Typography variant="body2-poppins-medium">g</Typography>
                    </div>
                  </div>
                </div>
                <div className={styles.petLogCheckBox}>
                  <Checkbox
                    id="kibble"
                    name="kibble"
                    label="kibble"
                    value="kibble"
                    checked={foodData.kibble}
                    onChange={handleChange}
                  />
                  <Checkbox
                    id="canned"
                    name="canned"
                    label="canned"
                    value="canned"
                    checked={foodData.canned}
                    onChange={handleChange}
                  />
                  <Checkbox
                    id="semiMoist"
                    name="semiMoist"
                    label="Semi-Moist"
                    value="semiMoist"
                    checked={foodData.semiMoist}
                    onChange={handleChange}
                  />
                  <Checkbox
                    id="homeCooked"
                    name="homeCooked"
                    label="Home-Cooked"
                    value="homeCooked"
                    checked={foodData.homeCooked}
                    onChange={handleChange}
                  />
                  <Checkbox
                    id="raw"
                    name="raw"
                    label="Raw"
                    value="raw"
                    checked={foodData.raw}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  variant="yellow"
                  label="Add Food"
                  size="dk-md-s"
                  type="submit" // This should be 'type="submit"' to trigger the form submission
                />
              </div>
            </div>
            <div>
              <h3>Additional Information</h3>
              <TextInput
                id="Notes"
                name="Notes"
                label="other Notes"
                placeholder="Enter Observations for your pet"
                value={formData.Notes}
                onChange={handleInputChange}
              />
              <Button
                variant="yellow"
                label="save"
                size="dk-md-s"
                onClick={handleAdditionalInfoSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetLogForm;
