import React, { useState, useEffect } from "react";
import Downshift from "downshift";

const AutocompleteClinic = ({ clinicInfo, handleSelection }) => {
  // Use a Set to keep track of unique clinic cities
  const uniqueCities = [...new Set(clinicInfo.map(item => item.City))];

  return (
    <Downshift
      onChange={(selection) => handleSelection(selection)} // Set the onChange handler here
      itemToString={(item) => (item ? item.City : "")}
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
            <input {...getInputProps()} />
          </div>
          <ul {...getMenuProps()}>
            {isOpen &&
              uniqueCities
                .filter(
                  (city) =>
                    !inputValue ||
                    city.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((city, index) => (
                  <li
                    {...getItemProps({
                      index,
                      item: { City: city }, // Create an object with the City property
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === city ? "bold" : "normal",
                      },
                    })}
                    key={index}
                  >
                    {city}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default AutocompleteClinic;