import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/header";
// import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import UpdateLocationSettings from "../../components/UpdateLocationSettings/UpdateLocation";
import EmailReminderSettings from "../../components/EmailReminderSettings/EmailReminders";
import UpdatePasswordSettings from "../../components/UpdatePasswordSettings/UpdatePassword";
import UpdateProfileSettings from "../../components/UpdateProfileSettings/UpdateProfileSettings";
import "./AccountSetting.css";
import Typography from "../../components/Typography/Typography";

const AccountSetting = () => {
    
    return (
      <div >
        <Header />
        <div className="body">
          <Typography varient="h1-poppins-semibold">
              <h1>Account Settings</h1>
            </Typography>
            <div className="body-part">
              <UpdateProfileSettings></UpdateProfileSettings>
              <UpdatePasswordSettings></UpdatePasswordSettings>
              <UpdateLocationSettings></UpdateLocationSettings>
              <Button id="SaveButton"
              variant="yellow"
              size="dk-md"
              label="Save"
              // onClick={handleGetQuotesClick}
            />
            </div>
        </div>
      </div>
    );
  };
  
  export default AccountSetting;
  