import React from "react";
import Typography from "../Typography/Typography";

const MedicineCard = ({ medicineName }) => {
  return (
    <div>
      <div className="firstRow">
        <div>
          <Typography variant="body1-poppins-semibold">
            Medicine Name
          </Typography>
          <Typography variant="body3-poppins-regular">
            {medicineName}
          </Typography>
        </div>
        <div className="icon"></div>
      </div>
      <div className="otherRow">
        <div>
          <Typography variant="body1-poppins-semibold">Dosage</Typography>
          <Typography variant="body3-poppins-regular">{dosage}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Time</Typography>
          <Typography variant="body3-poppins-regular">
            {medicationTime}
          </Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Start date</Typography>
          <Typography variant="body3-poppins-regular">{startDate}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Period</Typography>
          <Typography variant="body3-poppins-regular">{Period}</Typography>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
