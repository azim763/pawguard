import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllClinicsRoute } from "../../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicDetailCard from "../../components/ClinicDetailCard/ClinicDetailCard";
import styles from "./ListClinics.module.css";
import PetSelection from "../../components/PetSelection/PetSelection";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import TextInputIcon from "../../components/TextInputIcon/TextInputIcon";
import { searchPetsByUserIDRoute } from "../../utils/APIRoutes.js";
import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";
import AutocompleteClinic from "../../components/AutocompleteClinic/AutocompleteClinic";
import Dropdown from "../../components/Dropdown/Dropdown";

let originalClinicData = [];

const ListClinics = () => {


  const [selectedPet, setSelectedPet] = useState(null);
  const [clinicData, setClinicData] = useState([]);
  const [urgentCareChecked, setUrgentCareChecked] = useState(false);
  const [open24hrsChecked, setOpen24hrsChecked] = useState(false);
  const [clinicInfo, setClinicInfo] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedClinicName, setselectedClinicName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sort, setSort] = useState(true);

  const handleDropdownChange = (value) => {
    console.log("Dropdown value changed:", value);

    // Convert the value to a boolean if it's a string
    const isAscending = value === "true"; // Assuming "true" represents ascending order

    setSort(isAscending);
  };

  useEffect(() => {
    // Sort the clinicData whenever the sorting criteria change (sort state changes)
    const sortedClinicData = [...clinicData];
    sortedClinicData.sort((a, b) => {
      if (sort !== null) {
        if (sort) {
          return b.Rating - a.Rating; // High to low
        } else {
          return a.Rating - b.Rating; // Low to high
        }
      }
      return 0; // Default behavior when sort is not set
    });
    setClinicData(sortedClinicData);
  }, [sort]);
  



  const handleSelectedOptions = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (storedData) {
          const data = JSON.parse(storedData);
          const petData = localStorage.getItem('petsData');
          
          if (petData) {
            // If petData exists in local storage, use it
            const petArray = JSON.parse(petData);
            setPets(petArray);
  
            if (!selectedPet && petArray.length > 0) {
              setSelectedPet(petArray[0]);
            }
          } else {
            // Fetch pet data from the backend
            const response = await axios.get(searchPetsByUserIDRoute, {
              params: { userID: data._id },
            });
  
            setPets(response.data);
  
            if (!selectedPet && response.data.length > 0) {
              setSelectedPet(response.data[0]);
            }
          }
        }
      } catch (error) {
        // Handle any errors here
      }
    };
  
    // Fetch data when the component mounts
    fetchData();
  }, []);
  

  // const options = ["Dentistry", "Allergies"];


  const navigate = useNavigate();
  const petData = [
    { imgUrl: "https://picsum.photos/200", petName: "Pet 1", index: 1 },
    { imgUrl: "https://picsum.photos/200", petName: "Pet 2", index: 2 },
    // Add more pet data as needed
  ];

  useEffect(() => {
    axios
      .get(getAllClinicsRoute)
      .then((response) => {
        console.log(response.data);
        setClinicData(response.data);
        setClinicInfo(response.data)
        originalClinicData = response.data;
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const handlePetClick = (index) => {
    setSelectedPet(index);
  };

  const handleClickDetails = (clinicId) => {
    navigate(`/clinic/details/${clinicId}`);
  };

  // const onCheckHandler = (event) => {
  //   const { id, checked } = event.target;
  //   if (id === "urgCare") {
  //     setUrgentCareChecked(checked);
  //     console.log("Urgent Care checked:", checked);
  //   } else if (id === "24hrs") {
  //     setOpen24hrsChecked(checked);
  //     console.log("Open 24 Hours checked:", checked);
  //   }
  // };

  const handleUrgCheckboxChange = (event) => {
    const { checked } = event.target;
    setUrgentCareChecked(event.target.checked);
    console.log("Urgent Care checked", checked);
    console.log(originalClinicData);
  };

  const handle24CheckboxChange = (event) => {
    setOpen24hrsChecked(event.target.checked);
    const { checked } = event.target;
    console.log("Open 24 Hours checked", checked);
    console.log(originalClinicData);
  };

  const sortBy = [
    { value: true, label: 'SortBy:Rating from high to low' },
    { value: false, label: 'SortBy:Rating from low to high' }
  ];

  const onClickHandler = () => {
    const filteredResults = originalClinicData.filter((clinic) => {
      const matchesUrgentCare = !urgentCareChecked || clinic.UrgentCare;
      const matchesOpen24hrs = !open24hrsChecked || clinic.Open24;
      const cityFilter = !selectedClinicName || clinic.City === selectedClinicName;
      const specialtyFilter = selectedOptions.length === 0 || selectedOptions.includes(clinic.Specialty);

      // Check if any filter is applied, and only apply relevant filters
      return (!urgentCareChecked || matchesUrgentCare) && (!open24hrsChecked || matchesOpen24hrs) && (!selectedClinicName || cityFilter) && (selectedOptions.length === 0 || specialtyFilter);
    });

    setClinicData(filteredResults);
  };


  //     const matchesUrgentCare = urgentCareChecked ? clinic.UrgentCare : false;
  //     const matchesOpen24hrs = open24hrsChecked ? clinic.Open24 : false;
  //     if (urgentCareChecked && open24hrsChecked) {
  //       return matchesUrgentCare && matchesOpen24hrs;
  //     } else if (urgentCareChecked) {
  //       return matchesUrgentCare;
  //     } else if (open24hrsChecked) {
  //       return matchesOpen24hrs;
  //     } else {
  //       return false;
  //     }
  //   });

  //   setClinicData(
  //     urgentCareChecked || open24hrsChecked ? clinicData : filteredResults
  //   );
  //   console.log(filteredResults);
  //   console.log(clinicData);
  // };

  return (
    <div>
      <Header />
      <div className={styles.coverBackground}>
        <div className={styles.opaqueStyle}>
          <Typography variant="h2-poppins-semibold" color="white-white">
            <div className={styles.titleCenter}>
              <div className={styles.title1}>Find Your Clinic</div>
              <Typography variant="sub-h1-poppins-semibold" color="white-white">
                <div className={styles.clinicTag}>
                  Best clinics for your pets in Vancouver
                </div>
              </Typography>
            </div>
          </Typography>
        </div>
      </div>
      <main>
        <div>
          <Typography variant="h2-poppins-semibold" color="almost-black">
            Select the pet you would like to find clinics for.
          </Typography>
          <Typography variant="sub-h2-poppins-medium" color="almost-black">
            Specialties will be recommended for your pet’s needs.
          </Typography>
        </div>
        <div className={styles.multiplePetSelection}>
          {/* {petData.map((pet, index) => (
            <PetSelection
              key={index}
              imgUrl={pet.imgUrl}
              petName={pet.petName}
              isSelected={index === selectedPet}
            // onClick={() => handlePetClick(index)}
            />
          ))} */}
        </div>
        <div className={styles.clinicSearch}>
          <div className={styles.dropDownClinics}>
            {/* <Dropdown
              key="specialityDropDown"
              // onChange={handleDropdownChange}
              defaultValue="Allergies"
              options={[
                { value: "1", label: "Allergies" },
                { value: "Cardiology", label: "Cardiology" },
              ]}
              size="large"
            /> */}
            <MultipleDropDown
              options={[
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
              ]

              }
              onSelect={handleSelectedOptions}

            />
           
            <Typography variant="body2-poppins-medium">City: </Typography>
            {clinicInfo.length > 0 && (
              <AutocompleteClinic
                clinicInfo={clinicInfo}
                handleSelection={(selectedClinic) => {
                  console.log("Selected Clinic:", selectedClinic);
                  console.log(selectedClinic.City);
                  setselectedClinicName(selectedClinic.City)
                }}
              />
            )}
          </div>

          <Checkbox
            id="urgCare"
            label="Urgent Care"
            onChangeHandler={handleUrgCheckboxChange}
            value={urgentCareChecked}
          />
          <Checkbox
            id="24hrs"
            label="Open 24 hours"
            onChangeHandler={handle24CheckboxChange}
            value={open24hrsChecked}
          />

          <Button
            variant="yellow"
            label="Search"
            size="dk-md-s"
            onClickHandler={onClickHandler}
          />

<Dropdown
              label="Sort By"
              id="sortBy"
              name="sortBy"
              options={sortBy}
              onChange={(selectedValue) => handleDropdownChange(selectedValue)}
            />
        </div>

        {clinicData.length === 0 ? (
          <p>No results found.</p>
        ) : (
          clinicData.map((clinic) => (
            <ClinicDetailCard
              key={clinic._id}
              clinicName={clinic.Name}
              clinicRating={clinic.Rating}
              clinicAddress={clinic.Address}
              specialtiesString={clinic.Specialty}
              source={clinic.ImageUrl}
              open24={clinic.Open24 ? "Open 24" : "Not open 24"}
              handleClickDetails={() => handleClickDetails(clinic._id)}
            />
          )))
        }
      </main>
    </div>
  );
};

export default ListClinics;
