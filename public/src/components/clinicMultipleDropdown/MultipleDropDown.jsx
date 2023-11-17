import React, { useState, useEffect, useRef } from "react";
import styles from "./multiDropDown.module.css";
import Multiselect from "multiselect-react-dropdown";
import Typography from "../Typography/Typography";

export default function MultipleDropDown({
  options,
  label,
  onSelect,
  selectedValues,
  placeholder,
}) {
  const handleSelectionChange = (selectedList) => {
    onSelect(selectedList);
  };

  return (
    <div className={styles.container}>
      <Typography variant="body2-poppins-medium">{label}</Typography>
      <Multiselect
        isObject={false}
        options={options}
        selectedValues={selectedValues}
        onSelect={handleSelectionChange}
        onRemove={handleSelectionChange}
        showCheckbox
        closeIcon="cancel"
        showArrow="true"
        placeholder={placeholder}
        style={{
          placeholder: {
            display: "none", // Hide the placeholder
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "19.4px",
          },
          chips: {
            color: "var(--dark-blue)",
            backgroundColor: "var(--accent-blue)",
            fontSize: "18px",
            // display: 'inline-block',
            margin: "0px",
            borderRadius: '8px',
            padding: '8px',
          },
          multiselectContainer: {
            color: "black",
            display: "inline-block",
            margin: "0",
            marginTop: "7px",
            height: "auto",
            // paddingLeft: "5px",
          },
          searchBox: {
            // fontSize: "20px",
            border: "1px solid var(--almost-black) ",
            minHeight: "54px",
            borderRadius: "8px",
            backgroundColor: "white",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "19.4px",
            display: "flex",
            flexFlow: "wrap",
            padding: "12px"
          },
          optionContainer: {
            maxHeight: "500px",
          },
        }}
      />
    </div>
  );
}

// to use in pages:-

// import MultipleDropDown from "../../components/clinicMultipleDropdown/MultipleDropDown";
// <MultipleDropDown options={["1", "1-3 years old", "4-6 years old", "+ 7 years old"]} />
