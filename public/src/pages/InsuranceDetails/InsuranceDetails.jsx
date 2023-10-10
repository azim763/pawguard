import React from "react";
import Header from "../../components/Header/header";
import styles from "../InsuranceDetails/InsuranceDetails.module.css";
import InsuranceCoverage from "../../components/InsuranceCoverage/InsuranceCoverage";
import InsuranceNotCovered from "../../components/InsuranceNotCovered/InsuranceNotCovered";
import InsuranceCard from "../../components/InsuranceCard/InsuranceCard";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import SmPlanDetailCard from "../../components/SmPlanDetailCard/SmPlanDetailCard";
import Typography from "../../components/Typography/Typography";

const InsuranceDetails = () => {
  return (
    <div>
      <Header />
      <div>
        <div className={styles.InsuranceDetails}>
          <Typography variant="h1-poppins-semibold" color="almost-black">
            {" "}
            Coverage Details
          </Typography>
          <div>
            <PlanDetailCard
              source="https://picsum.photos/200/200"
              alt="logo"
              deductibleNum="50"
              reimbursementNum="50"
              coverageNum="50"
              price="50"
            />
          </div>
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
              <InsuranceCoverage descriptions="Unidentified issues" />
              <InsuranceNotCovered descriptions="Unidentified issues" />
              {/* Put whats covered and whats not covered component here */}
            </div>
          </div>
        </div>

        <div className={styles.InsuranceDetailsSimilarPlans}>
          <Typography variant="h2-poppins-semibold">
            Compare to Similar Plans
          </Typography>

          <div>
            <SmPlanDetailCard
              smSource="https://picsum.photos/200/100"
              smAlt="logo"
              smDeductibleNum="50"
              smReimbursementNum="50"
              smRcoverageNum="50"
              smPrice="50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;