import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, searchPetsByUserIDRoute, getAllPetFoodsRoute,host } from "../../utils/APIRoutes";
import Logout from "../../components/Logout";
import Header from "../../components/Header/header";
import DashCalendar from "../../components/Calendar/calendar";
import Background from "../../assets/background2.gif";
import Graph from "../../components/Graph/Graph";
import styles from "./DashBoard.module.css"


export default function Chat() {
  const [pets,setPets] =useState([]);
  const [foods,setFoods] =useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        const response = await axios.get(searchPetsByUserIDRoute, { params: { userID: data._id } });
        setPets(response.data);
      } catch (error) {
        // Handle any errors here
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFood = await axios.get(getAllPetFoodsRoute);
        setFoods(responseFood.data);
        console.log(responseFood.data);
      } catch (error) {
        console.error("Error fetching pet foods:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);

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
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // useEffect(async() => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);
  const mealPerDayArray = foods.map(food => food.MealPerDay);
  const foodDateArray = foods.map(food => food.FoodDate);
  return (
    <div>
      <Header/>
        <div className={styles.dashboardContainer}>
          <Logout />
          
          <div className={styles.dashboardPetCard}>

          </div>
          <div className={styles.dashboardGraph}>
            {mealPerDayArray  && foodDateArray&& (
              <Graph names={mealPerDayArray} values={foodDateArray} />)}
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
