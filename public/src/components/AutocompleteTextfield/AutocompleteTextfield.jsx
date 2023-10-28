import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';

const AutocompleteComponent = ({ clinicData, handleSelection }) => {
  return (
    <Downshift
      onChange={(selection) => handleSelection(selection)} // Set the onChange handler here
      itemToString={(item) => (item ? item.Name : '')}
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
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
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
