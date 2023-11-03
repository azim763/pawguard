import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PlusSVG from "../../components/SVG/PlusSVG";
import {
  searchPetLogsByPetIDRoute,
  searchPetsByUserIDRoute,
  searchPetFoodByPetIDRoute,
  host,
  searchPetAppointmentsByPetIDRoute,
  searchPetMedicationsByPetIDRoute,
} from "../../utils/APIRoutes";
import Logout from "../../components/Logout";
import Header from "../../components/Header/header";
import DashCalendar from "../../components/Calendar/calendar";
import Background from "../../assets/background2.gif";
import Graph from "../../components/Graph/Graph";
import styles from "./DashBoard.module.css";
import TotalPets from "../../components/TotalPets/TotalPets";
import PetSelection from "../../components/PetSelection/PetSelection";
import Typography from "../../components/Typography/Typography";
import DashMedicineCard from "../../components/DashMedicineCard/DashMedicineCard";
import DashAptCard from "../../components/DashAptCard/DashAptCard";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



export default function Chat() {
  const [pets, setPets] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [appointments, setAppointment] = useState([]);
  const [medication, setMedication] = useState([]);
  const [petLog, setPetLog] = useState([]);

  const currentDate = new Date(); // Get the current date
  const formattedCurrentDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`; // Format it as "dd-mm-yyyy"
  console.log(formattedCurrentDate);

  const filteredAppointment = appointments.filter((apt) => {
    const aptDateParts = apt.AppointmentDate.split("-");
    const aptDate = new Date(
      `${aptDateParts[2]}-${aptDateParts[1]}-${aptDateParts[0]}`
    );
    return aptDate >= currentDate; // Compare aptDate to currentDate
  });

  const filteredMedication = medication.filter((med) => {
    const medDate = new Date(med.MedicationDate);
    const daysToAdd = med.MedicationPeriod;

    const targetDate = new Date(medDate);
    targetDate.setDate(medDate.getDate() + daysToAdd);

    return targetDate >= currentDate;
  });

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
    console.log(selectedPet);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const responsePets = await axios.get(searchPetsByUserIDRoute, {
            params: { userID: currentUser._id },
          });
          setPets(responsePets.data);
          localStorage.setItem('petsData', JSON.stringify(responsePets.data));

          if (responsePets.data.length > 0) {
            setSelectedPet(responsePets.data[0]);
          }
        } catch (error) {
          console.error("Error fetching pets:", error);
        }
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFood = await axios.get(searchPetFoodByPetIDRoute, {
          params: { PetID: selectedPet._id },
        });
        setFoods(responseFood.data);
        console.log(responseFood.data);
      } catch (error) {
        console.error("Error fetching pet foods:", error);
      }
    };

    fetchData();
  }, [selectedPet]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(searchPetLogsByPetIDRoute, {
          params: { PetID: selectedPet._id },
        });        setPetLog(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching pet foods:", error);
      }
    };

    fetchData();
  }, [selectedPet]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseApt = await axios.get(searchPetAppointmentsByPetIDRoute, {
          params: { PetID: selectedPet._id },
        });
        setAppointment(responseApt.data);
        console.log(responseApt.data);
      } catch (error) {
        console.error("Error fetching pet appointment:", error);
      }
    };

    fetchData();
  }, [selectedPet]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMed = await axios.get(searchPetMedicationsByPetIDRoute, {
          params: { PetID: selectedPet._id },
        });
        setMedication(responseMed.data);
        console.log(responseMed.data);
      } catch (error) {
        console.error("Error fetching pet medication:", error);
      }
    };

    fetchData();
  }, [selectedPet]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedData = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );

      if (!storedData) {
        navigate("/login");
      } else {
        const userData = JSON.parse(storedData);
        setCurrentUser(userData);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.dashboardContainer}>
        <Logout />
        <div className={styles.dashboardPetCard}>
          <Typography variant="h2-poppins-semibold" color="dark-blue">
            My Pets
          </Typography>
          <div styles={{ marginTop: "50px" }}>
            {pets &&
              pets.map((pet) => (
                // Use a Link to navigate to individual profile PetPage
                <Link
                  to="/petPage"
                  state={{ selectedPetID: pet._id }}
                >
                  <PetSelection
                    styles={{ marginBottom: "20px" }}
                    PetImageData={pet.PetImageName}
                    PetName={pet.PetName}
                  />
                </Link>
              ))}
            <Link to="addPet">
              <PlusSVG width="60" height="60" />
            </Link>
          </div>
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.middleTitle}>
            <Typography variant="sub-h2-poppins-medium">
              {selectedPet && <div>{selectedPet.PetName}'s Overview</div>}
            </Typography>

            {pets && <TotalPets pets={pets} onPetSelect={handlePetSelection} />}
          </div>
          <div>
            <DashMedicineCard numOfMedicine={filteredMedication.length} />
          </div>
          <div>
            <DashAptCard numOfApt={filteredAppointment.length} />
          </div>
          <div className={styles.dashboardGraph}>

            <Carousel
             showStatus={false}
             showIndicators={false}
              renderArrowPrev={(clickHandler, hasPrev) => {
                return (
                  <div
                    className={`carousel-arrow carousel-arrow-left ${hasPrev ? '' : 'hidden'}`}
                    onClick={clickHandler}
                  >
                    {hasPrev ? 'Meal Record' : ''}
                  </div>
                );
              }}
              renderArrowNext={(clickHandler, hasNext) => {
                return (
                  <div
                    className={`carousel-arrow carousel-arrow-right ${hasNext ? '' : 'hidden'}`}
                    onClick={clickHandler}
                  >
                    {hasNext ? 'Weight Record' : ''}
                  </div>
                );
              }}>
              {/* {pets && <TotalPets pets={pets} onPetSelect={handlePetSelection} />} */}
              <div>
                <Typography variant="body2-poppins-medium">
                  Weekly Meal Record
                </Typography>
                {selectedPet && (
                  <Graph
                    names={foods.map((food) => food.MealPerDay)}
                    values={foods.map((food) => food.FoodDate)}
                  />
                )}
              </div>

              <div>
                <Typography variant="body2-poppins-medium">
                  Weekly Weight Record
                </Typography>
                {selectedPet && (
                  <Graph
                    names={petLog.map((petLog) => petLog.Weight)}
                    values={petLog.map((petLog) => petLog.LogDate)}
                  />
                )}
              </div>
            </Carousel>
          </div>
        </div>
        <DashCalendar petAppointments={appointments} />
      </div>
    </div>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #dedfdc;
  .graphStyle {
    z-index: 200;
    background-color: white;
  }
  .container {
    height: 85vh;
    width: 85vw;
    /*  background-image: url("${Background}"); */
    background-repeat: repeat;

    background-color: #efeae2;
    /*   display: grid;  */
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
