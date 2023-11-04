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
import { searchPetLogsByPetIDRoute,searchPetMedicationsByPetIDRoute,searchPetVaccinationsByPetIDRoute,searchPetFoodByPetIDRoute, getPetByIdRoute } from "../../utils/APIRoutes";
import { Cell } from 'recharts';

const ExportpetLog = () => {


  const [petLog, setPetLog] = useState([]);
  const [pet, setPet] = useState({});

  const [loading, setLoading] = useState(true);

  const [petMedications, setPetMedications] = useState([]);
  const [petVaccines, setPetVaccines] = useState([]);


  //  console.log(PetID);
  const { petID } = useParams();

  useEffect(() => {
    axios
      .get(`${getPetByIdRoute}/${petID}`)
      .then((response) => {
        //  console.log(response.data);
        setPet(response.data);
        console.log(pet);
        console.log(response.data.PetName);
        // console.log(clinicDetails);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [petID]);




  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(getPetLogsByPetIDRoute + '/' + petID);
  //       setPetLog(response.data);
  //       console.log(pet);
  //       setLoading(false);
  //     }
  //     catch (error) {
  //       console.log("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, [petID]);

  
  useEffect(() => {
    axios
      .get(searchPetLogsByPetIDRoute, {
        params: { PetID: petID },
      })
      .then((response) => {
        setPetLog(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [petID]);


  useEffect(() => {
    axios
      .get(searchPetMedicationsByPetIDRoute, {
        params: { PetID: petID },
      })
      .then((response) => {
        setPetMedications(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [petID]);

  useEffect(() => {
    axios
      .get(searchPetVaccinationsByPetIDRoute, {
        params: { PetID: petID },
      })
      .then((response) => {
        setPetVaccines(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
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

  /************************    Styles   ********************** */



  const myComponentStyle = {
    color: 'black',
    lineHeight: 2,
    padding: '1.5em',
    innerWidth: '100%',
    width:'600px'
  }
  const logheaderStyle = {
    height: '20px',
    width: '100%',
    backgroundColor: '#efefef'
  }

  const generalinfo = {
    backgroundColor: 'var(--pearl-blue)',
    padding: '10px',
    margin: '28px 0'
  }
const contentContainer={
  width: '100%'

}
const tdlabelsStyle={  width: '120px'}
const tdvaluesStyle={  width: '170px'}
const labelsStyle={
  fontWeight: '500'

}
const valuesStyle={
  fontWeight: '400'

}
  /******************************************************* */
  const generatePDF = () => {

    // var element = document.getElementById("export");
    var element = document.querySelector(".export");

    var doc = new jsPDF("p", "pt", "letter");

    doc.html(element, {
      async callback(doc) {
        doc.save("petlog");
      }
    });

  };


  return (
    <div >

      <Typography variant="h1-poppins-semibold" color="almost-black" >


      </Typography>
      <Header />

      <div className={styles.petLogContainer} class="export" style={myComponentStyle}>
        {/* <div className={styles.petLogContainer}   style={myComponentStyle}> */}

        <div style={logheaderStyle}>

        </div>

        <div className={styles.petLogHeader}>
          Pet Logs
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div >
            <div style={generalinfo}>
              General Information
            </div>
            <div>
              <table style={contentContainer}>
                <tr>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Name:</div>
                    
                  </td>
                  <td style={tdvaluesStyle}>
                  <div style={valuesStyle}>{pet.PetName}</div>
                  </td>
                  <td style={tdlabelsStyle}>
                  <div style={labelsStyle}>Height:</div>
                  
                  </td>
                  <td>
                  <div style={valuesStyle}>{pet.Height}</div>
                  </td>

                </tr>

                <tr>
                  <td style={tdlabelsStyle}>
                  <div style={labelsStyle}>Breed:</div>
                    
                  </td>
                  <td>
                  <div style={valuesStyle}>{pet.Breed}</div>
                  </td>
                  <td style={tdlabelsStyle}>
                  <div style={labelsStyle}>Weight:</div>
                 
                  </td>
                  <td>
 <div style={valuesStyle}>{pet.Weight}</div>
                  </td>

                </tr>

                <tr>
                  <td style={tdlabelsStyle}>
                    Age:
                  </td>
                  <td>
                  <div style={valuesStyle}>{pet.Age}</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    Blood Group:
                  </td>
                  <td>
   <div style={valuesStyle}>{pet.BloodType}</div>
   
                  </td>

                </tr>

                <tr>
                  <td style={tdlabelsStyle}>
                    Gender:
                  </td>
                  <td>
   <div style={valuesStyle}>{pet.Gender}</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    DOB:
                  </td>
                  <td>

                  </td>

                </tr>
              </table>
            </div>

            <div style={generalinfo}>
              Medication History
            </div>
            <div>
            <table style={contentContainer}>
                <tr>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Medication Name:</div>
                    
                  </td>
               
                  <td style={tdlabelsStyle}>
                  <div style={labelsStyle}>Date:</div>
                  
                  </td>
                

                </tr>

                {petVaccines.map(log => (
                <tr key={log._id}>
                  <td style={tdvaluesStyle}>
                  <div style={valuesStyle}>{log.NameOfVaccination}</div>
                  </td>
                  <td style={tdvaluesStyle}>
                  <div style={valuesStyle}>{log.MedicationDate}</div>
                  </td>

                </tr>
              ))}



</table>
            </div>

            <div style={generalinfo}>
              Meal Graph
            </div>
            <div>

            </div>

            <div style={generalinfo}>
              Weight Graph
            </div>
            <div>

            </div>




            <div style={generalinfo}>
              Health
            </div>
            <div>

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


            <ul >
              {petVaccines.map(log => (
                <li key={log._id}>
                  <strong>Medication Name:</strong> {log.NameOfVaccination} <br />
                </li>
              ))}
            </ul>

            <ul >

              <li key={pet._id}>
                <strong>Log Date:</strong> {pet.PetName} <br />

              </li>

            </ul>
          </div>

        )}

      </div>
      <Button onClickHandler={generatePDF} variant="yellow" type="submit" label={"Export"} size="dk-md-s" />

    </div>

  );
};

export default ExportpetLog;
