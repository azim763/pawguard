import React from 'react';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import styles from '../TotalPets/TotalPets.module.css';

const TotalPets = ({ pets, selectedPet, onPetSelect }) => {
  return (
    <div className={styles.totalPets}>
      {pets.map((pet, index) => (
        <div
          key={index}
          className={`${selectedPet === pet ? styles.active : ''}`}
          onClick={() => onPetSelect(pet)}
        >
          <ImageDisplay PetImageData={pet.PetImageName} />
        </div>
      ))}
    </div>
  );
}

export default TotalPets;
