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
import { searchPetLogsByPetIDRoute, searchPetMedicationsByPetIDRoute, searchPetVaccinationsByPetIDRoute, searchPetFoodByPetIDRoute, getPetByIdRoute } from "../../utils/APIRoutes";
// import { Cell } from 'recharts';
import Graph from "../../components/Graph/Graph";
import { useNavigate, NavLink, Link } from "react-router-dom";
// import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";
import { Margin, usePDF } from "react-to-pdf";

// 


const ExportpetLog = () => {



const { toPDF, targetRef } = usePDF({
  filename: "petlog.pdf",
  page: { margin: Margin.MEDIUM }
});



  const [petLog, setPetLog] = useState([]);
  const [pet, setPet] = useState({});

  const [loading, setLoading] = useState(true);

  const [petMedications, setPetMedications] = useState([]);
  const [petVaccines, setPetVaccines] = useState([]);
  const [foods, setFoods] = useState([]);

  const navigate = useNavigate();


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
      .get(searchPetFoodByPetIDRoute, {
        params: { PetID: petID },
      })
      .then((response) => {
        setFoods(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [petID]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseFood = await axios.get(searchPetFoodByPetIDRoute, {
  //         params: { PetID: selectedPet._id },
  //       });
  //       setFoods(responseFood.data);
  //     } catch (error) {
  //       console.error("Error fetching pet foods:", error);
  //     }
  //   };

  //   fetchData();
  // }, [selectedPet]);




  useEffect(() => {
    axios
      .get(searchPetVaccinationsByPetIDRoute, {
        params: { PetID: petID },
      })
      .then((response) => {
        setPetVaccines(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [petID]);




  function userfrDateTime(isoString) {

    const dateTime = new Date(isoString);

    const optionsLong = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const optionsShort = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    const userFriendlyDateTime = dateTime.toLocaleDateString("en-US", optionsShort);
    return userFriendlyDateTime;
  }

  /************************    Styles   ********************** */

  const contentContainer = {
    borderCollapse: 'collapse',
    margin: '12px 0',
    fontSize: '0.9em',
    fontFamily: 'sans-serif',
    minWidth: '400px',
  //  boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    width: '100%'
}


  const myComponentStyle = {
    color: 'black',
    lineHeight: 1.8,
    padding: '0 1.5em',
    innerWidth: '100%',
    width: '846px',
    fontSize:'12px',
    fontFamily: 'sans-serif',
    margin: 'auto',
  }
  const logheaderStyle = {
    height: '20px',
    width: '100%',
    backgroundColor: '#efefef'
  }

  const generalinfo = {
    backgroundColor: 'var(--pearl-blue)',
    padding: '8px',
    margin: '8px 0',
    textAlign: 'center',
    fontSize:'14px'
  }

   const preview = {
    fontSize:'32px', 
    margin:'Auto',
    textAlign: 'center',
    backgroundColor: '#ffe88d',
    display: 'grid',
    gridTemplateColumns: '1fr auto'
   }
  const exportbutton = {
    textAlign: 'center',  paddingBottom: '2rem',
  }
  // const contentContainer = {
  //   width: '100%'

  // }
  const tdlabelsStyle = { 
   // width: '120px'
   }
  const tdvaluesStyle = {
    //  width: '170px' 
    }
  const labelsStyle = {
    fontWeight: '500',
    fontSize:'10px'
  }
  const valuesStyle = {
    fontWeight: '400',
    fontSize:'11px'
  }
  const btnback = {
   padding: '0 16px'
  } 
  
  const graphleft = {
    padding: '8px',
    border: 'solid 1px lightgray',
  borderRadius: '8px',
  backgroundColor: 'white',
  margin: '4px'
   } 
   const graphright = {
    padding: '8px',
    border: 'solid 1px lightgray',
  borderRadius: '8px',
  backgroundColor: 'white',
margin: '4px'
   } 
    
  const graphcontainer = {
    display: 'grid',
   // gridTemplateColumns: '1fr 1fr'
   } 
  /******************************************************* */
  const generatePDFjs = () => {

    // var element = document.getElementById("export");
    var element = document.querySelector(".export");

    var doc = new jsPDF("p", "pt", "A3");

    doc.html(element, {
      async callback(doc) {
        doc.save("petlog");
      }
    });

  };
  const goback = () => {
    navigate(-1);
  };


  return (
    <div >

      <Typography variant="h1-poppins-semibold" color="almost-black" >


      </Typography>
      <Header />



           
<div style={preview}>
 <div>Preview</div>
 <Button
       style={btnback}
            label={"X"}
            onClickHandler={goback} 
          />
   {/* <Button onClick={downloadPdf}>Download PDF</Button> */}
   {/* <Button onClick={toPDF}>Download PDF</Button> */}
</div>
          
     <div className={styles.petLogContainer} class="export" style={myComponentStyle} id="container" ref={targetRef} >
        {/* <div className={styles.petLogContainer}   style={myComponentStyle}> */}
{/* 
        <div style={logheaderStyle}>
  <div className={styles.petLogHeader}>
          Pet Logs
        </div>
        </div> */}

      
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
                    <div style={labelsStyle}>Dosage:</div>

                  </td>

                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Date:</div>

                  </td>


                </tr>

                {petMedications.map(log => (
                  <tr key={log._id}>
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.MedicineName}</div>
                    </td> 
                   <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.DosageAmount}</div>
                    </td>

                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{userfrDateTime(log.MedicationDate)}</div>
                    </td>

                  </tr>
                ))}



              </table>
            </div>

            <div style={generalinfo}>
              Vaccination History
            </div>
            <div>
              <table style={contentContainer}>
                <tr>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Vaccination Name:</div>
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
                      <div style={valuesStyle}>{userfrDateTime(log.VaccinationDate)}</div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>


            <div style={generalinfo}>
              Log History
            </div>
            <div>
              <table style={contentContainer}>
                <tr>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Log Date:</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Urine Amount:</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Stool Amount:</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Stool Appearance:</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Activity Level:</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Wheight:</div>
                  </td>
                  <td style={tdlabelsStyle}>
                    <div style={labelsStyle}>Notes:</div>
                  </td>
               </tr>
                {petLog.map(log => (
                  <tr key={log._id}>
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.LogDate}</div>
                    </td> 
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.UrineAmount}</div>
                    </td>
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.StoolAmount}</div>
                    </td>
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.StoolAppearance}</div>
                    </td>
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.ActivityLevel}</div>
                    </td>
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.Wheight}</div>
                    </td>
                    <td style={tdvaluesStyle}>
                      <div style={valuesStyle}>{log.Notes}</div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>

           <div style={generalinfo}>
              Meal & Weight Graphs
            </div>
       <div  style={graphcontainer}>    
            <div style={graphleft}>
                          <Graph
                            names={foods.map((food) => food.QuantityPerMeal)}
                            values={foods.map((food) => food.FoodDate)}
                            label="Meal"
                          />
                      
            </div>
            <div  style={graphright}>
 <Graph
                          names={petLog.map((petLog) => petLog.Weight)}
                          values={petLog.map((petLog) => petLog.LogDate)}
                          label="Weight"
                        />
            </div> 
   
            <div>
            </div>
            </div>
           
          </div>

        )}

      </div>
      <div style={exportbutton}>
      <Button onClickHandler={toPDF} variant="yellow" type="submit" label={"Export"} size="dk-md-s"  />
</div>
    </div>

  );
};

export default ExportpetLog;
