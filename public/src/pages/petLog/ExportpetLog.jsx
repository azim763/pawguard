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
import { searchPetLogsByPetIDRoute } from "../../utils/APIRoutes";

// import { searchPetLogsByPetID } from '../../../../server/controllers/petLogController';
// import { searchPetLogsByPetIDRoute } from '../../utils/APIRoutes';
const ExportpetLog = () => {

  const [petLog, setPetLog] = useState([]);

  const { PetID } = useParams();
   console.log(PetID);
   const { petID } = useParams();
   console.log(petID);
   const { petid } = useParams();
   console.log(petid);
   const { petId } = useParams();
   console.log(petId);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(searchPetLogsByPetIDRoute, {
          params: { PetID: petId },
        });
        setPetLog(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [petId]);




  const [petLogs, setPetLogs] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [petid, setSelectedPet] = useState("");
 // const { petid } = useParams();
 
  // const { _id } = useParams();
 
//  console.log(_id);
  // const onloadpage = () => {

  //   // read id from querystring

  //   //setSelectedPet("");
  // };


  useEffect(() => {
    axios.get(`${searchPetLogsByPetIDRoute}/${PetID}`)
      .then((response) => {
        setPetLogs(response.data);
  //             setLoading(false);
   
      })
      .catch((error) => {
        console.log(PetID);
        console.error("Error fetching  data:", error);
       });
  }, [ PetID]);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { petid } = useParams();

  //     console.log(petid);
  //     axios.get(searchPetLogsByPetIDRoute, {
  //       params: { petID: petid },
  //     })
  //     .then(responsePet => {
  //       setPets(responsePet.data);

  //       //     axios.get(getAllPetLogsRoute)
  //       //  .then(response => {
  //       //    setPetLogs(response.data);
  //       //    setLoading(false);
  //       //  })
  //       //  .catch(error => {
  //       //    console.error('Error fetching data:', error);
  //       //    setLoading(false);
  //       //  });
  //     })
  //     .catch(error => {})
  //      };
  //   fetchData();

  // }, [petid]);



  // useEffect(() => {
  //   const fetchData = async () => {



  //     axios.get(getAllPetsRoute)
  //       .then(responsePet => {
  //         setPets(responsePet.data);

  //         axios.get(getAllPetLogsRoute)
  //           .then(response => {
  //             setPetLogs(response.data);
  //             setLoading(false);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching data:', error);
  //             setLoading(false);
  //           });
  //       })
  //       .catch(error => { })
  //   };
  //   fetchData();

  // }, []);
  // useEffect(() => {

  // // generatePDF();
  // }, []);

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
    //  var doc = new jsPDF();
    //   doc.fromHTML(element);

    //   doc.save("exportlog.pdf");


    var doc = new jsPDF("p", "pt", "a4");
    // var pdf = document.querySelector(".export"); 
    // doc.fromHTML(element); 


    doc.html(element, {
      async callback(doc) {
        // save the document as a PDF with name of pdf_name
        doc.save("petlog");
      }
    });


    //   console.log(element);
    // doc.save("GFG.pdf"); 


    //   var doc = new jsPDF("p", "pt");

    // for (let pindex = 0; pindex < pets.length; pindex++)
    // {


    //   doc.setFontSize(22);
    //   //  doc.addFont("helvetica", "normal"); 
    //   //console.log(pets[0]);
    //   console.log(pindex);
    //   doc.text(20, 20, pets[pindex].PetName);
    //   doc.setFontSize(12);

    //   for (let index = 0; index < petLogs.length; index++) {
    //   //  if(petLogs[index].petID==pets[pindex]._id)

    //     var np=index%4
    //      var k= np*200;
    //     doc.text(20,k+60,"Log Date:    "+  userfrDateTime(petLogs[index].LogDate));
    //      doc.text(20, k+80,"Activity Level:    "+ petLogs[index].ActivityLevel);
    //     doc.text(20, k+100,"Urine Amount:     "+ petLogs[index].UrineAmount);
    //     doc.text(20, k+120,"Stool Amount:    "+ petLogs[index].StoolAmount);
    //     doc.text(20, k+140,"Stool Appearance:    "+ petLogs[index].StoolAppearance);
    //       doc.text(20, k+160,"Stool Appearance:   "+ petLogs[index].StoolAppearance);
    //     doc.text(20, k+180,"Notes:   "+ petLogs[index].Notes);
    //  //   doc.text(20, k+160,petLogs[index].Wheight);
    //   if (np==3)
    //   doc.addPage();
    //   }
    // }

    //     doc.save("exportlog.pdf");
  };


  return (
    <div>

      <Typography variant="h1-poppins-semibold" color="almost-black" >


      </Typography>
      <Header/>
      
      <div className={styles.petLogContainer}  class="export" style={myComponentStyle}>
   
<div  style={logheaderStyle}>

</div>

   <div className={styles.petLogHeader}>
        Pet Logs
      </div>  
       {loading ? (
          <p>Loading...</p>
        ) : (


          <div >


            <ul >
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

          </div>

        )}
 
      </div>
       <Button onClickHandler={generatePDF} variant="yellow" type="submit" label={"Export"} size="dk-md-s" />

    </div>

  );
};

export default ExportpetLog;
