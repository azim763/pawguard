import React from "react";
import Header from "../../components/Header/header";
import Typography from "../../components/Typography/Typography";
import PlanDetailCard from "../../components/PlanDetailCard/PlanDetailCard";
import styles from "./listInsurances.module.css";

const ListInsurances = () => {
  return (
    <div>
      <Header></Header>
      <div className={styles.ListInsurances}>
        <Typography variant="h1-poppins-semibold" color="almost-black">
          Plans Recommend for you
        </Typography>

        <div className={styles.ListInsurancesBody}>
          <PlanDetailCard
            source="https://picsum.photos/200/200"
            alt="logo"
            deductibleNum="50"
            reimbursementNum="50"
            coverageNum="Unlimited"
            price="50"
          />

          <PlanDetailCard
            source="https://picsum.photos/200/200"
            alt="logo"
            deductibleNum="50"
            reimbursementNum="50"
            coverageNum="Unlimited"
            price="50"
          />

          <PlanDetailCard
            source="https://picsum.photos/200/200"
            alt="logo"
            deductibleNum="50"
            reimbursementNum="50"
            coverageNum="Unlimited"
            price="50"
          />

          <PlanDetailCard
            source="https://picsum.photos/200/200"
            alt="logo"
            deductibleNum="50"
            reimbursementNum="50"
            coverageNum="Unlimited"
            price="50"
          />

          <PlanDetailCard
            source="https://picsum.photos/200/200"
            alt="logo"
            deductibleNum="50"
            reimbursementNum="50"
            coverageNum="Unlimited"
            price="50"
          />

        </div>
      </div>
    </div>
  );
};

export default ListInsurances;
