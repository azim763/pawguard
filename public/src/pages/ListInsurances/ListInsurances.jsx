import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import styles from "./listInsurances.module.css";
import { getInsuranceCompanyByIdRoute } from "../../utils/APIRoutes";
import axios from "axios"; 
//for functioning of the button
import { useNavigate, useLocation } from "react-router-dom";

const ListInsurances = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filteredPlans = location.state?.filteredPlans || [];
  const [companyDetailsMap, setCompanyDetailsMap] = useState({});

  useEffect(() => {
    const fetchCompanyDetailsPromises = filteredPlans.map((plan) => {
      return axios
        .get(`${getInsuranceCompanyByIdRoute}/${plan.CompanyID}`)
        .then((response) => ({
          CompanyID: plan.CompanyID,
          CompanyLogo: response.data.CompanyLogo,
          CompanyName: response.data.CompanyName,
        }));
    });

    Promise.all(fetchCompanyDetailsPromises)
      .then((detailsArray) => {
        const updatedDetailsMap = {};
        detailsArray.forEach((details) => {
          updatedDetailsMap[details.CompanyID] = details;
        });
        setCompanyDetailsMap(updatedDetailsMap);
      })
      .catch((error) => {
        console.error("Error fetching company details:", error);
      });
  }, [filteredPlans]);

  const handleViewDetailsClick = (_id) => {
    console.log("This is provided to or next page" + _id);
    navigate(`/insurance/details/${_id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header id="top"></Header>
      <div className={styles.ListInsurances}>
        <div className={styles.heading}>
          <div className={styles.mainHeading}>
            <Typography variant="h1-poppins-semibold">
              Plans Recommend for you
            </Typography>
          </div>
          <div className={styles.subHeading}>
            <Typography className={styles.subheadTypo}>
              Information may vary from the actual insurance policy provided by
              each company.
            </Typography>
          </div>
        </div>

        <div className={styles.ListInsurancesBody}>
          {filteredPlans.map((plan, index) => (
            <PlanDetailCard
              source={companyDetailsMap[plan.CompanyID]?.CompanyLogo}
              alt={companyDetailsMap[plan.CompanyID]?.CompanyName}
              key={plan._id}
              deductibleNum={plan.AnnualDeductible}
              reimbursementNum={plan.Reimbursement * 100}
              coverageNum={plan.AnnualCoverage}
              price={plan.InsurancePrice}
              CompanyID={plan.CompanyID}
              onClick={() => handleViewDetailsClick(plan._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListInsurances;
