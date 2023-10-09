import React from 'react'
import Logo from '../Logo/Logo'
import styles from './header.module.css';
import Typography from '../Typography/Typography'



const header = () => {
    return (
        <nav className={styles.nav}>
            <Typography variant="body1-poppins-semibold" >

                <Logo></Logo>
                <ul>
                    <li>Home</li>
                    <li>My Pets</li>
                    <li>Clinics</li>
                    <li>Insurance</li>
                    <li>{Logo}</li>
                </ul>
            </Typography>


        </nav>
    )
}

export default header
