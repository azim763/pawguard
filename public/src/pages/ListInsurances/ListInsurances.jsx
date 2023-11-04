import React, {useState, useEffect} from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import styles from "./listInsurances.module.css";
import {getAllInsurancePlansRoute} from "../../utils/APIRoutes";
import axios from "axios";
//for functioning of the button
import { useNavigate, useLocation } from "react-router-dom";

const ListInsurances = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filteredPlans = location.state?.filteredPlans || [];
  const [InsurancePlans, setInsurancePlans]= useState('');

  useEffect( () => {
    axios.get(getAllInsurancePlansRoute) 
      .then((response) => {
        setInsurancePlans(response.data);
        console.log("ListInsurancesResponse:"+response.data);
      })
      .catch((error) => {
        console.error("Error fetching insurance plans:", error);
      });
  }, []);

  const handleViewDetailsClick = (_id) => {
    console.log("This is provided to or next page"+_id);
    navigate(`/insurance/details/${_id}`);
  };

  return (
    <div>
      <Header></Header>
      <div className={styles.ListInsurances}>
        <div className={styles.heading}>
          <div className={styles.mainHeading}>
          <Typography variant="h1-poppins-semibold" color="almost-black">
            Plans Recommend for you
          </Typography>
          </div>
          <div className={styles.subHeading}>
          <Typography variant="sub-h2-poppins-medium" color="almost-black">
          Information may vary from the actual insurance policy provided by each company.
          </Typography>
          </div>
        </div>

        <div className={styles.ListInsurancesBody}>

        {filteredPlans.map((plan,index) => (
            <PlanDetailCard
              source={plan._id.CompanyLogo}
              alt={plan._id.CompanyLogo}
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



