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
  searchPetAppointmentsByPetIDRoute,
  host,
  searchPetAppointmentsByUserIDRoute,
  searchPetMedicationsByUserIDRoute,
  searchPetMedicationsByPetIDRoute,
} from "../../utils/APIRoutes";
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
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoadPage from "../loadPage";
import LoadingOverlay from "react-loading-overlay-ts";

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [foods, setFoods] = useState([]);

  const [selectedPet, setSelectedPet] = useState("");
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isUserData, setIsUserData] = useState(false);
  const [medication, setMedication] = useState([]);
  const [petLog, setPetLog] = useState([]);
  const [appointmentsOfSelectedPet, setAppointmentsOfSelectedPet] = useState(
    []
  );
  const [isLoadingData, setLoadingData] = useState(false);
  // FOR CALENDAR
  const [appointments, setAppointment] = useState([]);
  const [userMed, setUserMed] = useState([]);

  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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
        setIsUserData(true);
      }
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        const responsePets = await axios.get(searchPetsByUserIDRoute, {
          params: { userID: currentUser._id },
        });
        setPets(responsePets.data);
        localStorage.setItem("petsData", JSON.stringify(responsePets.data));

        if (responsePets.data.length > 0) {
          setSelectedPet(responsePets.data[0]);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoadingData(false);
        document.body.style.overflow = "unset";
        document.body.style.height = "auto";
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    if (isUserData) {
      const fetchData = async () => {
        try {
          const responseApt = await axios.get(
            searchPetAppointmentsByUserIDRoute,
            {
              params: { UserID: currentUser._id },
            }
          );
          setAppointment(responseApt.data);
        } catch (error) {
          console.error("Error fetching pet appointment:", error);
        }
      };

      fetchData();
    }
  }, [isUserData, selectedPet]);

  useEffect(() => {
    if (isUserData) {
      const fetchData = async () => {
        try {
          const userMed = await axios.get(searchPetMedicationsByUserIDRoute, {
            params: { UserID: currentUser._id },
          });
          setUserMed(userMed.data);
        } catch (error) {
          console.error("Error fetching medication by user:", error);
        }
      };

      fetchData();
    }
  }, [isUserData, currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFood = await axios.get(searchPetFoodByPetIDRoute, {
          params: { PetID: selectedPet._id },
        });
        setFoods(responseFood.data);
      } catch (error) {
        console.error("Error fetching pet foods:", error);
      }
    };

    fetchData();
  }, [selectedPet]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAppointment = await axios.get(
          searchPetAppointmentsByPetIDRoute,
          {
            params: { PetID: selectedPet._id },
          }
        );
        setAppointmentsOfSelectedPet(responseAppointment.data);
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
        });
        setPetLog(response.data);
      } catch (error) {
        console.error("Error fetching pet foods:", error);
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

        const filteredMed = responseMed.data.filter((med) => {
          const medDate = new Date(med.MedicationDate);
          const daysToAdd = parseInt(med.MedicationPeriod, 10);

          const targetDate = new Date(medDate);
          targetDate.setDate(medDate.getDate() + daysToAdd);
          return targetDate >= currentDate;
        });
        setMedication(filteredMed);
      } catch (error) {
        console.error("Error fetching pet medication:", error);
      }
    };

    fetchData();
  }, [selectedPet]);

  return (
    <LoadingOverlay
      className={styles.Loader}
      active={isLoadingData}
      spinner={<LoadPage />}
      // text="Loading your content..."
    >
      <div>
        <Header />
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardPetCard}>
            <Typography variant="body1-poppins-semibold" color="dark-blue">
              My Pets
            </Typography>
            <div className={styles.petCardList} styles={{ marginTop: "50px" }}>
              {pets &&
                pets.map((pet) => (
                  <Link to="/petPage" state={{ selectedPetID: pet._id }}>
                    <PetSelection
                      styles={{ marginBottom: "20px" }}
                      PetImageData={pet.PetImageName}
                      PetName={pet.PetName}
                      selectedPet={selectedPet}
                    />
                  </Link>
                ))}
            </div>
            <Link to="addPet">
              <PlusSVG width="60" height="60" />
            </Link>
          </div>

          <div className={styles.midCalendarContainer}>
            <div className={styles.middleContainer}>
              <div className={styles.middleTitle}>
                <Typography variant="h1-poppins-semibold" color="dark-blue">
                  {selectedPet && <div>{selectedPet.PetName}'s Overview</div>}
                </Typography>
                {pets && (
                  <TotalPets
                    pets={pets}
                    selectedPet={selectedPet}
                    onPetSelect={handlePetSelection}
                  />
                )}
              </div>
              <div className={styles.petSummaryCards}>
                <DashMedicineCard numOfMedicine={medication.length} />
                <DashAptCard numOfApt={appointmentsOfSelectedPet.length} />
              </div>
              <div className={styles.dashboardGraph}>
                <Carousel
                  showStatus={false}
                  showIndicators={false}
                  renderArrowPrev={(clickHandler, hasPrev) => {
                    return (
                      <div
                        className={`carousel-arrow carousel-arrow-left ${
                          hasPrev ? "" : "hidden"
                        }`}
                        onClick={clickHandler}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          zIndex: "99",
                          // textDecoration: "underline",
                        }}
                      >
                        {hasPrev ? (
                          <>
                            <div className={styles.graphNav}>
                              <FontAwesomeIcon
                                icon={faArrowLeft}
                                className={styles.marginIcon}
                              />
                              <Typography
                                variant="detailtext2-poppins-medium"
                                color="dark-blue"
                              >
                                Meal Record
                              </Typography>
                            </div>
                            <hr className={styles.underline}></hr>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  }}
                  renderArrowNext={(clickHandler, hasNext) => {
                    return (
                      <div
                        className={`carousel-arrow carousel-arrow-right ${
                          hasNext ? "" : "hidden"
                        }`}
                        onClick={clickHandler}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          // zIndex: "999",
                          // textDecoration: "underline",
                          marginBottom: "30px",
                        }}
                      >
                        {hasNext ? (
                          <>
                            <div className={styles.graphNav}>
                              <Typography
                                variant="detailtext2-poppins-medium"
                                color="dark-blue"
                              >
                                Weight Record
                              </Typography>
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className={styles.marginIconArr}
                              />
                            </div>
                            <hr className={styles.underline}></hr>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  }}
                >
                  <div>
                    <div className={styles.graphTitle}>
                      <Typography variant="body2-poppins-medium">
                        Weekly Meal Record
                      </Typography>
                    </div>
                    <div>
                      {foods.length > 0 ? (
                        selectedPet && (
                          <div className={styles.graphContainerMain}>
                            <Graph
                              names={foods.map((food) => food.QuantityPerMeal)}
                              values={foods.map((food) => food.FoodDate)}
                              label="Meal"
                              startRange={100}
                              endRange="auto"
                            />
                          </div>
                        )
                      ) : (
                        <div className={styles.graphNoRecord}>
                          No record available
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={styles.graphTitle}>
                      <Typography variant="body2-poppins-medium">
                        Weekly Weight Record
                      </Typography>
                    </div>
                    {foods.length > 0 ? (
                      selectedPet && (
                        <div className={styles.graphContainerMain}>
                          <Graph
                            names={petLog.map((petLog) => petLog.Weight)}
                            values={petLog.map((petLog) => petLog.LogDate)}
                            label="Weight"
                            startRange={10}
                            endRange="auto"
                          />
                        </div>
                      )
                    ) : (
                      <div className={styles.graphNoRecord}>
                        No record available
                      </div>
                    )}
                  </div>
                </Carousel>
              </div>
            </div>
            <div className={styles.calendarContainer}>
              {pets && userMed && appointments && (
                <DashCalendar
                  petAppointments={appointments}
                  petMedications={userMed}
                  pets={pets}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
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
