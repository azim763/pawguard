import React from 'react';
import styles from "./ImageDisplay.module.css"

function ImageDisplay({ PetImageData, defaultImage }) {
  return (
    <div className={styles.imageContainer}>
      {PetImageData ? (
        <img className={styles.imageDisplay} src={`data:image/jpeg;base64,${PetImageData}`} alt="Uploaded" />
      ) : (
        <img className={styles.imageDisplay} src="https://www.svgrepo.com/download/36511/dog.svg" alt="Default" />
      )}
    </div>
  );
}

export default ImageDisplay;
