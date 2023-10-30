import React, {useState, useEffect} from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import styles from "./listInsurances.module.css";
//for fetching details from db
import {getAllInsurancePlansRoute} from "../../utils/APIRoutes";
import axios from "axios";
//for functioning of the button
import { useNavigate, useLocation } from "react-router-dom";

//to make get request to fetch data 
const ListInsurances = () => {
  const navigate = useNavigate();

  const location = useLocation(); // Initialize location
  // const { filteredPlans } = location.state || {}; 
  const filteredPlans = location.state.filteredPlans;

  const [InsurancePlans, setInsurancePlans]= useState('');
  // console.log(filteredPlans);

  
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

  const handleViewDetailsClick = (_id) => {
    //method to navigate to the details page
    // console.log("This is provided to next page"+CompanyID);
    console.log("This is provided to or next page"+_id);
    navigate(`/insurance/details/${_id}`);
  };

  return (
    <div>
      <Header></Header>
      <div className={styles.ListInsurances}>
        <Typography variant="h1-poppins-semibold" color="almost-black">
          Plans Recommend for you
        </Typography>

        <div className={styles.ListInsurancesBody}>

        {filteredPlans.map((plan) => (
            <PlanDetailCard
              source="https://picsum.photos/200/200"
              alt="logo"
              key={plan._id}
              deductibleNum={plan.AnnualDeductible}
              reimbursementNum={(plan.Reimbursement)*100}
              coverageNum={plan.AnnualCoverage}
              price={plan.InsurancePrice}
              CompanyID={plan.CompanyID}
              onClick={() => handleViewDetailsClick(plan._id)}
            />
          ))}
        {/* {insurancePlans.map((plan) => (
            <PlanDetailCard
            source="https://picsum.photos/200/200"
            alt="logo"
            key={plan._id}//this key will be used button is clicked to view details
              // source={plan.source}
              // alt={plan.alt}
            deductibleNum={plan.AnnualDeductible}
            reimbursementNum={plan.Reimbursement}
            coverageNum={plan.AnnualCoverage}
            price={plan.InsurancePrice}
            CompanyID={plan.CompanyID} 
            onClick={() => handleViewDetailsClick(plan.CompanyID)}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ListInsurances;
