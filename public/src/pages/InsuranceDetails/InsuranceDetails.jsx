import React from 'react'
import Header from "../../components/Header/header";
import styles from "../InsuranceDetails/InsuranceDetails.module.css"
import InsuranceCoverage from '../../components/InsuranceCoverage/InsuranceCoverage';
import InsuranceNotCovered from '../../components/InsuranceNotCovered/InsuranceNotCovered';
import InsuranceCard from "../../components/InsuranceCard/InsuranceCard"


const InsuranceDetails = () => {
  return (
    <div>
      <Header />
      <div>
        <div className={styles.InsuranceDetails}>
          <h1>Coverage Details</h1>
          <div>

            {/*  PUT The Insurance card here  of the particular Card */}
          </div>
          <div>
            <InsuranceCard title="Why Recommended" text="" subtitle="Highlight of plan" body=""></InsuranceCard>

            {/* Put Why recommend component here  */}
          </div>
          <div className={styles.InsuranceCoverageCenterDiv}>
            <div className={styles.InsuranceCoverageStyle}>
              <InsuranceCoverage></InsuranceCoverage>
              <InsuranceNotCovered></InsuranceNotCovered>
              {/* Put whats covered and whats not covered component here */}
            </div>
          </div>
        </div>


        <div className={styles.InsuranceDetailsSimilarPlans}>
          <h2>
            Compare to Similar Plans
          </h2>

          <div>

            {/* Put similar plans component here */}
          </div>

        </div>

      </div>
    </div>
  )
}

export default InsuranceDetails
