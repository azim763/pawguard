import React from "react";

const VaccinationCard = ({ VaccineName, VaccineDate }) => {
  return (
    <div>
      <div>
        <Typography variant="body1-poppins-semibold">
          Vaccination Name
        </Typography>
        <Typography variant="body3-poppins-regular">{VaccineName}</Typography>
      </div>
      <div className="icon"></div>
      <div>
        <Typography variant="body1-poppins-semibold">
          Date
        </Typography>
        <Typography variant="body3-poppins-regular">
          {VaccineDate}
        </Typography>
      </div>
    </div>
  );
};

export default VaccinationCard;
