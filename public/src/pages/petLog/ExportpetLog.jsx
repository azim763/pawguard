import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPetLogsRoute } from "../../utils/APIRoutes";
import Typography from "../../components/Typography/Typography";
import styles from "./petLog.module.css";
import jsPDF from "jspdf";

const ExportpetLog = () => {

  const [petLogs, setPetLogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
useEffect(() => {
const generatePDF = () => {
  var doc = new jsPDF("p", "pt");


for (let index = 0; index < petLogs.length; index++) {
  //const element = petLogs[index].ActivityLevel;
  var k= index*200;
  doc.text(20,k+20,petLogs[index].LogDate);
  doc.text(20, k+40,petLogs[index].UrineAmount);
  doc.text(20, k+60,petLogs[index].StoolAmount);
doc.addFont("helvetica", "normal"); 
 doc.text(20, k+80,petLogs[index].StoolAppearance);
  doc.text(20, k+100,petLogs[index].Notes);
  doc.text(20, k+120,petLogs[index].Wheight);
  doc.text(20, k+140,petLogs[index].ActivityLevel);
  doc.text(20, k+160,petLogs[index].StoolAppearance);


}


  doc.save("exportlog.pdf");
};
generatePDF();
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
