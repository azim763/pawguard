import React from 'react'
import styles from "../AboutUsContent/AboutUsContent.module.css"


const AboutUsContent = ({src,alt,title,description}) => {
  return (
    <div className={styles.AboutUsContent}>
        <img src={src} alt={alt}></img>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default AboutUsContent
