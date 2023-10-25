import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPetLogsRoute } from "../../utils/APIRoutes";
const ExportpetLog = () => {
  const [petLogs, setPetLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(async () => {
  // const data = await axios.get(`${getAllPetLogsRoute}`);
  //      console.log(data.data);
  //      setPetLogs(data.data);
  //       setLoading(false);  });

// under construction !
useEffect(async () => {

      const data = await axios.get(`${getAllPetLogsRoute}`);
      setPetLogs(data.data);
      setLoading(false); 
});

  return (
    <div>
      <h1>Pet Logs</h1>
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
                                 <strong>StoolAmount:</strong> {log.StoolAmount} <br />
                                 <strong>StoolAmount:</strong> {log.StoolAmount} <br />

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExportpetLog;
