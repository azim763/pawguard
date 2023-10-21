import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getAllInsurancePlansRoute} from "../../utils/APIRoutes";
import { loginRoute } from "../../utils/APIRoutes";

const InsurancePlanList = () => {
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API route
  //  const apiUrl = 'YOUR_API_URL_HERE'; // Replace with your actual API URL

    // Make an HTTP GET request to fetch all insurance plans
    axios.get(getAllInsurancePlansRoute)
      .then(response => {
        setInsurancePlans(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Insurance Plans</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {insurancePlans.map(plan => (
            <li key={plan._id}>
              <strong>Plan Name:</strong> {plan.planName} <br />
              <strong>Company Name:</strong> {plan.companyName} <br />
              {/* Include other plan details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsurancePlanList;
