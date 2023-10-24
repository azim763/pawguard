import React from 'react'
import Logo from '../../assets/logo.svg';
import styles from './PetCard.module.css'
import Typography from '../Typography/Typography';
const PetCard = ({ src, petBreed, petAge, petHeight, petWeight }) => {
    return (
        // Logos are a hard coded dont need it dynamically
        <div className='petCard'>
            <img src={src} alt={petBreed+ "image"} className={styles.image} />
            <div>
                <img src={Logo} alt="breed Logo" className={styles.logo}  />
                <p>Breed</p>
                <h3>{petBreed}</h3>
            </div>
            <div>
                <img src={Logo} alt="breed Logo"  className={styles.logo}/>
                <p>Age</p>
                <h3>{petAge}</h3>
            </div>
            <div>
                <img src={Logo} alt="breed Logo" className={styles.logo}/>
                <p>Height</p>
                <h3>{petHeight}</h3>
            </div>
            <div>
                <img src={Logo} alt="breed Logo" className={styles.logo}/>
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
