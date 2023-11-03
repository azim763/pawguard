import React, { useState, useEffect } from 'react';
import TextInput from '../../TextInput/TextInput';
import Dropdown from '../../Dropdown/Dropdown';
import Typography from '../../Typography/Typography';
import DatePicker from '../../DatePicker/DatePicker';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import styles from "../../PetLogForm/PetLogForm.module.css"
import foodCardStyles from '../../../pages/petPage/petPage.module.css'
import {
  searchPetFoodByPetIDRoute,
} from "../../../utils/APIRoutes.js";
import axios from 'axios';
import FoodCard from '../../FoodCard/FoodCard.jsx';

const FoodForm = ({ onFoodFormSubmit, SelectedPetID }) => {
  const [foodForm, setFoodForm] = useState([])
  const MealPerDay = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ];

  const [foodData, setFoodData] = useState({
    FoodName: '',
    MealPerDay: '',
    QuantityPerMeal: '',
    KibbleDry: false,
    Canned: false,
    SemiMoist: false,
    HomeCooked: false,
    Raw: false,
    FoodDate: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${searchPetFoodByPetIDRoute}/${SelectedPetID}`);
        setFoodForm(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [SelectedPetID]);

  const handleDropdownChange = (name, value) => {
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodData((foodData) => {
      if (type === 'checkbox') {
        return {
          ...foodData,
          [name]: checked,
        };
      }
      return {
        ...foodData,
        [name]: value,
      };
    });
  };

  const handleDateChange = (value) => {
    setFoodData({
      ...foodData,
      FoodDate: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('foodData before submission:', foodData); // Log foodData before submitting
    onFoodFormSubmit(foodData);
    console.log('foodData after submission:', foodData); // Log foodData after submitting
    setFoodForm((prevFoodForm) => [...prevFoodForm, foodData]);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.petLogFood}>
          <div className={styles.sessionGap}>
            <TextInput
              size="md"
              id="FoodName"
              name="FoodName"
              label="Food Name"
              placeholder="Enter Food Name"
              value={foodData.FoodName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.petLogFoodAndQuantity}>
            <div style={{ marginRight: '50px' }}>
              <Dropdown
                size="small"
                label="Meals per Day"
                id="MealPerDay"
                name="MealPerDay"
                options={MealPerDay}
                value={foodData.MealPerDay}
                onChange={(selectedValue) =>
                  handleDropdownChange('MealPerDay', selectedValue)
                }
              />
            </div>
            <div className={styles.quantityPerMeal}>
              <Typography variant="body2-poppins-medium">
                Quantity Per Meal
              </Typography>
              <div className={styles.petUnit}>
                <TextInput
                  size="small"
                  id="QuantityPerMeal"
                  name="QuantityPerMeal"
                  placeholder="500"
                  value={foodData.QuantityPerMeal}
                  onChange={handleChange}
                />
                <div className={styles.unitGap}>
                  <Typography variant="textfield-poppins-regular">g</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.petLogCheckBox}>
          <div className={styles.checkboxGap}>
            <Checkbox
              id="KibbleDry"
              name="KibbleDry"
              label="Kibble-Dry"
              value="KibbleDry"
              checked={foodData.KibbleDry}
              onChange={handleChange}
            />
          </div>
          <div className={styles.checkboxGap}>
            <Checkbox
              id="Canned"
              name="Canned"
              label="Canned"
              value="Canned"
              checked={foodData.Canned}
              onChange={handleChange}
            />
          </div>
          <div className={styles.checkboxGap}>
            <Checkbox
              id="SemiMoist"
              name="SemiMoist"
              label="Semi-Moist"
              value="SemiMoist"
              checked={foodData.SemiMoist}
              onChange={handleChange}
            />
          </div>
          <div className={styles.checkboxGap}>
            <Checkbox
              id="HomeCooked"
              name="HomeCooked"
              label="Home-Cooked"
              value="HomeCooked"
              checked={foodData.HomeCooked}
              onChange={handleChange}
            />
          </div>
          <div className={styles.checkboxGap}>
            <Checkbox
              id="Raw"
              name="Raw"
              label="Raw"
              value="Raw"
              checked={foodData.Raw}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <Typography variant="body2-poppins-medium">Food Date</Typography>

        <DatePicker
          onChange={handleDateChange}
          id="FoodDate"
          value={foodData.FoodDate}
        /> */}

        <div className={styles.buttonStyle}>
          <Button
            variant="dark-blue"
            label="Add Food"
            size="dk-md-s"
            type="submit"
          />
        </div>
      </form>
    
    {foodForm.length > 0 && (
      <div className={foodCardStyles.cardStyle}>
        {foodForm.map((foodEntry) => (
          <FoodCard
            key={foodEntry._id}
            FoodName={foodEntry.FoodName}
            MealPerDay={foodEntry.MealPerDay}
            QuantityPerMeal={foodEntry.QuantityPerMeal}
            TypeOfFood={foodEntry.TypeOfFood}    />
        ))}
      </div>
    )}
    </div>
  );

};

export default FoodForm;
