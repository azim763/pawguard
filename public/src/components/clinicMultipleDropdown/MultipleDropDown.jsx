import React, { useState, useEffect } from "react";
import styles from "./multiDropDown.module.css";
import Multiselect from "multiselect-react-dropdown";

function Asd({ options }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    if (selectedValues.length === 0) {
      setShowPlaceholder(true);
    } else {
      setShowPlaceholder(false);
    }
  }, [selectedValues]);
  
  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };


  return (
    <div className={styles.container}>
      <h3>Specialties</h3>
      <Multiselect
        className={styles.dropdown}
        isObject={false}
        options={options}
        showCheckbox
        closeIcon="cancel"
        placeholder={showPlaceholder ? "Select the Speciality" : ""}
        showArrow="true"
        style={{
          placeholder: {
            fontSize: "15px",
          },
          chips: {
            background: "rgb(0,0,128)",
            fontSize: "18px",
            fontWeight: "bold",
            display: "inline-block",
            marginLeft: "5px",
          },
          multiselectContainer: {
            color: "black",
            display: "inline-block",
            margin: "0",
            height: "auto",
            width: "550px",
          },
          searchBox: {
            fontSize: "20px",
            border: "2px solid black",
            height: "auto",
            borderRadius: "5px",
            width: "500px",
          },
          optionContainer: {
            maxHeight: "500px",
          },
        }}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default Asd;



// To use teh component do foll
/*
install this :- npm install npm install react-multi-select-component
then do foll:-
## define values:-
const specialities = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5'
];
## now call:-
 <Asd options={specialities} />
*/