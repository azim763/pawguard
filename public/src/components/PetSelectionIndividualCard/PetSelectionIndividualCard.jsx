import React from 'react';
import styles from './PetSelectionIndividualCard.module.css';

const PetSelectionIndividualCard = ({ imgUrl, petName, isSelected, onSelect }) => {
  const handleImageClick = () => {
    onSelect(petName); // Call the onSelect callback with the petName when the image is clicked
  };

  const containerClassName = isSelected
    ? `${styles.petSelection} ${styles.selected}`
    : styles.petSelection;

  return (
    <div className={containerClassName} onClick={handleImageClick}>
      <img src={imgUrl} alt={petName + ' image'} />
      <p>{petName}</p>
    </div>
  );
};

export default PetSelectionIndividualCard;
