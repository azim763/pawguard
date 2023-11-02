import React, { useState, useEffect } from "react";
import styles from "../PetLogForm/PetLogForm.module.css";
import TextInput from "../TextInput/TextInput";
import Dropdown from "../Dropdown/Dropdown";
import Typography from "../Typography/Typography";
import DatePicker from "../DatePicker/DatePicker";
import Button from "../Button/Button";
import RadioButton from "../RadioButton/RadioButton";
import Checkbox from "../Checkbox/Checkbox";
import {
  createPetFoodRoute,
  createPetLogRoute,
  searchPetsByUserIDRoute,
} from "../../utils/APIRoutes";
import TextArea from "../TextArea/TextArea";
import axios from "axios";

const PetLogForm = ({ selectedPet, onPetLogSubmit }) => {
  // const [pets,setPets] =useState([]);
  const [foodDate, setFoodDate] = useState(new Date());
  const [LogDate, setLogDate] = useState(new Date());

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  //       const response = await axios.get(searchPetsByUserIDRoute, { params: { userID: data._id } });
  //       setPets(response.data);
  //     } catch (error) {
  //       // Handle any errors here
  //     }
  //   };

  const MealPerDay = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const [foodData, setFoodData] = useState({
    PetID: "",
    FoodName: "",
    MealPerDay: "",
    QuantityPerMeal: "",
    KibbleDry: false,
    Canned: false,
    SemiMoist: false,
    HomeCooked: false,
    Raw: false,
    protein: "",
    fat: "",
    fiber: "",
  });

  const handleDropdownChange = (name, value) => {
    console.log("dropdown is dropping");
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodData((foodData) => {
      if (type === "checkbox") {
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

  const handleFoodFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Handle food form submission
    console.log("Food data before update:", foodData);

    if (selectedPet && selectedPet._id) {
      const updatedFoodData = { ...foodData, PetID: selectedPet._id };
      console.log("Updated food data:", updatedFoodData);

      setFoodData(updatedFoodData);
      const response = await axios.post(createPetFoodRoute, updatedFoodData);
      if (selectedPet && selectedPet._id) {
        // ...
        onPetLogSubmit(response.data);
      }
      console.log(response);
      console.log("Data submitted");
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };

  const handleAdditionalInfoSubmit = async () => {
    // Handle additional information form submission
    console.log("Additional information data before update:", formData);

    if (selectedPet && selectedPet._id) {
      const updatedFormData = { ...formData, PetID: selectedPet._id };
      console.log("Updated additional information data:", updatedFormData);

      setFormData(updatedFormData);
      const response = await axios.post(createPetLogRoute, updatedFormData);
      console.log(response);
      console.log("Data submitted");
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };

  const [formData, setFormData] = useState({
    PetID: "",
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

  const options = [
    { label: "High", value: "High" },
    { label: "Normal ", value: "Normal" },
    { label: "Low ", value: "Low" },
  ];
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
  const handleLogDateChange = (e) => {
    const { name, value } = e.target;
    const [year, month, day] = value.split("T")[0].split("-");
    const resultDate = `${day}-${month}-${year}`;

    setFormData({
      ...formData,
      [name]: resultDate,
    });
    setLogDate(value);
  };

  return (
    <div>
      {/* <div>
        <PetLogCard />
      </div> */}
      <div className={styles.petLogContainer}>
        <div>
          <Typography variant="h2-poppins-semibold">Add Pet Log</Typography>
        </div>
        <div className={styles.addPetForm}>
          <form onSubmit={handleFoodFormSubmit}>
            <div className={styles.petLogFormGeneral}>
              <div className={styles.formSubheading}>
                <Typography variant="sub-h1-poppins-semibold">
                  General
                </Typography>
              </div>
              <div className={styles.petLogFormLine1}>
                <div>
                  <Typography variant="body2-poppins-medium">Date</Typography>
                  <DatePicker onChange={handleLogDateChange} id="LogDate" value={LogDate}/>

                </div>
                <div>
                  <Typography variant="body2-poppins-medium">
                    Pet Weight
                  </Typography>
                  <div className={styles.petUnit}>
                    <TextInput
                      id="Weight"
                      name="Weight"
                      // label="Pet Weight"
                      placeholder="Eg: 30"
                      value={formData.Weight}
                      onChange={handleInputChange}
                    />
                    <div className={styles.unitGap}>
                      <Typography variant="body2-poppins-medium">
                        lbs
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.petLogRadioButtons}>
                <div className={styles.sessionGap}>
                  <Typography variant="body2-poppins-medium">
                    Activity Level
                  </Typography>
                  <div style={{ padding: "10px" }}>
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
                <div className={styles.sessionGap}>
                  <Typography variant="body2-poppins-medium">
                    Urine Amount
                  </Typography>

                  <div style={{ padding: "10px" }}>
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
                  <Typography variant="body2-poppins-medium">
                    Stool Amount
                  </Typography>

                  <div style={{ padding: "10px" }}>
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
              <div className={styles.formSubheading}>
                <Typography variant="sub-h1-poppins-semibold">Food </Typography>
              </div>
              <div className={styles.sessionContainer}>
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
                    <div style={{ marginRight: "50px" }}>
                      <Dropdown
                        size="small"
                        label="Meals per Day"
                        id="MealPerDay"
                        name="MealPerDay"
                        options={MealPerDay}
                        value={foodData.MealPerDay}
                        onChange={(selectedValue) =>
                          handleDropdownChange("MealPerDay", selectedValue)
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
                          // label="Quantity Per Meal"
                          placeholder="500"
                          value={foodData.QuantityPerMeal}
                          onChange={handleChange}
                        />
                        <div className={styles.unitGap}>
                          <Typography variant="body2-poppins-medium">
                            g
                          </Typography>
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
                <Typography variant="body2-poppins-medium">
                  Food Date
                </Typography>

                <DatePicker
                  onChange={handleDateChange}
                  id="FoodDate"
                  value={foodDate}
                />

                <div className={styles.buttonStyle}>
                  <Button
                    variant="dark-blue"
                    label="Add Food"
                    size="dk-md-s"
                    type="submit" // This should be 'type="submit"' to trigger the form submission
                  />
                </div>
              </div>
            </div>
            <div className={styles.sessionContainer}>
              <div className={styles.formSubheading}>
                <Typography variant="sub-h1-poppins-semibold">
                  Additional Information
                </Typography>
              </div>
              <TextInput
                id="Notes"
                name="Notes"
                label="other Notes"
                placeholder="Enter Observations for your pet"
                value={formData.Notes}
                onChange={handleInputChange}
              />
              <div className={styles.buttonStyle}>
                <Button
                  variant="yellow"
                  label="save"
                  size="dk-md-s"
                  onClick={handleAdditionalInfoSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetLogForm;
