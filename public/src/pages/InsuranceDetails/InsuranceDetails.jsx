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

const InsuranceDetails = () => {

  const { companyId } = useParams();
  console.log("First Console "+companyId);
  const [companyData, setCompanyData] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // For small cards 
  console.log("Second Console "+companyData);
  useEffect(() => {
    axios
      .get(`${getInsurancePlanByIdRoute}/${companyId}`)
      .then((response) => {
        console.log("Nothing here"+companyId);
        console.log("This is response"+response);
        console.log("What is this??"+response.data);
        setCompanyData(response.data);
        console.log("this is the annual adata"+response.data.AnnualCoverage);
        // setLoading(false);
        console.log("Data "+companyData);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
        // setError(error);
        // setLoading(false);
      });
  }, [companyId]);
 
 
  //For small cards 
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
    // Use the history.push method to navigate to the details page
    navigate(`/insurance/details/${companyId}`);
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
          {companyData._id &&(
            <div>
             <PlanDetailCard
              source="https://picsum.photos/200/200"
              alt="logo"
              deductibleNum={companyData.AnnualDeductable}
              reimbursementNum={companyData.Reimbursement}
              coverageNum={companyData.AnnualCoverage}
              price={companyData.InsurancePrice}
            />     
          </div>
          )}
          
          <div>
            <InsuranceCard
              title="Why Recommended"
              text="Company Name offers the best coverage out of all the plans we analyzed for pet's breed .
              "
              subtitle="Highlight of plan"
              body="Lorem ipsum dolor sit amet. Eos deserunt dolorum et quibusdam unde et esse minima! Sit accu santium temporibus ut eligendi optio in aliquid necessitatibus ea obcaecatid eserunt   esseminido lorum et quibusdam unde et esse minima! Sit accusantium temligendi optio in aliquid necessita  "
            ></InsuranceCard>

            {/* Put Why recommend component here  */}
          </div>
          <div className={styles.InsuranceCoverageCenterDiv}>
            <div className={styles.InsuranceCoverageStyle}>
              <InsuranceCoverage descriptions={[
                  "Covered Item 1",
                  "Covered Item 2",
                  "Covered Item 3",
                  "Covered Item 4",
                  "Covered Item 5",
                ]} />
              <InsuranceNotCovered descriptions={[
                  "Not Covered Item 1",
                  "Not Covered Item 2",
                  "Not Covered Item 3",
                  
                ]}/>
              {/* Put whats covered and whats not covered component here */}
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

            {insurancePlans.map((plan) => (
              // <div key={plan.CompanyID}>
                <SmPlanDetailCard
                  smSource="https://picsum.photos/250/100"
                  key={plan._id}
                  smAlt="logo"
                  smDeductibleNum={plan.AnnualDeductable}
                  smReimbursementNum={plan.Reimbursement}
                  smCoverageNum={plan.AnnualCoverage}
                  smPrice={plan.InsurancePrice}
                  companyId={plan.CompanyID}
                  onClick={() => handleViewDetailsClick(plan._id)}
                />
              // </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
