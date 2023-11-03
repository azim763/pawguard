import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { getAllPetLogsRoute,getAllPetsRoute,searchPetLogsByPetID } from "../../utils/APIRoutes";
import Typography from "../../components/Typography/Typography";
import styles from "./petLog.module.css";
//import jsPDF from "jspdf";
import jsPDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf'
import Header from "../../components/Header/header";
import Button from "../../components/Button/Button";
//import LogoSVG from '../../components/SVG/LogoSVG';
import { useParams } from "react-router-dom";
import { searchPetLogsByPetIDRoute, getPetByIdRoute } from "../../utils/APIRoutes";

// import { searchPetLogsByPetID } from '../../../../server/controllers/petLogController';
// import { searchPetLogsByPetIDRoute } from '../../utils/APIRoutes';
const ExportpetLog = () => {

  
  const [petLog, setPetLog] = useState([]);
  const [petobj, setPets] = useState([]);
 // const { _id } = useParams();
 // const [petLogs, setPetLogs] = useState([]);

  const [loading, setLoading] = useState(true);


  
 //  console.log(PetID);
   const { petID } = useParams();
  //var { id } =petID;
   // console.log(petID);

  useEffect(() => {
    const fetchData = async () => {
      try {
         const response2 = await axios.get(getPetByIdRoute +'/'+petID );
        setPets(response2.data);
        console.log(petobj);
          const response = await axios.get(searchPetLogsByPetIDRoute +'/'+petID );
        setPetLog(response.data);
         console.log(response2.data);
          setLoading(false);
       } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [petID]);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
 
  //       const response = await axios.get(getPetByIdRoute +'/'+petID );
  //       setPets(response.data);

  //        console.log(response.data);
  //     setLoading(false);
  //      } catch (error) {
  //       console.log("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, [petID]);


  function userfrDateTime(isoString) {

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
  const myComponentStyle = {
    color: 'blue',
    lineHeight: 2,
    padding: '1.5em',
    innerWidth: '100%'
  }
  const logheaderStyle={
    height: '20px',
    width: '100%',
    backgroundColor:'#efefef'
  }
  const generatePDF = () => {

    // var element = document.getElementById("export");
    var element = document.querySelector(".export");
 
    var doc = new jsPDF("p", "pt", "a4");
   
    doc.html(element, {
      async callback(doc) {
             doc.save("petlog");
      }
    });

  };


  return (
    <div>

      <Typography variant="h1-poppins-semibold" color="almost-black" >


      </Typography>
      <Header/>
      
      <div className={styles.petLogContainer}  class="export" style={myComponentStyle}>
      {/* <div className={styles.petLogContainer}   style={myComponentStyle}> */}
   
<div  style={logheaderStyle}>

</div>

   <div className={styles.petLogHeader}>
        Pet Logs
      </div>  
       {loading ? (
          <p>Loading...</p>
        ) : (


          <div >
<div> 
  
<ul >
              {petobj.map(logpet => (
                <li key={logpet._id}>
                  <strong>Log Date:</strong> {logpet._id} <br />
                
                </li>
              ))}
            </ul>
  </div>
  <div>
    </div>
            <ul >
              {petLog.map(log => (
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

          </div>

        )}
 
      </div>
       <Button onClickHandler={generatePDF} variant="yellow" type="submit" label={"Export"} size="dk-md-s" />

    </div>

  );
};

export default ExportpetLog;
