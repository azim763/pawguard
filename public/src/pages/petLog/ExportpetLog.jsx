import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPetLogsRoute } from "../../utils/APIRoutes";
import Typography from "../../components/Typography/Typography";
import styles from "./petLog.module.css";

const ExportpetLog = () => {
  const [petLogs, setPetLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(async () => {
  // const data = await axios.get(`${getAllPetLogsRoute}`);
  //      console.log(data.data);
  //      setPetLogs(data.data);
  //       setLoading(false);  });

// under construction !
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(getAllPetLogsRoute);
      setPetLogs(response.data);
      setLoading(false);
    } catch (error) {
      // Handle any errors here
    }
  };

  fetchData();
}, []);
  return (
    <div>

<Typography variant="h1-poppins-semibold" color="almost-black" >
  <div className={styles.petLogHeader}>
    Pet Logs
  </div>

          </Typography>
<div className={styles.petLogContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {petLogs.map(log => (
            <li key={log._id}>
              <strong>Log Date:</strong> {log.LogDate} <br />
              <strong>Log UrineAmount:</strong> {log.UrineAmount} <br />
              <strong>StoolAmount:</strong> {log.StoolAmount} <br />         
                   <strong>StoolAppearance:</strong> {log.StoolAppearance} <br />
                   <strong>Notes:</strong> {log.Notes} <br />
                   <strong>Wheight:</strong> {log.Wheight} <br />
                                 <strong>ActivityLevel:</strong> {log.ActivityLevel} <br />
                                 <strong>StoolAppearance:</strong> {log.StoolAppearance} <br />

            </li>
          ))}
        </ul>
      )}

</div>

    </div>
  );
};

export default ExportpetLog;
