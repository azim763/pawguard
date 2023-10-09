import styles from "./Dropdown.module.css";

const Dropdown = ({
  key,
  value,
  onChange,
  options,
  variant,
  size,
  selectedOption,
  setSelectedOption,
}) => {

  const handleOnChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <select
        className={`${styles[variant]} ${styles[size]} ${styles["dropdown"]}`}
        id={key}
        name={key}
        value={value}
        onChange={onChange}
      >
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
