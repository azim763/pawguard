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
import CloseSVG from "./../SVG/CloseSVG"
import FoodForm from "./FoodForm/FoodForm";

const PetLogForm = ({ selectedPet, onPetLogSubmit,onFoodFormSubmit,SelectedPetID }) => {
  // const [pets,setPets] =useState([]);
  const [foodData, setFoodData] = useState([]);
  const [LogDate, setLogDate] = useState(new Date());

  
  const handleFoodFormSubmit = async (foodData) => {

    // Handle food form submission
    console.log("Food data before update:", foodData);

    if (selectedPet && selectedPet._id) {
      const updatedFoodData = { ...foodData, PetID: selectedPet._id };
      console.log("Updated food data:", updatedFoodData);

      setFoodData(updatedFoodData);
      const response = await axios.post(createPetFoodRoute, updatedFoodData);
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
      onPetLogSubmit(response.data);
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
  // const handleDateChange = (e) => {
  //   const { name, value } = e.target;
  //   const [year, month, day] = value.split("T")[0].split("-");
  //   const resultDate = `${day}-${month}-${year}`;

  //   setFoodData({
  //     ...foodData,
  //     [name]: resultDate,
  //   });
  //   setFoodDate(value);
  // };
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
        <div className={styles.petLogTitle}>
          <Typography variant="h2-poppins-semibold">Add Pet Log</Typography>
          <CloseSVG width="27" height="28" />
        </div>
        <div className={styles.addPetForm}>
          <div className={styles.petLogFormGeneral}>
            <div className={styles.formSubheading}>
              <Typography variant="sub-h1-poppins-semibold">
                General
              </Typography>
            </div>
            <div className={styles.petLogFormLine1}>
              <div style={{ marginRight: "30px" }}>
                <Typography variant="body2-poppins-medium">Date</Typography>
                <DatePicker onChange={handleLogDateChange} id="LogDate" value={LogDate} />

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
                    <Typography variant="textfield-poppins-regular">
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
              <FoodForm onFoodFormSubmit={handleFoodFormSubmit}  SelectedPetID={SelectedPetID}></FoodForm>
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
        </div>
      </div>
    </div>
  );
};

export default PetLogForm;
