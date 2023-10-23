import Typography from "../Typography/Typography";
import styles from "./Dropdown.module.css";

const Dropdown = ({
  label,
  key,
  onChange,
  value,
  variant,
  size,
  setSelectedOption,
  defaultValue,
  options
}) => {
  
  const handleOnChange = (event) => {
    onChange(event.target.value);
  };


  return (
    <>
      <Typography variant="body2-poppins-medium"><label htmlFor={key}>{label}</label></Typography>
      <select
        className={`${styles[variant]} ${styles[size]} ${styles["dropdown"]}`}
        id={key}
        name={key}
        value={value}
        onChange={handleOnChange}
      >
        {defaultValue && (
          <option value="defaultValue" disabled selected>
            {defaultValue}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
