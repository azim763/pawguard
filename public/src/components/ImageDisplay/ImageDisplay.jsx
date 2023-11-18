import React from 'react';
import styles from "./ImageDisplay.module.css";
import ImageSVG from '../SVG/ImageSVG';

function ImageDisplay({ PetImageData, defaultImage }) {
  return (
    <div className={styles.imageContainer}>
      {PetImageData ? (
        <img className={styles.imageDisplay} src={`data:image/jpeg;base64,${PetImageData}`} alt="Uploaded" />
      ) : (
        // <img className={styles.imageDisplay} src={defaultImage} alt="Default" />
        <ImageSVG />
      )}
    </div>
  );
}

export default ImageDisplay;
