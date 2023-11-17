import React from "react";
import Typography from "../Typography/Typography";
import styles from "./dashMedicineCard.module.css";
import PillSVG from "../SVG/PillSVG";

const DashMedicineCard = ({ numOfMedicine, ...props }) => {
  return (
    <div className={`${styles["medicine-card-container"]}`}>
      <div className={`${styles["icon-container"]}`}>
        <PillSVG width="50" height="50" />
      </div>

      <div style={{maxWidth: '120px'}}>
        <Typography variant="h2-poppins-semibold" color="almost-black">
          {numOfMedicine}
        </Typography>
    
        <Typography variant="textfield-poppins-regular" color="almost-black">
          Ongoing Medications
        </Typography>
      </div>

      {/* <div>
        <Typography variant="detailtext1-poppins-medium" color="dark-blue">
          <a>See Details</a>
        </Typography>
      </div> */}
    </div>
  );
};

export default React.memo(DashMedicineCard);
