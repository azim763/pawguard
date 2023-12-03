import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllClinicsRoute } from "../../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ClinicDetailCard from "../../components/ClinicDetailCard/ClinicDetailCard";
import styles from "./ListClinics.module.css";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
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
import LoadPage from "../loadPage";
import LoadingOverlay from "react-loading-overlay-ts";

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
  const [isLoadingData, setLoadingData] = useState(false);

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
    const sortedClinicData = [...clinicData];
    sortedClinicData.sort((a, b) => {
      if (sort) {
        return b.Rating - a.Rating;
      } else {
        return a.Rating - b.Rating;
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
        document.body.style.overflow = "hidden";
        setLoadingData(true);
        const storedData = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (storedData) {
          const storedId = JSON.parse(storedData)
          const petData = localStorage.getItem("petsData");
          if (petData) {
            const petArray = JSON.parse(petData);
            setPets(petArray);
            if (!selectedPetId && petArray.length > 0) {
              setSelectedPetId(petArray[0]._id);
              setSelectedOptions(petArray[0].PreExistingMedical.split(","));
              setCurrentUserId(storedId._id)
              //console.log(storedId._id)
            }
          }
          else {
            const data = JSON.parse(storedData);
            //console.log("getPetData");
            const response = await axios.get(searchPetsByUserIDRoute, {
              params: { userID: data._id },
            });

            setPets(response.data);
            setCurrentUserId(data._id);
            if (!selectedPetId && response.data.length > 0) {
              setSelectedPetId(response.data[0]._id);
              setSelectedOptions(response.data[0].PreExistingMedical.split(","));
            }

            //console.log("sort data");
            setSort(true);
          }
        }
      } catch (error) {
      } finally {
        setLoadingData(false);
        document.body.style.overflow = "unset";
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setLoadingData(true);

    axios
      .get(getAllClinicsRoute)
      .then((response) => {
        const data = response.data.sort((a, b) => {
          if (sort) {
            return b.Rating - a.Rating;
          } else {
            return a.Rating - b.Rating;
          }
        });
        setClinicData(data);
        setClinicInfo(data);
        originalClinicData = response.data;
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })
      .finally(() => {
        setLoadingData(false);
        document.body.style.overflow = "unset";
      });
  }, []);

  const closeClinicDetails = () => {
    scrollScreen();
  };

  const scrollScreen = () => {
    const scrollPosition = window.scrollY;

    setIsVisible(false);

    document.body.style.position = "";
    setIsVisible(false);

    document.body.style.overflow = "auto";

    document.body.classList.toggle("overlay-invisible");

    setTimeout(() => {
      document.body.classList.remove("overlay-visible");
    }, 10000);
  };

  const handleClickDetails = (clinicId) => {
    axios
      .get(`${getClinicByIdRoute}/${clinicId}`)
      .then((response) => {
        setClinicDetails(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
    fixScreen();
  };

  const fixScreen = () => {
    // Toggle the visibility of the overlay
    setIsVisible(!isVisible);

    // Toggle the body class to freeze the background
    document.body.classList.toggle("overlay-visible");

    // Set the body style to disable/enable scrolling
    document.body.style.overflow = isVisible ? "auto" : "hidden";

    // Set the body style to fix the background at the current scroll position
    if (isVisible) {
      const scrollPosition = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.position = "fixed";
    }
  };

  const handleUrgCheckboxChange = (event) => {
    const { checked } = event.target;
    //console.log("Open Urgent care checked", checked);

    setUrgentCareChecked(event.target.checked);
  };

  const handle24CheckboxChange = (event) => {
    setOpen24hrsChecked(event.target.checked);
    const { checked } = event.target;
    //console.log("Open 24 Hours checked", checked);
    //console.log(originalClinicData);
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
    <LoadingOverlay
      active={isLoadingData}
      fadeSpeed={300}
      spinner={<LoadPage />}
      styles={{
        overlay: (base) => ({
          ...base,
          height: "100vh",
        }),
      }}
    >
      <div>
        <Header />
        <div
          className={
            isVisible ? styles.overlayVisable : styles.overlayInVisable
          }
        >
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
          <div className={styles.clinicOuterWrapper}>
            <div className={styles.clinicsContainer}>
              <div className={styles.clinicTitle}>
                {currentUserId ? (
                  <>
                    <Typography
                      variant="h2-poppins-semibold"
                      color="almost-black"
                    >
                      Select the pet you would like to find clinics for.
                    </Typography>
                    <Typography
                      variant="body2-poppins-medium"
                      color="almost-black"
                    >
                      Specialties will be recommended for your pet’s needs.
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h2-poppins-semibold"
                      color="almost-black"
                    >
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
              <div className={styles.multiplePetSelection}></div>
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
                        "Arthritis",
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
                      style={{
                        placeholder: {
                          display: "none", // Hide the placeholder
                          fontWeight: "400",
                          fontSize: "16px",
                          lineHeight: "19.4px",
                          // marginLeft: "5px",
                        },
                        chips: {
                          backgroundColor: "var(--dark-blue)",
                          color: "var(--white-white)",
                          borderRadius: "8px",
                          padding: "8px",
                          fontSize: "16px",
                        },
                        multiselectContainer: {
                          color: "black",
                          display: "inline-block",
                          margin: "0",
                          marginTop: "7px",
                          height: "auto",
                          // paddingLeft: "5px",
                        },
                        searchBox: {
                          // fontSize: "20px",
                          border: "1px solid var(--almost-black) ",
                          minHeight: "54px",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          fontWeight: "400",
                          fontSize: "16px",
                          lineHeight: "19.4px",
                          display: "flex",
                          flexFlow: "wrap",
                          padding: "12px",
                          gap: "8px",
                        },
                        optionContainer: {
                          maxHeight: "500px",
                        },
                      }}
                      selectedValues={selectedOptions}
                      onSelect={handleSelectedOptions}
                      placeholder={
                        selectedOptions.length > 0 ? "" : "Select Specialties"
                      }
                    />
                  </div>

                  <div>
                    <Typography variant="body2-poppins-medium">
                      City Name{" "}
                    </Typography>
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
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.clinicCheckbox}>
                  <div className={styles.checkboxGap}>
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

                <div className={styles.clinicDropDown}>
                  <Dropdown
                    id="sortBy"
                    name="sortBy"
                    options={sortBy}
                    onChange={(selectedValue) =>
                      handleDropdownChange(selectedValue)
                    }
                    size="round"
                  />
                </div>
              </div>

              {clinicData.length === 0 ? (
                <div className={styles.noResultContainer}>
                  <Typography variant="body3-poppins-regular">
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
            </div>
          </div>
        </div>
        {isVisible && (
          <div className={styles.individualClinicContainer}>
            {clinicDetails != null && (
              <div>
                <div className={styles.closeIconContainer}>
                  <CloseSVG
                    className={styles.closeIcon}
                    onClick={closeClinicDetails}
                  />
                </div>
                <IndividualClinic clinicDetails={clinicDetails} />
              </div>
            )}
          </div>
        )}
      </div>
    </LoadingOverlay>
  );
};

export default ListClinics;
