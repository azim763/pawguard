import React, { useState } from 'react';
import styles from './petSelection.module.css';

const PetSelection = ({ imgUrl, petName, isSelected, onClick }) => {
  const containerClassName = isSelected
    ? `${styles.petSelection} ${styles.selected}`
    : styles.petSelection;

  const handleImageClick = () => {
    onClick();
  };

  return (
    <div className={containerClassName} onClick={handleImageClick}>
      <img src={imgUrl} alt={petName + ' image'} />
      <p>{petName}</p>
    </div>
  );
};

export default PetSelection;
