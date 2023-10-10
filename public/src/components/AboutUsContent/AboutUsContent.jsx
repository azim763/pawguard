import React from 'react'

const AboutUsContent = (src,alt,title,description) => {
  return (
    <div>
        <img src={src} alt={alt}></img>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default AboutUsContent
