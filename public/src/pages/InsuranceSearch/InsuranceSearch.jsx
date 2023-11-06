import React ,{useState, useEffect}from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import styles from "./insuranceSearch.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {getAllInsurancePlansRoute,searchPetsByUserIDRoute,getPetByIdRoute} from "../../utils/APIRoutes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PetSelectionInsurance from "../../components/PetSelectionInsurance/PetSelectionInsurance";
import { Link } from "react-router-dom";
import PlusSVG from "../../components/SVG/PlusSVG";

const InsuranceSearch = () => {

  const [pets,setPets] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [selectedPetName, setSelectedPetName] = useState({});
  const [selectedPet, setSelectedPet] = useState(null); 
  const [petInfo, setPetInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pageTitle, setPageTitle] = useState('Tell us about your pet');

  const navigate = useNavigate();
  toast.configure({
    position: 'top-right',
  });

  const catBreeds = [
    { value: 'Select the Breed', label: 'Select the Breed' },
    { value: 'AmericanShortHair', label: 'American ShortHair' },
    { value: 'Birman', label: 'Birman' },
    { value: 'DevonRex', label: 'Devon Rex' },
    { value: 'DomesticLongShortHair', label: 'Domestic Long & Short Hair' },
    { value: 'ExoticShortHair', label: 'Exotic ShortHair' },
    { value: 'Himalayan', label: 'Himalayan' },
    { value: 'MaineCoon', label: 'Maine Coon' },
    { value: 'Mixed', label: 'Mixed' },
    { value: 'PersianCat', label: 'Persian Cat' },
    { value: 'RagDoll', label: 'RagDoll' },
    { value: 'ScottishFold', label: 'Scottish Fold' },
    { value: 'Siamese', label: 'Siamese' },
    { value: 'Sphynx', label: 'Sphynx' },
    { value: 'Unknown', label: 'Unknown' },
  ];
  
  const dogBreeds = [
    { value: 'Select the Breed', label: 'Select the Breed' },
    { value: 'BostonTerrier', label: 'Boston Terrier' },
    { value: 'Chihuahua', label: 'Chihuahua' },
    { value: 'Dachshund', label: 'Dachshund' },
    { value: 'FrenchBulldog', label: 'French Bulldog' },
    { value: 'GermanShepherdDog', label: 'German Shepherd Dog' },
    { value: 'Labradoodle', label: 'Labradoodle' },
    { value: 'LabradorRetriever', label: 'Labrador Retriever' },
    { value: 'Maltese', label: 'Maltese' },
    { value: 'Mixed', label: 'Mixed' },
    { value: 'Pomeranian', label: 'Pomeranian' },
    { value: 'Poodle', label: 'Poodle' },
    { value: 'Pug', label: 'Pug' },
    { value: 'ShihTzu', label: 'Shih Tzu' },
    { value: 'SiberianHusky', label: 'Siberian Husky' },
    { value: 'YorkshireTerrier', label: 'Yorkshire Terrier' },
  ];
  
  const petAge = [
    { value: 'Select the Pet Age', label: 'Select the Pet Age' },
    { value: '8 weeks - 11 months', label: '8 weeks - 11 months' },
    { value: '1 year', label: '1 year' },
    { value: '2 year', label: '2 year' },
    { value: '3 year', label: '3 year' },
    { value: '4 year', label: '4 year' },
    { value: '5 year', label: '5 year' },
    { value: '6 year', label: '6 year' },
    { value: '7 year', label: '7 year' },
    { value: '8 year', label: '8 year' },
    { value: '9 year', label: '9 year' },
    { value: '10 year', label: '10 year' },
    { value: '11 year', label: '11 year' },
    { value: '12 year', label: '12 year' },
    { value: '12 year+', label: '12 year+' },
  ];

  const handlePetAgeChange = (age) => {
    setSelectedAge(age);
  };

  const handlePetTypeChange = (type) => {
    setSelectedPetType(type);
    setSelectedBreed(''); 
  };

  const handlePetGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
  };

  const handleGetQuotesClick = async () => {
    if (!selectedAge || !selectedPetType || !selectedGender || !selectedBreed) {
      toast.error('Please select all the values before getting a quote.');
      return;
    }
  
    try {
      const response = await axios.get(`${getAllInsurancePlansRoute}?age=${selectedAge}`);
      const plans = response.data;
  
      if (Array.isArray(plans) && plans.length > 0) {
        const groupedPlans = groupPlansByCompany(plans);
        const selectedPlans = extractSixResults(groupedPlans);
        console.log("Selected Plans: ", selectedPlans)
        navigate('/insurances', { state: { filteredPlans: selectedPlans } });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.warning('No insurance plans found for the selected age.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data.');
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

const handlePetSelection = async (petName) => {
  const selectedPetData = pets.find((pet) => pet.PetName === petName);
  setSelectedPet(selectedPetData);
  
  // Fetch pet information when a pet is selected
   await fetchPetInfo(selectedPetData);
   setPageTitle(`About Pet ${selectedPetData.PetName}`);

};

const fetchPetInfo = async (selectedPetData) => {
  try {
    const response = await axios.get(`${getPetByIdRoute}/${selectedPetData._id}`);
    const petInfoData = response.data;
    setPetInfo(petInfoData);
    
    // Autofill the form fields with the fetched pet information
    // setSelectedAge(petInfoData.age);
    setSelectedPetType(petInfoData.Species);
    setSelectedGender(petInfoData.Gender);
    setSelectedBreed(petInfoData.Breed);
  } catch (error) {
    console.error("Error fetching pet info:", error);
  }
};
//to fetch pet data
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
      if (!selectedPetName && response.data.length > 0) {
        setSelectedPetName(response.data[0]);
        // setSelectedOptions(response.data[0].PreExistingMedical.split(","));
        //
      }

      console.log("sort data");
      // setSort(true);
    } catch (error) {
      // Handle any errors here
    }
  };

  // Fetch data when the component mounts
  fetchData();
}, []);

  return (
    <div>
      <div>
        <Header id="top"></Header>
      </div>

      <Typography variant="h1-poppins-semibold" color="almost-black">
        <div style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%" }}>
          Select the pet you would like to get quotes
        </div>
      </Typography>

      <div className={styles.petSelectionContainer}>
        {pets &&
          Array.isArray(pets) &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petItem}>
              <PetSelectionInsurance
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


      

      <div className={styles.formContainer}>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          <div
            style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%" }}>
            {pageTitle}  
            </div>
        </Typography>

        <div style={{ margin: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            Type of Pet
          </Typography>
          <ButtonGroup groupId="group1" buttons={["Cat", "Dog"]} onClick={handlePetTypeChange} selected={selectedPetType} />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            Pet's gender
          </Typography>

          <ButtonGroup groupId="group2" buttons={["Male", "Female"]} onClick={handlePetGenderChange} selected={selectedGender} />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            Pet's age
          </Typography>
          <Dropdown
            key="ageDropdown"
            value={selectedAge}
            onChange={handlePetAgeChange}
            // defaultValue="Select an Age" 
            options={petAge}
            placeholder="Select an Age"
            required={true} 
            size="ml"
      />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <div>
            <Typography variant="body2-poppins-medium" color="almost black">
              Select Breed
            </Typography>
            <Dropdown
              key="breedDropdown"
              value={selectedBreed}
              onChange={handleBreedChange}
              placeholder="Select a breed"
              // defaultValue="Select a breed"
              options={selectedPetType === 'Cat' ? catBreeds : dogBreeds}
              size="ml"
            />
        </div>
     

        </div>

        <div style={{ width: "300px" }}>
          <Button variant="yellow" size="dk-md" label="Get Quotes"
            onClick={handleGetQuotesClick} 
          />
        </div>

      </div>
    </div>
  );
};

export default InsuranceSearch;