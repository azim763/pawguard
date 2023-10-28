import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, searchPetsByUserIDRoute, searchPetFoodByPetIDRoute, host } from "../../utils/APIRoutes";
import Logout from "../../components/Logout";
import Header from "../../components/Header/header";
import DashCalendar from "../../components/Calendar/calendar";
import Background from "../../assets/background2.gif";
import Graph from "../../components/Graph/Graph";
import styles from "./DashBoard.module.css"
import TotalPets from "../../components/TotalPets/TotalPets";


export default function Chat() {
  const [pets, setPets] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);

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
    const fetchData = async () => {
      if (currentUser) {
        try {
          const responsePets = await axios.get(searchPetsByUserIDRoute, {
            params: { userID: currentUser._id },
          });
          setPets(responsePets.data);

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
    const checkLoggedIn = async () => {
      const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);

      if (!storedData) {
        navigate("/login");
      } else {
        const userData = JSON.parse(storedData);
        setCurrentUser(userData);
      }
    };

    checkLoggedIn();
  }, []);


  // useEffect(async() => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);
  // const mealPerDayArray = foods.map(food => food.MealPerDay);
  // const foodDateArray = foods.map(food => food.FoodDate);
  return (
    <div>
      <Header />
      <div className={styles.dashboardContainer}>
        <Logout />
        <div className={styles.dashboardPetCard}>
          <h1>MY PETS</h1>
         
        </div>
        <div className={styles.dashboardGraph}>
        {pets && (
            <TotalPets pets={pets} onPetSelect={handlePetSelection} />
          )}
          {selectedPet && (
            <Graph
              names={foods.map((food) => food.MealPerDay)}
              values={foods.map((food) => food.FoodDate)}
            />
          )}
        </div>
        <DashCalendar />
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
  .graphStyle{
    z-index:200;
    background-color:white;
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
