import React, {useState, useEffect} from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import styles from "./listInsurances.module.css";
//for fetching details from db
import {getAllInsurancePlansRoute} from "../../utils/APIRoutes";
import axios from "axios";
//for functioning of the button
import { useNavigate } from "react-router-dom";

//to make get request to fetch data 
const ListInsurances = () => {
  const [insurancePlans, setInsurancePlans] = useState([]);
  const navigate = useNavigate();
  
  
  useEffect( () => {
    // Make a GET request to fetch insurance plans
    axios.get(getAllInsurancePlansRoute) 
      .then((response) => {
        setInsurancePlans(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching insurance plans:", error);
      });
  }, []);

  const handleViewDetailsClick = (companyId) => {
    //method to navigate to the details page
    navigate(`/insurance/details/${companyId}`);
  };

 
  

  return (
    <div>
      <Header></Header>
      <div className={styles.ListInsurances}>
        <Typography variant="h1-poppins-semibold" color="almost-black">
          Plans Recommend for you
        </Typography>
        {/* <Asd options={specialities} /> */}


        <div className={styles.ListInsurancesBody}>
        {insurancePlans.map((plan) => (
            <PlanDetailCard
            source="https://picsum.photos/200/200"
            alt="logo"
            key={plan._id}//this key will be used button is clicked to view details
              // source={plan.source}
              // alt={plan.alt}
            deductibleNum={plan.AnnualDeductable}
            reimbursementNum={plan.Reimbursement}
            coverageNum={plan.AnnualCoverage}
            price={plan.InsurancePrice}
            companyId={plan.CompanyID} 
            onClick={() => handleViewDetailsClick(plan._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListInsurances;
