import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Graph from '../../components/Graph/Graph'
import TotalPets from '../../components/TotalPets/TotalPets'
import Header from '../../components/Header/header'
import {
  searchPetsByUserIDRoute,
} from "../../utils/APIRoutes.js";
import FoodForm from '../../components/PetLogForm/FoodForm/FoodForm.jsx'
import PetSelectionIndividualCard from '../../components/PetSelectionIndividualCard/PetSelectionIndividualCard.jsx'

const Home = () => {
  const [selectedPet, setSelectedPet] = useState(null);

  

  const pets = [
    { imgUrl: 'image1.jpg', petName: 'Pet 1' },
    { imgUrl: 'image2.jpg', petName: 'Pet 2' },
    { imgUrl: 'image3.jpg', petName: 'Pet 3' },
  ];
  const handleSelectPet = (petName) => {
    if (selectedPet === petName) {
      // Deselect the current selection
      setSelectedPet(null);
    } else {
      // Select the clicked pet
      setSelectedPet(petName);
    }
  };
  return (
    <div>
      {/* {pets && <TotalPets pets={pets}></TotalPets>} */}
      <Header></Header>
      <FoodForm></FoodForm>
      <div>
      {pets.map((pet, index) => (
        <PetSelectionIndividualCard
          key={index}
          imgUrl={pet.imgUrl}
          petName={pet.petName}
          isSelected={selectedPet === pet.petName}
          onSelect={handleSelectPet}
        />
      ))}
    </div>  
      </div>
  )
}

export default Home
