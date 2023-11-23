import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import styles from "../InsuranceDetails/InsuranceDetails.module.css";
import InsuranceCoverage from "../../components/InsuranceCoverage/InsuranceCoverage";
import InsuranceNotCovered from "../../components/InsuranceNotCovered/InsuranceNotCovered";
import InsuranceCard from "../../components/InsuranceCard/InsuranceCard";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import SmPlanDetailCard from "../../components/SmPlanDetailCard/SmPlanDetailCard";
import Typography from "../../components/Typography/Typography";
import LoadPage from "../loadPage";
import LoadingOverlay from "react-loading-overlay-ts";

import { getAllInsurancePlansRoute } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getInsurancePlanByIdRoute } from "../../utils/APIRoutes";
import { getInsuranceCompanyByIdRoute } from "../../utils/APIRoutes";

const InsuranceDetails = () => {
  const { CompanyID } = useParams();
  const { _id } = useParams();
  const [companyData, setCompanyData] = useState({
    CoveredItems: [],
    NotCoveredItems: [],
  });
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();
  const [isLoadingData, setLoadingData] = useState(false);

  const [currentCompanyID, setCurrentCompanyID] = useState(null);
  // const [insurancePlans, setInsurancePlans] = useState([]);

  //For Small Cards
  const fetchCompanyData = async (companyID) => {
    try {
      setLoadingData(true);
      document.body.style.overflow = "hidden";
      const response = await axios.get(
        `${getInsuranceCompanyByIdRoute}/${companyID}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching company data:", error);
      return null;
    } finally {
      setLoadingData(false);
      document.body.style.overflow = "unset";
    }
  };
  const [insurancePlans, setInsurancePlans] = useState([]);

  useEffect(() => {
    const fetchSimilarPlans = async () => {
      try {
        const response = await axios.get(getAllInsurancePlansRoute);
        const allInsurancePlans = response.data;

        // Filter out plans from the current company and shuffle the array
        const filteredPlans = allInsurancePlans
          .filter((plan) => plan.CompanyID !== currentCompanyID)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        // Fetch additional company data for the filtered plans
        const plansWithCompanyData = await Promise.all(
          filteredPlans.map(async (plan) => {
            const companyData = await fetchCompanyData(plan.CompanyID);
            return { ...plan, companyData };
          })
        );

        setInsurancePlans(plansWithCompanyData);
      } catch (error) {
        console.error("Error fetching similar plans:", error);
      }
    };

    // Fetch similar plans only if the currentCompanyID is available
    if (currentCompanyID) {
      fetchSimilarPlans();
    }
  }, [currentCompanyID]);

  //For main part above
  useEffect(() => {
    setLoadingData(true);
    document.body.style.overflow = "hidden";

    axios
      .get(`${getInsurancePlanByIdRoute}/${_id}`)
      .then((response) => {
        setCompanyData(response.data);
        setCurrentCompanyID(response.data.CompanyID);

        axios
          .get(`${getInsuranceCompanyByIdRoute}/${response.data.CompanyID}`)
          .then((responsecompany) => {
            setPlanData(responsecompany.data);
          })
          .catch((error) => {
            console.error("Error fetching Company data:", error);
          })
          .finally(() => {
            setLoadingData(false);
            document.body.style.overflow = "unset";
          });
      })
      .catch((error) => {
        console.error("Error fetching Plan data:", error);
        setLoadingData(false);
        document.body.style.overflow = "unset";
      });
  }, [_id, CompanyID]);

  const handleViewDetailsClick = (_id) => {
    navigate(`/insurance/details/${_id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header id="top" />
      <div className={styles.insuranceDetailContainer}>
        <div className={styles.InsuranceDetailsHeading}>
          <Typography variant="h1-poppins-semibold">
            Coverage Details
          </Typography>
          <Typography className={styles.subheadDetailTypo}>
            Information may vary from the actual insurance policy provided by
            each company
          </Typography>
        </div>
        <div className={styles.InsuranceDetails}>
          <div className={styles.planDetailCard}>
            {companyData.CompanyID && (
              <PlanDetailCard
                source={planData.CompanyLogo}
                alt={planData.CompanyName}
                key={companyData._id}
                deductibleNum={companyData.AnnualDeductible}
                reimbursementNum={companyData.Reimbursement * 100}
                coverageNum={companyData.AnnualCoverage}
                price={companyData.InsurancePrice}
                CompanyID={companyData.CompanyID}
                // showButton={false}
              />
            )}

            {/* {companyData.CompanyID &&( */}
            <InsuranceCard
              title="Why Recommended"
              text={planData.Recommend}
              subtitle="Highlight of plan"
              body={planData.Highlights}
            ></InsuranceCard>
            {/* )} */}
          </div>

          <div className={styles.InsuranceCoverageCenterDiv}>
            <div>
              <InsuranceCoverage descriptions={companyData.CoveredItems} />
            </div>
            <div>
              <InsuranceNotCovered descriptions={companyData.NotCoveredItems} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Plans Section */}
      <div className={styles.InsuranceDetailsSimilarPlans}>
        <div className={styles.InsuranceDetailsSimilarPlansHeading}>
          <Typography
            variant="h2-poppins-semibold"
            // style={{ gridColumn: "1/-1" }}
          >
            Compare to Similar Plans
          </Typography>
        </div>
        <div className={styles.InsuranceDetailsSimilarPlansBody}>
          {insurancePlans.map((plan, index) => (
            <SmPlanDetailCard
              smSource={plan.companyData?.CompanyLogo}
              planName={plan.PlanName}
              key={index}
              smAlt={plan.companyData?.CompanyName}
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
  );
};

export default InsuranceDetails;
