import React from "react";
import PetSelection from "../PetSelection/PetSelection";
import Button from "../Button/Button";

const PetSelectionWithButton = ({ imgUrl, headerTxt }) => {
  return (
   <div>
    <PetSelection imgUrl={imgUrl} petName={headerTxt}></PetSelection>
    <Button variant="pet-profile-btn" label="Visit" />

   </div>
  );
};

export default PetSelectionWithButton;
