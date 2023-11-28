import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import styles from "./insuranceSearch.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAllInsurancePlansRoute,
  searchPetsByUserIDRoute,
  getPetByIdRoute,
} from "../../utils/APIRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PetSelectionInsurance from "../../components/PetSelectionInsurance/PetSelectionInsurance";
import { Link } from "react-router-dom";
import PlusSVG from "../../components/SVG/PlusSVG";
import LoadPage from "../loadPage";
import LoadingOverlay from "react-loading-overlay-ts";

const InsuranceSearch = () => {
  const [pets, setPets] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  // const [insurancePlans, setInsurancePlans] = useState([]);
  // const [selectedPetName, setSelectedPetName] = useState({});
  const [selectedPet, setSelectedPet] = useState(null);
  // const [userId, setUserId] = useState(null);
  const [pageTitle, setPageTitle] = useState("Tell us about your pet");
  const [isLoadingData, setLoadingData] = useState(false);

  const navigate = useNavigate();
  toast.configure({
    position: "top-right",
  });

  const catBreeds = [
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

  const dogBreeds = [
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

  const petAge = [
    { value: "Select the Pet Age", label: "Select the Pet Age" },
    { value: "8 weeks - 11 months", label: "8 weeks - 11 months" },
    { value: "1 year", label: "1 year" },
    { value: "2 years", label: "2 years" },
    { value: "3 years", label: "3 years" },
    { value: "4 years", label: "4 years" },
    { value: "5 years", label: "5 years" },
    { value: "6 years", label: "6 years" },
    { value: "7 years", label: "7 years" },
    { value: "8 years", label: "8 years" },
    { value: "9 years", label: "9 years" },
    { value: "10 years", label: "10 years" },
    { value: "11 years", label: "11 years" },
    { value: "12 years", label: "12 years" },
    { value: "12 years+", label: "12 years+" },
  ];

  const handlePetAgeChange = (age) => {
    setSelectedAge(age);
    console.log("Here is my Age " + age);
  };

  const handlePetTypeChange = (type) => {
    setSelectedPetType(type.toLowerCase());
    console.log("In handle function" + type);
    setSelectedBreed("");
  };

  const handlePetGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
    console.log("Here is the Breed" + breed);
  };

  const handleGetQuotesClick = async () => {
    if (
      !selectedAge ||
      !selectedPetType ||
      !selectedGender ||
      selectedBreed === "Select the Breed"
    ) {
      console.log(
        "Missing field: Age -",
        !selectedAge,
        " PetType -",
        !selectedPetType,
        " Gender -",
        !selectedGender,
        " Breed -",
        !selectedBreed
      );
      toast.error("Please select all the values before getting a quote.");
      return;
    }

    try {
      setLoadingData(true);
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";

      const response = await axios.get(
        `${getAllInsurancePlansRoute}?age=${selectedAge}`
      );

      const plans = response.data;

      if (Array.isArray(plans) && plans.length > 0) {
        const groupedPlans = groupPlansByCompany(plans);
        const selectedPlans = extractSixResults(groupedPlans);

        navigate("/insurances", { state: { filteredPlans: selectedPlans } });

        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.warning("No insurance plans found for the selected age.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data.");
    } finally {
      setLoadingData(false);
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }
  };

  function extractSixResults(groupedPlans) {
    const selectedPlans = [];
    let count = 0;

    for (const key in groupedPlans) {
      if (count >= 6) {
        break;
      }

      const companyPlans = groupedPlans[key];
      if (companyPlans.length > 0) {
        selectedPlans.push(companyPlans[0]);
        count++;
      }
    }

    return selectedPlans;
  }

  function groupPlansByCompany(plans) {
    const groupedPlans = plans.reduce((groups, plan) => {
      const key = plan.CompanyID;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(plan);
      return groups;
    }, {});
    return groupedPlans;
  }

  const handlePetSelection = async (pet) => {
    console.log(pet);
    setSelectedPet(pet);
    setSelectedPetInfo(pet);
  };

  const calculateAgeRange = (birthdayDate) => {
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthdayDate;
    const ageInYears = Math.round(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );

    const ageRanges = [
      "8 weeks - 11 months",
      "1 year",
      "2 years",
      "3 years",
      "4 years",
      "5 years",
      "6 years",
      "7 years",
      "8 years",
      "9 years",
      "10 years",
      "11 years",
      "12 years",
      "12 years+",
    ];

    const index = Math.min(Math.floor(ageInYears), ageRanges.length - 1);

    return ageRanges[index];
  };
  const setSelectedPetInfo = (pet) => {
    // setSelectedPetName(pet.PetName);
    setPageTitle(`About ${pet.PetName}`);
    setSelectedPetType(pet.Species);
    setSelectedGender(pet.Gender);
    setSelectedBreed(pet.Breed);

    const selectedAgeRange = calculateAgeRange(new Date(pet.Birthday));
    setSelectedAge(selectedAgeRange);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        const storedData = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (storedData) {
          const petData = localStorage.getItem("petsData");
          if (petData) {
            const petArray = JSON.parse(petData);
            setPets(petArray);

            if (!selectedPet && petArray.length > 0) {
              setSelectedPet(petArray[0]);
              setSelectedPetInfo(petArray[0]);
            }
          } else {
            const data = JSON.parse(storedData);
            const response = await axios.get(searchPetsByUserIDRoute, {
              params: { userID: data._id },
            });

            setPets(response.data);
            if (!selectedPet && response.data.length > 0) {
              setSelectedPet(response.data[0]);
              setSelectedPetInfo(response.data[0]);
            }
          }
        }
      } catch (error) {
        console.log("Error fetching Pet Data " + error);
      } finally {
        setLoadingData(false);
        document.body.style.overflow = "unset";
        document.body.style.height = "auto";
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <LoadingOverlay active={isLoadingData} spinner={<LoadPage />}>
      <div>
        <div>
          <Header id="top"></Header>
        </div>

        <div className={styles.insuranceSearchContainer}>
          <div className={styles.searchTitle}>
            <Typography variant="h1-poppins-semibold" color="almost-black">
              Select the pet you would like to get quotes
            </Typography>
          </div>
          <div className={styles.petSelectionContainer}>
            {pets &&
              Array.isArray(pets) &&
              pets.map((pet) => (
                <div key={pet._id} className={styles.petItem}>
                  <PetSelectionInsurance
                    pet={pet}
                    imgUrl={pet.PetImageName}
                    PetName={pet.PetName}
                    onClick={handlePetSelection}
                    selected={pet === selectedPet}
                  />
                </div>
              ))}
            <div className={styles.addPetLinkContainer}>
              <Link to="/addPet" className={styles.addPetLink}>
                <PlusSVG width="60" height="60" />
              </Link>
            </div>
          </div>

          <Typography variant="h2-poppins-semibold" color="almost-black">
            <div className={styles.insuranceFromTitle}>{pageTitle}</div>
          </Typography>

          <div className={styles.formContainer}>
            <div className={styles.insuranceDropdown}>
              <Typography variant="body2-poppins-medium" color="almost black">
                Type of Pet
              </Typography>
              <ButtonGroup
                groupId="group1"
                buttons={["Cat", "Dog"]}
                onClick={handlePetTypeChange}
                // selected={selectedPetType}
                selected={
                  selectedPetType.charAt(0).toUpperCase() +
                  selectedPetType.slice(1)
                }
              />
            </div>
            <div className={styles.insuranceDropdown}>
              <Typography variant="body2-poppins-medium" color="almost black">
                Pet's gender
              </Typography>
              <ButtonGroup
                groupId="group2"
                buttons={["Male", "Female"]}
                onClick={handlePetGenderChange}
                selected={selectedGender}
              />
            </div>

            <div className={styles.insuranceDropdown}>
              {/* <Typography variant="body2-poppins-medium" color="almost black">
                Pet's age
              </Typography> */}
              <Dropdown
                key="ageDropdown"
                value={selectedAge}
                onChange={handlePetAgeChange}
                label="Pet's age"
                options={petAge}
                placeholder="Select an Age"
                required={true}
                size="ml"
              />
            </div>
            <div className={styles.insuranceDropdown}>
              <div>
                {/* <Typography variant="body2-poppins-medium" color="almost black">
                  Select Breed
                </Typography> */}
                <Dropdown
                  key="breedDropdown"
                  value={selectedBreed}
                  onChange={handleBreedChange}
                  placeholder="Select a breed"
                  label="Select Breed"
                  options={selectedPetType === "Cat" ? catBreeds : dogBreeds}
                  size="ml"
                />
              </div>
            </div>
            <div className={styles.quoteButton}>
              <Button
                variant="yellow"
                size="dk-md"
                label="Get Quotes"
                onClick={handleGetQuotesClick}
              />
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};
export default InsuranceSearch;
