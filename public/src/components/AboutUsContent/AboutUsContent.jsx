import React from 'react'
import Image from '../Image/image'

const AboutUsContent = (src,alt,title,description) => {
  return (
    <div>
        <Image src={src} alt={alt}></Image>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default AboutUsContent
