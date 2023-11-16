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
import StarRating from "../../components/StarRating/StarRating";
import PetSelectionClinic from "../../components/PetSelectClinic/PetSelectClinic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import IndividualClinic from "./../IndividualClinic/IndividualClinic";
import { getClinicByIdRoute } from "../../utils/APIRoutes";
import CloseSVG from "../../components/SVG/CloseSVG";

let originalClinicData = [];

const ListClinics = () => {
  const [clinicDetails, setClinicDetails] = useState();
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [clinicData, setClinicData] = useState([]);
  const [urgentCareChecked, setUrgentCareChecked] = useState(false);
  const [open24hrsChecked, setOpen24hrsChecked] = useState(false);
  const [clinicInfo, setClinicInfo] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedClinicName, setselectedClinicName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sort, setSort] = useState(true);
  const [currentUserId, setCurrentUserId] = useState();
  const [individualClinicId, setIndividualClinicId] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handlePetSelectClinicClick = (id, specialties) => {
    setSelectedPetId(id);

    if (specialties === "" || specialties === null) setSelectedOptions([]);
    else setSelectedOptions(specialties.split(","));
  };

  const handleDropdownChange = (value) => {
    console.log(`handleDropdownChange: ${value}`);
    // Convert the value to a boolean if it's a string
    const isAscending = value === "true"; // Assuming "true" represents ascending order

    setSort(isAscending);
  };

  useEffect(() => {
    console.log(`change sort: ${sort}`);
    // Sort the clinicData whenever the sorting criteria change (sort state changes)
    const sortedClinicData = [...clinicData];
    sortedClinicData.sort((a, b) => {
      if (sort) {
        return b.Rating - a.Rating; // High to low
      } else {
        return a.Rating - b.Rating; // Low to high
      }
    });
    setClinicData(sortedClinicData);
  }, [sort]);

  const handleSelectedOptions = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        const data = JSON.parse(storedData);

        console.log("getPetData");
        // Fetch pet data from the backend
        const response = await axios.get(searchPetsByUserIDRoute, {
          params: { userID: data._id },
        });

        setPets(response.data);
        console.log(response.data);
        setCurrentUserId(data._id);
        console.log(data._id);

        if (!selectedPetId && response.data.length > 0) {
          setSelectedPetId(response.data[0]._id);
          setSelectedOptions(response.data[0].PreExistingMedical.split(","));
        }

        console.log("sort data");
        setSort(true);
      } catch (error) {
        // Handle any errors here
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  // const options = ["Dentistry", "Allergies"];

  // const navigate = useNavigate();
  // const petData = [
  //   { imgUrl: "https://picsum.photos/200", petName: "Pet 1", index: 1 },
  //   { imgUrl: "https://picsum.photos/200", petName: "Pet 2", index: 2 },
  //   // Add more pet data as needed
  // ];

  useEffect(() => {
    axios
      .get(getAllClinicsRoute)
      .then((response) => {
        const data = response.data.sort((a, b) => {
          if (sort) {
            return b.Rating - a.Rating; // High to low
          } else {
            return a.Rating - b.Rating; // Low to high
          }
        });
        setClinicData(data);
        setClinicInfo(data);
        originalClinicData = response.data;
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const handleClickDetails = (clinicId) => {
    console.log("clinicId");
    console.log(clinicId);
    // navigate(`/clinic/details/${clinicId}`);
    axios
      .get(`${getClinicByIdRoute}/${clinicId}`)
      .then((response) => {
        console.log("response.data");
        console.log(response.data);
        setClinicDetails(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });

    setIsVisible(true);
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
    console.log("Open Urgent care checked", checked);

    setUrgentCareChecked(event.target.checked);
  };

  const handle24CheckboxChange = (event) => {
    setOpen24hrsChecked(event.target.checked);
    const { checked } = event.target;
    console.log("Open 24 Hours checked", checked);
    console.log(originalClinicData);
  };

  const sortBy = [
    { value: true, label: "Sort by: Ratings High to Low" },
    { value: false, label: "Sort by: Ratings  Low to High" },
  ];

  const onClickHandler = () => {
    console.log(originalClinicData);
    const filteredResults = originalClinicData.filter((clinic) => {
      const matchesUrgentCare = !urgentCareChecked || clinic.UrgentCare;
      const matchesOpen24hrs = !open24hrsChecked || clinic.Open24;
      const cityFilter =
        !selectedClinicName || clinic.City === selectedClinicName;
      const specialtyFilter =
        selectedOptions.length === 0 ||
        clinic.Specialty.split(",").some((word) =>
          selectedOptions.includes(word.trim())
        );

      // Check if any filter is applied, and only apply relevant filters
      return (
        (!urgentCareChecked || matchesUrgentCare) &&
        (!open24hrsChecked || matchesOpen24hrs) &&
        (!selectedClinicName || cityFilter) &&
        (selectedOptions.length === 0 || specialtyFilter)
      );
    });
    console.log("filteredResult", filteredResults);

    setClinicData(filteredResults);
  };

  return (
    <div>
      <Header />
      <div className={styles.coverBackground}>
        <div className={styles.opaqueStyle}>
          <Typography variant="h1-poppins-semibold" color="white-white">
            <div className={styles.titleCenter}>
              <div className={styles.title1}>Find Your Clinic</div>
              <Typography variant="sub-poppins-medium" color="white-white">
                <div className={styles.clinicTag}>
                  Best clinics for your pets in Vancouver
                </div>
              </Typography>
            </div>
          </Typography>
        </div>
      </div>
      <div className={styles.clinicsContainer}>
        <div className={styles.clinicTitle}>
          {currentUserId ? (
            <>
              <Typography variant="h2-poppins-semibold" color="almost-black">
                Select the pet you would like to find clinics for.
              </Typography>
              <Typography variant="body2-poppins-medium" color="almost-black">
                Specialties will be recommended for your pet’s needs.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h2-poppins-semibold" color="almost-black">
                Enter clinic specialties and city name
              </Typography>
              <Typography variant="body2-poppins-medium">
                <Link to="/login" className={styles.addPetLink}>
                  Sign in to select your pet
                  <FontAwesomeIcon
                    className={styles.arrowContainer}
                    icon={faChevronRight}
                  />
                </Link>
              </Typography>
            </>
          )}
          <div className={styles.petSelection}>
            {currentUserId ? (
              pets &&
              Array.isArray(pets) &&
              pets.map((petSelectClinic) => (
                <div key={petSelectClinic._id}>
                  <PetSelectionClinic
                    id={petSelectClinic._id}
                    specialties={petSelectClinic.PreExistingMedical}
                    imgUrl={petSelectClinic.PetImageName}
                    clinicPetName={petSelectClinic.PetName}
                    selected={petSelectClinic._id === selectedPetId}
                    onClick={handlePetSelectClinicClick}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
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
            <div>
              <div className={styles.specialtiesContainer}>
                <Typography variant="body2-poppins-medium">
                  Specialties
                </Typography>
              </div>
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
                ]}
                selectedValues={selectedOptions}
                onSelect={handleSelectedOptions}
              />
            </div>

            <div>
              <Typography variant="body2-poppins-medium">City Name </Typography>
              {clinicInfo.length > 0 && (
                <AutocompleteClinic
                  clinicInfo={clinicInfo}
                  handleSelection={(selectedClinic) => {
                    if (!selectedClinic) {
                      // If selection is empty, call handleSelection with null or empty value
                      setselectedClinicName(null); // You can also pass an empty string if that's what you prefer
                    } else {
                      setselectedClinicName(selectedClinic.City);
                    }
                    // console.log("Selected Clinic:", selectedClinic);
                    // console.log(selectedClinic.City);
                    // setselectedClinicName(selectedClinic.City);
                  }}
                />
              )}
            </div>
          </div>

          <div className={styles.clinicCheckbox}>
            <div style={{ marginRight: "50px" }}>
              <Checkbox
                id="urgCare"
                label="Urgent Care"
                onChange={handleUrgCheckboxChange}
                value={urgentCareChecked}
              />
            </div>
            <Checkbox
              id="24hrs"
              label="Open 24 hours"
              onChange={handle24CheckboxChange}
              value={open24hrsChecked}
            />
          </div>

          <div className={styles.clinicButton}>
            <Button
              variant="yellow"
              label="Search"
              size="dk-md-s"
              onClickHandler={onClickHandler}
            />
          </div>

          <div style={{ marginBottom: "10px", marginTop: "30px" }}>
            <Dropdown
              id="sortBy"
              name="sortBy"
              options={sortBy}
              onChange={(selectedValue) => handleDropdownChange(selectedValue)}
              size="round"
            />
          </div>
        </div>

        {clinicData.length === 0 ? (
          <div className={styles.noResultContainer}>
            <Typography variant="body2-poppins-medium">
              No results found.
            </Typography>
          </div>
        ) : (
          clinicData.map((clinic) => (
            <ClinicDetailCard
              key={clinic._id}
              clinicName={clinic.Name}
              clinicRating={clinic.Rating}
              clinicRatingStar={<StarRating rating={clinic.Rating} />}
              clinicAddress={clinic.Address}
              specialtiesString={clinic.Specialty}
              source={clinic.ImageUrl}
              open24={clinic.Open24 ? "Open 24" : "Not open 24"}
              handleClickDetails={() => handleClickDetails(clinic._id)}
            />
          ))
        )}
        {isVisible && (
          <div className={styles.individualClinicContainer}>
            {clinicDetails != null && (
              <>
                <CloseSVG
                  className={styles.closeIcon}
                  // onClick={closeClinicDetails}
                />
                <IndividualClinic clinicDetails={clinicDetails} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListClinics;
