import React from 'react'

const PetProfileIndividual = ({imgUrl,headerTxt,link}) => {
  return (
    <div className='petProfileCard'>
        <div>
            <img src={imgUrl} alt={headerTxt+ "image"} />
            <h2>{headerTxt}</h2>
            <a href={link}> Visit</a>
        </div>
    </div>
  )
}

export default PetProfileIndividual
