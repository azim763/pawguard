import React from 'react';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import styles from '../TotalPets/TotalPets.module.css';

const TotalPets = ({ pets, onPetSelect }) => {
  return (
    <div className={styles.totalPets}>
      {pets.map((pet, index) => (
        <div
          key={index}
          className={styles.petCard}
          onClick={() => onPetSelect(pet)}
        >
          <ImageDisplay PetImageData={pet.PetImageName} />
        </div>
      ))}
    </div>
  );
}

export default TotalPets;
