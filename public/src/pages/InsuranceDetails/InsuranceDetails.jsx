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
              coverageNum="Unlimited"
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

        <div className={styles.InsuranceDetailsSimilarPlans}>
          <Typography
            variant="h2-poppins-semibold"
            style={{ gridColumn: "1/-1" }}
          >
            Compare to Similar Plans
          </Typography>

          <div style={{ marginTop: "30px" }}>
            <SmPlanDetailCard
              smSource="https://picsum.photos/250/100"
              smAlt="logo"
              smDeductibleNum="50"
              smReimbursementNum="50"
              smCoverageNum="Unlimited"
              smPrice="50"
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <SmPlanDetailCard
              smSource="https://picsum.photos/250/100"
              smAlt="logo"
              smDeductibleNum="50"
              smReimbursementNum="50"
              smCoverageNum="Unlimited"
              smPrice="50"
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <SmPlanDetailCard
              smSource="https://picsum.photos/250/100"
              smAlt="logo"
              smDeductibleNum="50"
              smReimbursementNum="50"
              smCoverageNum="Unlimited"
              smPrice="50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
