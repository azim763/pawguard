import React from 'react'
import Logo from '../../assets/logo.svg';
const PetCard = ({  petBreed, petAge, petHeight, petWeight }) => {
    return (
        <div className='petCard'>
            <img src={Logo} alt={petBreed+ "image"} style={{height:"3rem"}}/>
            <div>
                <img src={Logo} alt="breed Logo"  style={{height:"1rem"}} />
                <p>Breed</p>
                <h3>{petBreed}</h3>
            </div>
            <div>
                <img src={Logo} alt="breed Logo"  style={{height:"1rem"}}/>
                <p>Age</p>
                <h3>{petAge}</h3>
            </div>
            <div>
                <img src={Logo} alt="breed Logo"  style={{height:"1rem"}} />
                <p>Height</p>
                <h3>{petHeight}</h3>
            </div>
            <div>
                <img src={Logo} alt="breed Logo"   style={{height:"1rem"}}/>
                <p>Weight</p>
                <h3>{petWeight}</h3>
            </div>

            <div className='petCard_Additional_functionality'>
                <div>
                    <img src={Logo} alt="edit Logo"  style={{height:"1rem"}} />
                    <p>edit </p>
                </div>
                <div>
                    <img src={Logo} alt="archive Logo"   style={{height:"1rem"}}/>
                    <p>archive </p>
                </div>
                <div>
                    <img src={Logo} alt="export Logo"  style={{height:"1rem"}} />
                    <p>export</p>
                </div>
            </div>


        </div>
    )
}

export default PetCard
