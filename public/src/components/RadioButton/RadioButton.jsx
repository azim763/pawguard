import React from 'react'

const RadioButton = ({ label, checked, onChange }) => {
    const handleRadioChange = () => {
        onChange(!checked);
      };
  return (
    <div>
     <label>
       <input
         type="radio"
         checked={checked}
         onChange={handleRadioChange}
       />
      {label}
     </label>
      
    </div>
  )
}

export default RadioButton
