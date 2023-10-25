import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPetLogsRoute } from "../../utils/APIRoutes";
const ExportpetLog = () => {
  const [petLogs, setPetLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
        setLoading(false);
  const data = await axios.get(`${getAllPetLogsRoute}}`);
       console.log(data.data);
       setPetLogs(data.data);
      });

// under construction !

  return (
    <div>
      <h1>Pet Logs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {petLogs.map(log => (
            <li key={log._id}>
              <strong>Log Date:</strong> {log.logDate} <br />
              <strong>Log Type:</strong> {log.logType} <br />
              <strong>Description:</strong> {log.description} <br />
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExportpetLog;
