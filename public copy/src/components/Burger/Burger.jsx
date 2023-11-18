import React,{useState} from 'react'
import styles from "../Burger/Burger.module.css"

const Burger = ({open,toggleMenu }) => {
   
  return (
    <div className={styles.Burger} open={open} onClick={toggleMenu}>
      <div  />
      <div  />
      <div  />

   
    </div>
  )
}

export default Burger
