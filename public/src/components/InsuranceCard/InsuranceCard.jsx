import React  from "react";
import styles from './insuranceCard.module.css';
import Typography from "../Typography/Typography";

function InsuranceCard({title,text,subtitle,body}){
    return(
        <div className={styles.cardContainer}>
            <div className="card-title">
            <Typography variant="sub-poppins-medium" color="almost-black">
                {title}
            </Typography>
            <div className={styles.titleBody}>
            <Typography variant="body2-poppins-medium" color="almost-black">
                {text}
            </Typography>
            </div>
            </div>
            <div className={styles.cardBody}>
                <Typography variant="sub-poppins-medium" color="almost-black">
                    {subtitle}
                </Typography>
                    <Typography variant="body2-poppins-medium" color="almost-black">
                    <div className={styles.bodyText}>
                        {body}
                    </div>
                    </Typography>
                
            </div> 
        </div>
    )
}
export default React.memo(InsuranceCard);

// to use the card component :-

// <InsuranceCard
//     title=""
//     text=""
//     subtitle=""
//     body=""
// />