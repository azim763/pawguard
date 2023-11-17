import React from 'react';
import styles from "./ImageDisplay.module.css"

function ImageDisplay({ PetImageData, defaultImage }) {
  return (
    <div className={styles.imageContainer}>
      {PetImageData ? (
        <img className={styles.imageDisplay} src={`data:image/jpeg;base64,${PetImageData}`} alt="Uploaded" />
      ) : (
        <img className={styles.imageDisplay} src={defaultImage} alt="Default" />
      )}
    </div>
  );
}

export default ImageDisplay;
