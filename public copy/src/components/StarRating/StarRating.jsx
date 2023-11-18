import React from 'react';
import StarFullSVG from '../SVG/StarFullSVG';
import StarHalfSVG from '../SVG/StarHalfSVG';
import StarEmptySVG from '../SVG/StarEmptySVG';
import styles from "./starRating.module.css"

const StarRating = ({ rating }) => {
  // Function to generate star elements based on the rating value
  const renderStars = () => {
    const roundedRating = Math.round(rating * 2) / 2; 
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        // Filled star
        stars.push(<StarFullSVG width="22" height="22" />);
      } else if (i - 0.5 === roundedRating) {
        // Half star
        stars.push(<StarHalfSVG width="22" height="22" />);
      } else {
        // Empty star
        stars.push(<StarEmptySVG width="22" height="22"  />);
      }
    }
    return stars;
  };

  return <div className={styles.starRatingContainer}>{renderStars()}</div>;
};

export default StarRating;
