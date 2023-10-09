import React  from "react";
import './insuranceCard.module.css';

function InsuranceCard({title,text,subtitle,body}){
    return(
        <div className="card-container">
            <div className="card-title">
                <h3>{title}</h3>
                <h5>{text}</h5>
            </div>
            <div className="card-body">
                <h4>{subtitle}</h4>
                <p>{body}</p>   
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