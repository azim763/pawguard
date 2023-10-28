import React ,{useState, useEffect}from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import PetSelectionPage from "../../components/PetSelection/PetSelection";
import styles from "./insuranceSearch.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {getAllInsurancePlansRoute} from "../../utils/APIRoutes";

const InsuranceSearch = () => {
  const [pets,setPets] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [filteredInsurancePlans, setFilteredInsurancePlans] = useState([]);
  const navigate = useNavigate();

  const catBreeds = [
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
    setSelectedBreed(''); // Reset the selected breed when the pet type changes
  };

  const handlePetGenderChange = (gender) => {
    setSelectedGender(gender);
    // setSelectedBreed(''); // Reset the selected breed when the pet type changes
  };

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
  };

  const handleGetQuotesClick = () => {
    if (selectedAge) {
      axios
        .get(`${getAllInsurancePlansRoute}?age=${selectedAge}`)
        .then((response) => {
          const filteredPlans = response.data;
  
          // Sort the plans based on a criterion, e.g., InsurancePrice
          filteredPlans.sort((planA, planB) => planA.InsurancePrice - planB.InsurancePrice);
  
          navigate('/insurances', { state: { filteredPlans } }); // Navigate to the correct route
        })
        .catch((error) => {
          console.error("Error fetching insurance plans:", error);
        });
    } else {
      alert("Please select an age before getting a quote.");
    }
  };
  
// const handleGetQuotesClick = () => {
//   if (selectedPetType && selectedAge && selectedGender) {
//     axios
//       .get(`${getAllInsurancePlansRoute}?age=${selectedAge}`)
//       .then((response) => {
//         const filteredPlans = response.data.filter((plan) => {
//           return  plan.PetAgeRange === selectedAge;
//         });

//         filteredPlans.sort((planA, planB) => planA.InsurancePrice - planB.InsurancePrice);
        
//         navigate('/insurances', { state: { filteredPlans } }); // Pass filteredPlans to ListInsurances component
//         console.log("CHK THIS IF THIS IS PASSED"+filteredPlans);
//       })
//       .catch((error) => {
//         console.error("Error fetching insurance plans:", error);
//       });
//   } else {
//     alert("Please select all fields before getting a quote.");
//   }
// };


  // const handleGetQuotesClick = () => {
  //   if (selectedPetType && selectedAge && selectedGender) {
  //     axios
  //       .get(`${getAllInsurancePlansRoute}?age=${selectedAge}`)
  //       .then((response) => {
  //         const filteredPlans = response.data.filter((plan) => {
  //           return (
  //             plan.PetType === selectedPetType &&
  //             // plan.breed === selectedBreed &&
  //             plan.PetAgeRange === selectedAge 
  //             // plan.gender === selectedGender
  //           );
  //         });

  //         filteredPlans.sort((planA, planB) => planA.InsurancePrice - planB.InsurancePrice);
  //         const middleIndex = Math.floor(filteredPlans.length / 2);
  //         const middlePlan = filteredPlans[middleIndex];
  
  //         navigate('/insurances', { state: { filteredPlans: [middlePlan] } });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching insurance plans:", error);
  //       });
  //   } else {
  //     alert("Please select all fields before getting a quote.");
  //   }
  // };
  
    // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userData = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  //       const userID = userData.UserID;

  //       const userPetsResponse = await axios.get(searchPetsByUserIDRoute, { params: { userID } });
  //       setPets(userPetsResponse.data);
  //       } catch (error) {
  //         console.error("Error fetching pet data:", error);
  //       }
  //     };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchInsurancePlans = async () => {
      try {
        const response = await axios.get(getAllInsurancePlansRoute);
        setInsurancePlans(response.data);
        // console.log("fetch  data "+ response.data);
      } catch (error) {
        console.error("Error fetching insurance plans:", error);
      }
    };
    fetchInsurancePlans();
  }, []);

  return (
    <div>
      <div>
        <Header></Header>
      </div>

      <Typography variant="h1-poppins-semibold" color="almost-black">
        <div
          style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%" }}
        >
          Select the pet you would like to get quotes
        </div>
      </Typography>
      <Typography variant="sub-h2-poppins-medium" color="almost-black">
        <div
          style={{
            textAlign: "center",
            textDecoration: "underline",
            marginBottom: "2%",
          }}
        >
          <p>Enter new pet's information</p>
          {/* <a href = "" style = {{color: "var(--almost-black)"}}>Enter new pet's information</a> */}
        </div>
      </Typography>

      <div className={styles.petSelectionContainer}>
      {pets.map((pet) => (
          <PetSelectionPage
            key={pet.UserID}
            imgUrl={pet.imageUrl} 
            petName={pet.name} 
          ></PetSelectionPage>
        ))}
      </div>

      <div className={styles.formContainer}>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            About Pet Milo
          </div>
        </Typography>

        <div style={{ marginBottom: "40px" }}>
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
            defaultValue="Select an Age" 
            options={petAge}
            placeholder="Select an Age"
            required={true} 
            size="large"
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
              defaultValue="Select a breed"
              options={selectedPetType === 'Cat' ? catBreeds : dogBreeds}
              size="large"
            />
        </div>
     

        </div>

        {/* <div style={{ marginBottom: "40px" }}>
          <Typography variant="body2-poppins-medium" color="almost black">
            What is your ZIP code
          </Typography>
          <TextInput />
        </div> */}

        <div style={{ width: "300px" }}>
          <Button variant="yellow" size="dk-md" label="Get Quotes"
            onClick={handleGetQuotesClick} 
          />
        </div>

        {/* <div>
          {filteredInsurancePlans.map((plan) => (
            <div key={plan._id}>
              <p>Plan Name: {plan.PlanName}</p>
              <p>Price: {plan.InsurancePrice}</p>
              <p>Annual Deductibel: {plan.AnnualDeductible}</p>
              <p>Reimbursement: {(plan.Reimbursement)*100}</p>
              <p>Annual Coverage: {plan.AnnualCoverage}</p>
              <p>Insurance Price: {plan.InsurancePrice}</p>
              <p>Covered Items: {plan.CoveredItems}</p>
              <p>Not Covered Items: {plan.NotCoveredItems}</p>

             </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default InsuranceSearch;
