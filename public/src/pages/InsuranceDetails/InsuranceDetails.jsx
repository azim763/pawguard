import React, {useEffect, useState} from "react";
import Header from "../../components/Header/header";
import styles from "../InsuranceDetails/InsuranceDetails.module.css";
import InsuranceCoverage from "../../components/InsuranceCoverage/InsuranceCoverage";
import InsuranceNotCovered from "../../components/InsuranceNotCovered/InsuranceNotCovered";
import InsuranceCard from "../../components/InsuranceCard/InsuranceCard";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import SmPlanDetailCard from "../../components/SmPlanDetailCard/SmPlanDetailCard";
import Typography from "../../components/Typography/Typography";

import {getAllInsurancePlansRoute} from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {getInsurancePlanByIdRoute} from "../../utils/APIRoutes";
import {getInsuranceCompanyByIdRoute} from "../../utils/APIRoutes";

const InsuranceDetails = () => {

  const { CompanyID } = useParams();
  const { _id } = useParams();
  const [companyData, setCompanyData] = useState({ CoveredItems:[] ,NotCoveredItems: [] });
  const [planData,setPlanData]=useState([]);
 const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${getInsurancePlanByIdRoute}/${_id}`)
      .then((response) => {
        setCompanyData(response.data);
        console.log("Data "+companyData.CoveredItems);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
        console.log("Error 1 "+companyData);
        console.log("Error 2 "+_id);
        console.log("Error 3 "+CompanyID);
      });
  }, [_id]);

  useEffect(()=>{
    axios
    .get(`${getInsuranceCompanyByIdRoute}/${CompanyID}`)
    .then((response) => {
      setPlanData(response.data);
      console.log("Plan Data "+response.data);
    })
    .catch((error) => {
      console.error("Error fetching Plan data:", error);
      console.log("Plan Error 1 "+companyData);
      console.log("Plan Error 2 "+CompanyID);
    });
}, [CompanyID]); 
 
  //For small cards 
  const [insurancePlans, setInsurancePlans] = useState([]);
  // const navigate = useNavigate();
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
    // Use the history.push method to navigate to the details page
    navigate(`/insurance/details/${_id}`);
  };

  return (
    <div>
      <Header/>
      <div>
        <div className={styles.InsuranceDetails}>
          <Typography variant="h1-poppins-semibold" color="almost-black">
            {" "}
            Coverage Details
          </Typography>
          {companyData.CompanyID &&(
            <div>
             <PlanDetailCard
             source="https://picsum.photos/200/200"
             alt="logo"
             key={companyData._id}
             deductibleNum={companyData.AnnualDeductible}
             reimbursementNum={(companyData.Reimbursement)*100}
             coverageNum={companyData.AnnualCoverage}
             price={companyData.InsurancePrice}
             CompanyID={companyData.CompanyID}
            />     
          </div>
          )}
          
          {/* <div>
          {companyData.CompanyID &&(
            <InsuranceCard
              title="Why Recommended"
              text={CompanyID.Recommend}
              subtitle="Highlight of plan"
              body={CompanyID.Highlights}>
            </InsuranceCard>
            )}
          </div> */}

          <div className={styles.InsuranceCoverageCenterDiv}>
            <div className={styles.InsuranceCoverageStyle}>
              <InsuranceCoverage descriptions={companyData.CoveredItems} />
              <InsuranceNotCovered descriptions={companyData.NotCoveredItems} />
              </div>
          </div>
        </div>

{/* Similar Plans Section */}
        <div className={styles.InsuranceDetailsSimilarPlans}>
          <Typography
            variant="h2-poppins-semibold"
            style={{ gridColumn: "1/-1" }}
          >
            Compare to Similar Plans
          </Typography>

            {insurancePlans.slice(0, 3).map((plan) => (
              // <div key={plan.CompanyID}>
                <SmPlanDetailCard
                  smSource="https://picsum.photos/250/100"
                  key={plan._id}
                  smAlt="logo"
                  smDeductibleNum={plan.AnnualDeductible}
                  smReimbursementNum={plan.Reimbursement*100}
                  smCoverageNum={plan.AnnualCoverage}
                  smPrice={plan.InsurancePrice}
                  CompanyID={plan.CompanyID}
                  onClick={() => handleViewDetailsClick(plan._id)}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
