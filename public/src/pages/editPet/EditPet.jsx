import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { patchPetRoute, getPetByIdRoute } from "../../utils/APIRoutes.js";
import styles from "./EditPet.module.css";
import SingleImageUpload from "../../components/SingleImageUpload/SingleImageUpload";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import DatePicker from "../../components/DatePicker/DatePicker";
import Header from "../../components/Header/header";
import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";
import ImageDisplay from "../../components/ImageDisplay/ImageDisplay";

const EditPet = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreExistingMedical, setSelectedPreExistingMedical] = useState(
    []
  );
  const { petID } = useParams();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getPetByIdRoute}/${petID}`
        );
        setSelectedPet(response.data);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchData();
  }, [petID]);

  const petType = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
  ];

  let bloodType = [
    { value: "DEA1", label: "DEA 1" },
    { value: "DEA3", label: "DEA 3" },
    { value: "DEA4", label: "DEA 4" },
    { value: "DEA5", label: "DEA 5" },
    { value: "DEA7", label: "DEA 7" },
  ];

  let breedType = [
    { value: "Select the Breed", label: "Select the Breed" },
    { value: "Beagle", label: "Beagle" },
    { value: "Rottweiler", label: "Rottweiler" },
    { value: "BostonTerrier", label: "Boston Terrier" },
    { value: "Chihuahua", label: "Chihuahua" },
    { value: "Golden Retriever", label: "Golden Retriever" },
    { value: "FrenchBulldog", label: "French Bulldog" },
    { value: "GermanShepherdDog", label: "German Shepherd Dog" },
    { value: "Labradoodle", label: "Labradoodle" },
    { value: "LabradorRetriever", label: "Labrador Retriever" },
    { value: "Maltese", label: "Maltese" },
    { value: "Mixed", label: "Mixed" },
    { value: "Pomeranian", label: "Pomeranian" },
    { value: "Poodle", label: "Poodle" },
    { value: "Pug", label: "Pug" },
    { value: "ShihTzu", label: "Shih Tzu" },
    { value: "Siberian Husky", label: "Siberian Husky" },
    { value: "YorkshireTerrier", label: "Yorkshire Terrier" },
  ];

  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const preExistingMedical = [
    "Arthritis XD",
    "Bloodwork",
    "Cardiology",
    "Cytology",
    "Dentistry",
    "Dermatology",
    "Endoscopy",
    "Euthanasia",
    "Internal-medicine",
    "Laser-therapy",
    "Microchipping",
    "Neurology",
    "Nutrition",
    "Oncology",
    "Radiography",
    "Senior",
    "Surgery",
    "Ultrasound",
  ];

  const petBday = selectedPet.Birthday;

  const originalDate = new Date(petBday);
  const formattedDate = `${String(originalDate.getDate()).padStart(2, "0")}-${String(
    originalDate.getMonth() + 1
  ).padStart(2, "0")}-${originalDate.getFullYear()}`;

  console.log(formattedDate);

  const [petData, setPetData] = useState({});

  useEffect(() => {
    if (selectedPet) {
      setPetData({
        ...petData,
        PetName: selectedPet.PetName,
        Gender: selectedPet.Gender,
        Species: selectedPet.Species,
        Breed: selectedPet.Breed,
        Birthday: selectedPet.Birthday,
        BloodType: selectedPet.BloodType,
        Height: selectedPet.Height,
        Weight: selectedPet.Weight,
        PreExistingMedical: selectedPet.PreExistingMedical,
        PetImageName: selectedPet.PetImageName,
        Description: selectedPet.Description,
      });
    }
  }, [selectedPet]);

  const handleDateChange = (event) => {
    setPetData({
      ...petData,
      Birthday: event.target.value,
    });
    const updatedSelectedPet = {
      ...selectedPet,
      Birthday: event.target.value,
    };
    setSelectedPet(updatedSelectedPet)
  };

  const handleInputChange = (event) => {
    console.log("Input changed:", event.target.value);
    setPetData({
      ...petData,
      [event.target.name]: event.target.value,
    });
    const updatedSelectedPet = {
      ...selectedPet,
      [event.target.name]: event.target.value,
    };
    setSelectedPet(updatedSelectedPet);
  };

  if (petData.Species === "Cat") {
    bloodType = [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "AB", label: "AB" },
    ];
  } else
    bloodType = [
      { value: "DEA1", label: "DEA 1" },
      { value: "DEA3", label: "DEA 3" },
      { value: "DEA4", label: "DEA 4" },
      { value: "DEA5", label: "DEA 5" },
      { value: "DEA7", label: "DEA 7" },
    ];

  if (petData.Species === "Cat") {
    breedType = [
      { value: "Select the Breed", label: "Select the Breed" },
      { value: "American Shorthair", label: "American ShortHair" },
      { value: "Birman", label: "Birman" },
      { value: "DevonRex", label: "Devon Rex" },
      { value: "DomesticLongShortHair", label: "Domestic Long & Short Hair" },
      { value: "ExoticShortHair", label: "Exotic ShortHair" },
      { value: "Himalayan", label: "Himalayan" },
      { value: "MaineCoon", label: "Maine Coon" },
      { value: "Mixed", label: "Mixed" },
      { value: "PersianCat", label: "Persian Cat" },
      { value: "RagDoll", label: "RagDoll" },
      { value: "ScottishFold", label: "Scottish Fold" },
      { value: "Siamese", label: "Siamese" },
      { value: "Sphynx", label: "Sphynx" },
      { value: "Unknown", label: "Unknown" },
    ];
  } else
    breedType = [
      { value: "Select the Breed", label: "Select the Breed" },
      { value: "Beagle", label: "Beagle" },
      { value: "Rottweiler", label: "Rottweiler" },
      { value: "BostonTerrier", label: "Boston Terrier" },
      { value: "Chihuahua", label: "Chihuahua" },
      { value: "Golden Retriever", label: "Golden Retriever" },
      { value: "FrenchBulldog", label: "French Bulldog" },
      { value: "GermanShepherdDog", label: "German Shepherd Dog" },
      { value: "Labradoodle", label: "Labradoodle" },
      { value: "LabradorRetriever", label: "Labrador Retriever" },
      { value: "Maltese", label: "Maltese" },
      { value: "Mixed", label: "Mixed" },
      { value: "Pomeranian", label: "Pomeranian" },
      { value: "Poodle", label: "Poodle" },
      { value: "Pug", label: "Pug" },
      { value: "ShihTzu", label: "Shih Tzu" },
      { value: "Siberian Husky", label: "Siberian Husky" },
      { value: "YorkshireTerrier", label: "Yorkshire Terrier" },
    ];

  const handleDropdownChange = (name, value) => {
    setPetData({
      ...petData,
      [name]: value,
    });

  };

  const handleMultipleDropdownChange = (e) => {
    setSelectedPreExistingMedical(e);
    console.log(e.join(","));
    setPetData({
      ...petData,
      PreExistingMedical: e.join(","),
    });
  };

  const handleImageUpload = (data) => {
    setPetData({
      ...petData,
      PetImageName: data,
    });
    const updatedSelectedPet = {
      ...selectedPet,
      PetImageName: data,
    };
    setSelectedPet(updatedSelectedPet);
    setSelectedImage(data);
  };

  const onClickHandler = async (event) => {
    event.preventDefault();
    console.log(petData);

    axios
      .patch(`${patchPetRoute}/${selectedPet._id}`, petData)
      .then((response) => {
        console.log(`Pet with ID ${selectedPet._id} has been updated!`);
        const petsData = JSON.parse(localStorage.getItem("petsData"));

        const updatedPetData = petsData.map((pet) =>
          pet._id === selectedPet._id ? { ...pet, ...petData } : pet
        );
        localStorage.setItem("petsData", JSON.stringify(updatedPetData));

        navigate('/petPage');
      })
      .catch((error) => {
        console.error(`Error editing pet with ID ${selectedPet._id}:`, error);
      });
  };

  return (
    <div>
      <Header />
      <div className={styles.editPetContainer}>
        <div className={styles.editPetHeader}>
          <Typography variant="large-h1-poppins-bold" color="almost-black">
            Edit Pet Details
          </Typography>
        </div>
        <div className={styles.editPetForm}>
          <form action="/submit" method="post" onSubmit={onClickHandler}>
            <div className={styles.editPetImage}>
              <ImageDisplay PetImageData={selectedPet.PetImageName} />
              <SingleImageUpload
                label="Change Pet Image"
                onImageUpload={handleImageUpload}
              />
            </div>
            <TextInput
              size="md"
              id="PetName"
              label="Name *"
              propInputValue={selectedPet.PetName}
              onChange={handleInputChange}
              required={true}
            />
            <Dropdown
              size="md"
              label="Type of pet *"
              id="petType"
              options={petType}
              defaultValue={selectedPet.Species}
              onChange={(selectedValue) =>
                handleDropdownChange("Species", selectedValue)
              }
              required={true}
            />
            <Dropdown
              size="md"
              label="Breed *"
              id="Breed"
              options={breedType}
              defaultValue={selectedPet.Breed}
              onChange={(selectedValue) =>
                handleDropdownChange("Breed", selectedValue)
              }
              required={true}
            />
            <Dropdown
              size="md"
              label="Gender *"
              id="Gender"
              options={gender}
              defaultValue={selectedPet.Gender}
              onChange={(selectedValue) =>
                handleDropdownChange("Gender", selectedValue)
              }
              required={true}
            />
            <div>
              <Typography variant="body2-poppins-medium">Birthday</Typography>
              <DatePicker
                id="birthday"
                value={formattedDate}
                onChange={handleDateChange}
              />
            </div>
            <Dropdown
              size="md"
              label="Blood type"
              id="BloodType"
              options={bloodType}
              onChange={(selectedValue) =>
                handleDropdownChange("BloodType", selectedValue)
              }
            />
            <div className={styles.petHeight}>
              <TextInput
                size="sm"
                id="Height"
                label="Pet Height *"
                propInputValue={selectedPet.Height}
                onChange={handleInputChange}
                required={true}
              />
              <Typography variant="textfield-poppins-regular">in</Typography>
            </div>
            <div className={styles.petWeight}>
              <TextInput
                size="sm"
                id="Weight"
                label="Pet Weight *"
                propInputValue={selectedPet.Weight}
                onChange={handleInputChange}
                required={true}
              />
              <Typography variant="textfield-poppins-regular">lbs</Typography>
            </div>
            <MultipleDropDown
              label="Medical Necessities"
              options={preExistingMedical}
              selectedValues={
                typeof selectedPet.PreExistingMedical === "string"
                  ? selectedPet.PreExistingMedical.split(",")
                  : []
              }
              onSelect={handleMultipleDropdownChange}
            />
            <div>
              <Typography variant="body2-poppins-medium">
                <label htmlFor="Description">Pet Notes</label>
              </Typography>
              <textarea
                name="Description"
                id="Description"
                cols="30"
                rows="10"
                defaultValue={selectedPet.Description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <Button type="submit" variant="yellow" label="Save" size="dk-md-s" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPet;
