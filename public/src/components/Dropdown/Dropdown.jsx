import Typography from "../Typography/Typography";
import styles from "./Dropdown.module.css";

const Dropdown = ({
  label,
  id,
  onChange,
  value,
  variant,
  size,
  setSelectedOption,
  defaultValue,
  options,
  required
}) => {
  
  const handleOnChange = (event) => {
    onChange(event.target.value);
  };


  return (
    <div>
      <Typography variant="body2-poppins-medium"><label htmlFor={id}>{label}</label></Typography>
      <select
        className={`${styles[variant]} ${styles[size]} ${styles["dropdown"]}`}
        id={id}
        name={id}
        value={value}
        onChange={handleOnChange}
        required={required}
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
    </div>
  );
};

export default Dropdown;
