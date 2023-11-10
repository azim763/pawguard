import React, { useState, useEffect } from 'react';
import TextInput from '../../TextInput/TextInput';
import Dropdown from '../../Dropdown/Dropdown';
import Typography from '../../Typography/Typography';
import DatePicker from '../../DatePicker/DatePicker';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import styles from "../../PetLogForm/FoodForm/FoodForm.module.css"
import foodCardStyles from '../../../pages/petPage/petPage.module.css'
import {
  searchPetFoodByPetIDRoute,
} from "../../../utils/APIRoutes.js";
import axios from 'axios';
import FoodCard from '../../FoodCard/FoodCard.jsx';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodForm = ({ onFoodFormSubmit, SelectedPetID }) => {
  const [foodDate, setFoodDate] = useState(new Date());
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
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(searchPetFoodByPetIDRoute, {
          params: { PetID: SelectedPetID },
        });
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
  const validateForm = () => {
    const { FoodName, MealPerDay, QuantityPerMeal,FoodDate } = foodData;
    if (FoodName === "") {
      console.log("errr");
      toast.error("Food Name is required.", toastOptions);
      return false;
    } else if (QuantityPerMeal === "") {
      toast.error("Quantity Per Meal is required.", toastOptions);
      return false;
    }
    else if (MealPerDay === "") {
      toast.error("Meal Per Day is required.", toastOptions);
      return false;
    }
    else if (FoodDate.toString() === "") {
      toast.error("Food Date is required.", toastOptions);
      return false;
    }

    return true;
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

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const [year, month, day] = value.split("T")[0].split("-");
    const resultDate = `${day}-${month}-${year}`;
    setFoodData({
      ...foodData,
      [name]: resultDate,
    });
    setFoodDate(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('foodData before submission:', foodData); // Log foodData before submitting
    if (validateForm()) {
      onFoodFormSubmit(foodData);
      console.log('foodData after submission:', foodData); // Log foodData after submitting
      setFoodForm((prevFoodForm) => [...prevFoodForm, foodData]);
    }
  };
  const handleFoodDelete = (deletedLogId) => {
    setFoodForm((prevFoodForm) =>
      prevFoodForm.filter((log) => log._id !== deletedLogId)
    );
  };


  return (
    <div className={styles.foodFromStyle}>
      <form onSubmit={handleSubmit}>
        <div className={styles.petLogFood}>
          <TextInput
            size="md"
            id="FoodName"
            name="FoodName"
            label="Food Name"
            placeholder="Enter Food Name"
            value={foodData.FoodName}
            onChange={handleChange}
          />
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
          <Typography variant="body2-poppins-medium">
            Type Of Food
          </Typography>
          <div className={styles.checkboxGap}>
            <div>
              <Checkbox
                id="KibbleDry"
                name="KibbleDry"
                label="Kibble-Dry"
                value="KibbleDry"
                checked={foodData.KibbleDry}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox
                id="Canned"
                name="Canned"
                label="Canned"
                value="Canned"
                checked={foodData.Canned}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox
                id="SemiMoist"
                name="SemiMoist"
                label="Semi-Moist"
                value="SemiMoist"
                checked={foodData.SemiMoist}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox
                id="HomeCooked"
                name="HomeCooked"
                label="Home-Cooked"
                value="HomeCooked"
                checked={foodData.HomeCooked}
                onChange={handleChange}
              />
            </div>
            <div>
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
        </div>

        <div className={styles.foodDate}>
          <Typography variant="body2-poppins-medium">Food Date</Typography>

          <DatePicker
            onChange={handleDateChange}
            id="FoodDate"
            value={foodDate}
          />
        </div>

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
              logId={foodEntry._id}
              FoodName={foodEntry.FoodName}
              MealPerDay={foodEntry.MealPerDay}
              QuantityPerMeal={foodEntry.QuantityPerMeal}
              TypeOfFood={foodEntry.TypeOfFood}
              KibbleDry={foodEntry.KibbleDry}
              Canned={foodEntry.Canned}
              SemiMoist={foodEntry.SemiMoist}
              Raw={foodEntry.Raw}
              HomeCooked={foodEntry.HomeCooked}
              onDelete={() => handleFoodDelete(foodEntry._id)}
            />
          ))}
        </div>
      )}
      <ToastContainer />
    </div>

  );

};

export default FoodForm;
