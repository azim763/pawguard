import React, { useState } from 'react';
import styles from './petSelection.module.css';

const PetSelectionPage = ({ imgUrl, petName }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleImageClick = () => {
      setIsSelected(!isSelected);
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

export default PetSelectionPage;
