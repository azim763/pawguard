import React, { useState, useEffect } from "react";
import Downshift from "downshift";
import Typography from "../Typography/Typography";
import styles from "./autoCompleteTextfield.module.css";

const AutocompleteComponent = ({ clinicData, handleSelection }) => {
  return (
    <Downshift
      onChange={(selection) => handleSelection(selection)} // Set the onChange handler here
      itemToString={(item) => (item ? item.Name : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
        getRootProps,
      }) => (
        <div>
          <div {...getRootProps({}, { suppressRefError: true })}>
            <Typography variant="textfield-poppins-regular">
              <input
                {...getInputProps({
                  placeholder: "Enter Clinic Name",
                })}
                className={styles.autocompleteComponent}
                // style={{
                //   width: "325px",
                //   height: "54px",
                //   borderRadius: "8px",
                //   borderColor: "var(--almost-black)",
                //   padding: "0 12px",
                // }}
              />
            </Typography>
          </div>
          <ul style={{ marginBottom: "0" }} {...getMenuProps()}>
            {isOpen &&
              clinicData
                .filter(
                  (item) =>
                    !inputValue ||
                    item.Name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal",
                      },
                    })}
                    key={index}
                  >
                    {item.Name}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default AutocompleteComponent;
