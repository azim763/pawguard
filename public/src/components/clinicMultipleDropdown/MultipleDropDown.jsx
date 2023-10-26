
import React, { useState, useEffect, useRef } from 'react';
import styles from './multiDropDown.module.css';
import Multiselect from 'multiselect-react-dropdown';

export default function Asd({
   options
}) {
  const [selectedValues, setSelectedValues] = useState([]);


  return (
    <div className={styles.container}>
      <h3>Specialties</h3>
      <Multiselect
        isObject={false}
        options={options}
        selectedValues={selectedValues}
        onSelect={(selectedList) => {
          setSelectedValues(selectedList);
        }}
        onRemove={(selectedList) => {
          setSelectedValues(selectedList);
        }}
        showCheckbox
        closeIcon="cancel"
        showArrow="true"
        style={{
          placeholder: {
            display: 'none',  // Hide the placeholder
            fontSize: '15px'
          },
          chips: {
            background: 'rgb(0,0,128)',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginLeft: '5px'
          },
          multiselectContainer: {
            color: 'black',
            display: 'inline-block',
            margin: '0',
            height: 'auto',
            width: '550px'
          },
          searchBox: {
            fontSize: '20px',
            border: '2px solid black',
            height: 'auto',
            borderRadius: '5px',
            width: '500px'
          },
          optionContainer: {
            maxHeight: '500px'
          }
        }}
      />
    </div>
  );
}



// to use in pages:-

// import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";
// <MultipleDropDown options={["1", "1-3 years old", "4-6 years old", "+ 7 years old"]} />
