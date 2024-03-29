import React, { useState, useRef } from "react";
import styles from "../PetLogForm/PetLogForm.module.css";
import TextInput from "../TextInput/TextInput";
import Typography from "../Typography/Typography";
import DatePicker from "../DatePicker/DatePicker";
import Button from "../Button/Button";
import RadioButton from "../RadioButton/RadioButton";
import { createPetFoodRoute, createPetLogRoute } from "../../utils/APIRoutes";
import axios from "axios";
import CloseSVG from "./../SVG/CloseSVG";
import FoodForm from "./FoodForm/FoodForm";
import SingleImageUpload from "../SingleImageUpload/SingleImageUpload";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextArea from "../TextArea/TextArea";

const PetLogForm = ({
  selectedPet,
  onPetLogSubmit,
  SelectedPetID,
  getToggleProps,
  closePetLogForm,
  selectedLog,
  formMode,
}) => {
  // const [pets,setPets] =useState([]);
  const petLogFormRef = useRef();

  const [foodData, setFoodData] = useState([]);
  const [LogDate, setLogDate] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const isDisabled = true;

  const initialFormData = {
    PetID: "",
    Weight: 30,
    ActivityLevel: "",
    UrineAmount: "",
    StoolAmount: "",
    PetImages: "",
    Notes: "",
  };

  const [formData, setFormData] = useState({ initialFormData });

  // useEffect(() => {
  //   setFormMode(selectedLog ? "edit" : "delete");
  // }, [selectedLog]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleFoodFormSubmit = async (foodData) => {
    // Handle food form submission
    //console.log("Food data before update:", foodData);

    if (selectedPet && selectedPet._id) {
      const updatedFoodData = { ...foodData, PetID: selectedPet._id };
      //console.log("Updated food data:", updatedFoodData);

      setFoodData(updatedFoodData);
      const response = await axios.post(createPetFoodRoute, updatedFoodData);
      //console.log(response);
      //console.log("Data submitted");
      setFoodData("");
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };

  const handleAdditionalInfoSubmit = async () => {
    // Handle additional information form submission
    //console.log("Additional information data before update:", formData);

    if (selectedPet && selectedPet._id) {
      if (validateForm()) {
        const updatedFormData = { ...formData, PetID: selectedPet._id };
        //console.log("Updated additional information data:", updatedFormData);

        setFormData(updatedFormData);
        const response = await axios.post(createPetLogRoute, updatedFormData);
        onPetLogSubmit(response.data);
        //console.log(response);
        //console.log("Data submitted");
        setFormData(initialFormData);
        setLogDate("");
        //   if (petLogFormRef.current) {

        //     petLogFormRef.current.scrollIntoView({
        //       behavior: 'smooth',
        //       block: 'start',
        //       inline: 'nearest',
        //     });
        // }
      }
    } else {
      console.error("selectedPet or selectedPet._id is undefined.");
    }
  };

  const validateForm = () => {
    const { Weight, ActivityLevel, UrineAmount, StoolAmount } = formData;
    if (Weight === "") {
      toast.error("Weight is required.", toastOptions);
      return false;
    } else if (ActivityLevel === "") {
      toast.error("Activity Level is required.", toastOptions);
      return false;
    } else if (UrineAmount === "") {
      toast.error("Urine Amount is required.", toastOptions);
      return false;
    } else if (StoolAmount === "") {
      toast.error("Stool Amount is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleImageUpload = (data) => {
    // Handle the image data in the parent component
    setFormData({
      ...formData,
      PetImages: data, // Use the 'data' parameter instead of 'imageData'
    });
    setSelectedImage(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    setFormData({
      ...formData,
      [name]: value,
    });
    //console.log(value);
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

  const handleLogDateChange = (e) => {
    const { name, value } = e.target;
    const [year, month, day] = value.split("T")[0].split("-");
    const resultDate = `${day}-${month}-${year}`;

    setFormData({
      ...formData,
      [name]: resultDate,
    });
    setLogDate(resultDate);
  };

  return (
    <div className={styles.petLogFormsAndFoodForm}>
      <div className={styles.petLogContainer} ref={petLogFormRef}>
        <div className={styles.petLogTitle}>
          <Typography variant="h2-poppins-semibold">
            {formMode === "create"
              ? "Add Pet Log"
              : selectedLog && selectedLog.LogDate}
          </Typography>
          <div {...getToggleProps()}>
            <CloseSVG width="27" height="28" onClick={closePetLogForm} />
          </div>
        </div>
        <div className={styles.addPetForm}>
          <div className={styles.petLogFormGeneral}>
            <div className={styles.formSubheading}>
              <Typography variant="sub-poppins-medium">General</Typography>
            </div>
            <div className={styles.petLogFormLine1}>
              <div className={styles.petLogDateStyle}>
                <Typography variant="body2-poppins-medium">Date</Typography>
                {formMode === "create" ? (
                  <DatePicker
                    onChange={handleLogDateChange}
                    id="LogDate"
                    key="createMode" // Add a key for create mode
                  />
                ) : selectedLog && selectedLog.LogDate ? (
                  <DatePicker
                    onChange={handleLogDateChange}
                    id="LogDate"
                    value={selectedLog.LogDate}
                    disabled={isDisabled}
                    key="viewMode" // Add a key for view mode
                  />
                ) : null}
              </div>
              <div>
                <div className={styles.petUnit}>
                  {formMode === "create" ? (
                    <TextInput
                      id="Weight"
                      name="Weight"
                      label="Weight"
                      propInputValue={formData.Weight}
                      placeholder="30"
                      onChange={handleInputChange}
                      key="createMode"
        
                    />
                  ) : selectedLog && selectedLog.Weight ? (
                    <TextInput
                      id="Weight"
                      name="Weight"
                      label="Weight"
                      placeholder="30"
                      disabled={isDisabled}
                      propInputValue={selectedLog.Weight}
                      onChange={handleInputChange}
                      key="viewMode"
                    />
                  ) : null}

                  <div style={{ position: "relative", bottom: "16px" }}>
                    <Typography variant="textfield-poppins-regular">
                      lbs
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.petLogRadioButtons}>
              <div className={styles.ActivityLevel}>
                <Typography variant="body2-poppins-medium">
                  Activity Level
                </Typography>
                <div className={styles.ActivityLevelRadio}>
                  {options.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      checked={formData.ActivityLevel === option.value}
                      onChange={() =>
                        handleRadioChange(option.value, "ActivityLevel")
                      }
                      readOnly={formMode === "view"}
                      readOnlyValue={
                        selectedLog &&
                        selectedLog.ActivityLevel === option.value
                      }
                    />
                  ))}
                </div>
              </div>
              <div className={styles.UrineAmount}>
                <Typography variant="body2-poppins-medium">
                  Urine Amount
                </Typography>
                <div className={styles.UrineAmountRadio}>
                  {options.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      checked={formData.UrineAmount === option.value}
                      onChange={() =>
                        handleRadioChange(option.value, "UrineAmount")
                      }
                      readOnly={formMode === "view"}
                      readOnlyValue={
                        selectedLog && selectedLog.UrineAmount === option.value
                      }
                    />
                  ))}
                </div>
              </div>
              <div className={styles.StoolAmount}>
                <Typography variant="body2-poppins-medium">
                  Stool Amount
                </Typography>

                <div className={styles.StoolAmountRadio}>
                  {options.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      checked={formData.StoolAmount === option.value}
                      onChange={() =>
                        handleRadioChange(option.value, "StoolAmount")
                      }
                      readOnly={formMode === "view"}
                      readOnlyValue={
                        selectedLog && selectedLog.StoolAmount === option.value
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.formSubheading}>
              <Typography variant="sub-poppins-medium">Food</Typography>
            </div>
            <div className={styles.sessionContainer}>
              {formMode === "create" && (
                <FoodForm
                  onFoodFormSubmit={handleFoodFormSubmit}
                  SelectedPetID={SelectedPetID}
                  logDate={LogDate}
                  formMode={formMode}
                  displayDeleteBtn={true}
                />
              )}
              {formMode === "view" && selectedLog && selectedLog.LogDate && (
                <FoodForm
                  onFoodFormSubmit={handleFoodFormSubmit}
                  SelectedPetID={SelectedPetID}
                  logDate={selectedLog.LogDate}
                  displayDeleteBtn={false}
                />
              )}
            </div>
          </div>
          <div className={styles.sessionContainer}>
            <div className={styles.formSubheading}>
              <Typography variant="sub-poppins-medium">
                Additional Information
              </Typography>
            </div>
            <div>
              <Typography variant="body2-poppins-medium">
                Other Notes
              </Typography>
              {formMode === "create" && (
                <TextArea
                  name="Notes"
                  id="Notes"
                  cols="30"
                  rows="10"
                  value={formData.Notes}
                  placeholder="Enter Observations for your pet."
                  onChange={handleInputChange}
                  className={styles.petLogTextarea}
                />
              )}
              {formMode === "view" && selectedLog && selectedLog.Notes && (
                <TextArea
                  name="Notes"
                  id="Notes"
                  cols="30"
                  rows="10"
                  placeholder="Enter Observations for your pet."
                  onChange={handleInputChange}
                  value={selectedLog.Notes}
                  className={styles.petLogTextarea}
                  disabled={isDisabled}
                />
              )}
            </div>
            <div className={styles.petLogImage}>
              <Typography variant="body2-poppins-medium">
                Upload Images
              </Typography>
              <Typography
                varient="textfield-poppins-regular"
                color="small-text-gray"
              >
                Pet’s conditions (e.g. injuries, vomit)
              </Typography>
              {formMode === "create" && (
                <div>
                  <ImageDisplay PetImageData={selectedImage} />
                  <SingleImageUpload
                    label="Add Pet Log Image"
                    onImageUpload={handleImageUpload}
                    maxSizeInBytes={1024 * 1024} 
                  />
                </div>
              )}
              {formMode === "view" && selectedLog && selectedLog.Notes && (
                <div>
                  <ImageDisplay PetImageData={selectedLog.PetImages[0]} />
                </div>
              )}
            </div>
            <div className={styles.buttonStyle}>
              {formMode === "create" && (
                <Button
                  variant="yellow"
                  label="Save"
                  size="dk-md-s"
                  onClick={handleAdditionalInfoSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PetLogForm;
