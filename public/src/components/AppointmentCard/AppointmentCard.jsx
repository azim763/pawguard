import React from "react";
import Typography from "../Typography/Typography";

const AppointmentCard = ({ ClinicName, AppointmentTime, AppointmentReason, AppointmentDateTime }) => {
  return (
    <div>
      <div className="firstRow">
        <div>
          <Typography variant="body1-poppins-semibold">Clinic Name</Typography>
          <Typography variant="body3-poppins-regular">{ClinicName}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Time</Typography>
          <Typography variant="body3-poppins-regular">
            {AppointmentTime}
          </Typography>
        </div>
        <div className="icon"></div>
      </div>
      <div className="secondRow">
        <div>
          <Typography variant="body1-poppins-semibold">Purpose</Typography>
          <Typography variant="body3-poppins-regular">{AppointmentReason}</Typography>
        </div>
        <div>
          <Typography variant="body1-poppins-semibold">Date</Typography>
          <Typography variant="body3-poppins-regular">
            {AppointmentDateTime}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
