import React from 'react'
import styles from "./button.module.css";

  const Button = ({
    variant,
    size,
    label,
    onClickHandler,
    hoverable,
    children,
    ...props
  }) => {

  return (
    <button  
    className={`${styles[variant]} ${styles[size]} ${styles["button"]} ${
      hoverable && styles["hover"]
    }`}
    onClick={onClickHandler}
    {...props}
  >
    {label ? label : children}
    </button>
  )
}

export default React.memo(Button);
