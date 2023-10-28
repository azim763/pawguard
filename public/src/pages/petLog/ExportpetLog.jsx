import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPetLogsRoute,getAllPetsRoute } from "../../utils/APIRoutes";
//import { getAllPetLogsRoute,getAllPetsRoute,searchPetLogsByPetID } from "../../utils/APIRoutes";
import Typography from "../../components/Typography/Typography";
import styles from "./petLog.module.css";
import jsPDF from "jspdf";

const ExportpetLog = () => {

  const [petLogs, setPetLogs] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [petid, setSelectedPet] = useState("");

  const onloadpage = () => {

    // read id from querystring

    setSelectedPet("");
  };


// useEffect(() => {
//   const fetchData = async () => {


    
//     axios.get(searchPetLogsByPetID, {
//       params: { PetID: petid },
//     })
//     .then(responsePet => {
//       setPets(responsePet.data);

//           axios.get(getAllPetLogsRoute)
//        .then(response => {
//          setPetLogs(response.data);
//          setLoading(false);
//        })
//        .catch(error => {
//          console.error('Error fetching data:', error);
//          setLoading(false);
//        });
//     })
//     .catch(error => {})
//      };
//   fetchData();

// }, [petid]);



useEffect(() => {
  const fetchData = async () => {


    
    axios.get(getAllPetsRoute)
    .then(responsePet => {
      setPets(responsePet.data);

          axios.get(getAllPetLogsRoute)
       .then(response => {
         setPetLogs(response.data);
         setLoading(false);
       })
       .catch(error => {
         console.error('Error fetching data:', error);
         setLoading(false);
       });
    })
    .catch(error => {})
     };
  fetchData();

}, []);
// useEffect(() => {

// // generatePDF();
// }, []);

function userfrDateTime(isoString)
{

  const dateTime = new Date(isoString);

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
};

const userFriendlyDateTime = dateTime.toLocaleDateString("en-US", options);
return userFriendlyDateTime;
}

const generatePDF = () => {
  var doc = new jsPDF("p", "pt");
  
for (let pindex = 0; pindex < pets.length; pindex++)
{
  
  
  doc.setFontSize(22);
  //  doc.addFont("helvetica", "normal"); 
  //console.log(pets[0]);
  console.log(pindex);
  doc.text(20, 20, pets[pindex].PetName);
  doc.setFontSize(12);

  for (let index = 0; index < petLogs.length; index++) {
  //  if(petLogs[index].petID==pets[pindex]._id)

    var np=index%4
     var k= np*200;
    doc.text(20,k+60,"Log Date:    "+  userfrDateTime(petLogs[index].LogDate));
     doc.text(20, k+80,"Activity Level:    "+ petLogs[index].ActivityLevel);
    doc.text(20, k+100,"Urine Amount:     "+ petLogs[index].UrineAmount);
    doc.text(20, k+120,"Stool Amount:    "+ petLogs[index].StoolAmount);
    doc.text(20, k+140,"Stool Appearance:    "+ petLogs[index].StoolAppearance);
      doc.text(20, k+160,"Stool Appearance:   "+ petLogs[index].StoolAppearance);
    doc.text(20, k+180,"Notes:   "+ petLogs[index].Notes);
 //   doc.text(20, k+160,petLogs[index].Wheight);
  if (np==3)
  doc.addPage();
  }
}
  
    doc.save("exportlog.pdf");
};


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
<button onClick={generatePDF}>
    {}
    Export
  </button>
</div>

    </div>
    
  );
};

export default ExportpetLog;
