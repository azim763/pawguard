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
  
 const [currentCompanyID, setCurrentCompanyID] = useState(null);

 useEffect(() => {
  axios.get(`${getInsurancePlanByIdRoute}/${_id}`)
    .then((response) => {
      setCompanyData(response.data);
      setCurrentCompanyID(response.data.CompanyID);
      axios.get(`${getInsuranceCompanyByIdRoute}/${response.data.CompanyID}`)
      .then((responsecompany) => {
         setPlanData(responsecompany.data);
    })
      .catch((error) => {
        console.error("Error fetching Company data:", error);
      });
    })
    .catch((error) => {
      console.error("Error fetching Plan data:", error);
    });
}, [_id, CompanyID]);
 
  //For small cards 
  const [insurancePlans, setInsurancePlans] = useState([]);
  useEffect( () => {
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
    navigate(`/insurance/details/${_id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header id="top"/>
      <div>
        <div className={styles.InsuranceDetails}>
        <div className={styles.InsuranceDetailsHeading}>
          <Typography variant="h1-poppins-semibold" color="almost-black">
            {" "}
            Coverage Details
          </Typography>
          <Typography variant="body3-poppins-regular" color="almost-black">
          <p>Information may vary from the actual insurance policy provided by each company</p>
          </Typography>
        </div>
          {companyData.CompanyID &&(
            <div>
             <PlanDetailCard
             source={planData.CompanyLogo}
             alt={planData.CompanyName}
             key={companyData._id}
             deductibleNum={companyData.AnnualDeductible}
             reimbursementNum={(companyData.Reimbursement)*100}
             coverageNum={companyData.AnnualCoverage}
             price={companyData.InsurancePrice}
             CompanyID={companyData.CompanyID}
             showButton={false}
            />     
          </div>
          )}
          
          <div>
          {/* {companyData.CompanyID &&( */}
            <InsuranceCard
              title="Why Recommended"
              text={planData.Recommend}
              subtitle="Highlight of plan"
              body={planData.Highlights}>
            </InsuranceCard>
            {/* )} */}
          </div>

          <div className={styles.InsuranceCoverageCenterDiv}>
            <div className={styles.InsuranceCoverageStyle}>
              <InsuranceCoverage descriptions={companyData.CoveredItems} />
              <InsuranceNotCovered descriptions={companyData.NotCoveredItems} />
              </div>
          </div>
        </div>

{/* Similar Plans Section */}
        <div className={styles.InsuranceDetailsSimilarPlans}>
        <div className={styles.InsuranceDetailsSimilarPlansHeading}>
          <Typography
            variant="h2-poppins-semibold"
            style={{ gridColumn: "1/-1" }}
          >
            Compare to Similar Plans
          </Typography>
          </div>
          <div className={styles.InsuranceDetailsSimilarPlansBody}>
          {insurancePlans
              .filter((plan) => plan.CompanyID == currentCompanyID) // Filter out plans from different companies
              .slice(0, 3)
              .map((plan) => (
                <SmPlanDetailCard
                  smSource={planData.CompanyLogo}
                  planName={plan.PlanName}
                  key={plan._id}
                  smAlt={planData.CompanyName}
                  smDeductibleNum={plan.AnnualDeductible}
                  smReimbursementNum={plan.Reimbursement * 100}
                  smCoverageNum={plan.AnnualCoverage}
                  smPrice={plan.InsurancePrice}
                  CompanyID={plan.CompanyID}
                  onClick={() => handleViewDetailsClick(plan._id)}
                />
              ))}
              </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
