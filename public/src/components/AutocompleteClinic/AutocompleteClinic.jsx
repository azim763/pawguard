import React, { useState } from "react";
import Downshift from "downshift";
import Typography from "../Typography/Typography";

const AutocompleteClinic = ({ clinicInfo, handleSelection }) => {
  // Use a Set to keep track of unique clinic cities
  const uniqueCities = [...new Set(clinicInfo.map((item) => item.City))];
  const [inputValue, setInputValue] = useState("");

  return (
    <Downshift
      onChange={(selection) => handleSelection(selection)}
      onInputValueChange={(input) => {
        setInputValue(input);
        if (input === "") {
          handleSelection(null);
        }
      }}
      itemToString={(item) => (item ? item.City : "")}
      inputValue={inputValue}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue: downshiftInputValue,
        selectedItem,
        highlightedIndex,
        getRootProps,
        clearSelection,
      }) => (
        <div>
          <div {...getRootProps({}, { suppressRefError: true })}>
            <Typography variant="textfield-poppins-regular">
              <input
                {...getInputProps({
                  placeholder: "E.g. Vancouver",
                  value: downshiftInputValue,
                  onChange: (e) => {
                    const newInputValue = e.target.value;
                    setInputValue(newInputValue);
                    if (newInputValue === "") {
                      clearSelection();
                    }
                  },
                })}
                style={{
                  width: "100%",
                  height: "54px",
                  borderRadius: "8px",
                  padding: "0 12px",
                  border: "1px solid var(--almost-black)",
                }}
              />
            </Typography>
          </div>
          <ul {...getMenuProps()}>
            {isOpen &&
              uniqueCities
                .filter(
                  (city) =>
                    !downshiftInputValue ||
                    city
                      .toLowerCase()
                      .includes(downshiftInputValue.toLowerCase())
                )
                .map((city, index) => (
                  <li
                    {...getItemProps({
                      index,
                      item: { City: city },
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
