import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Logout from "../components/Logout";
import Header from "../components/Header/header"

 import Background from "../assets/background2.gif";
import Graph from "../components/Graph/Graph";

import { searchPetsByUserIDRoute } from '../utils/APIRoutes.js'


export default function Chat() {
  const [pets,setPets] =useState([]);
  
  useEffect(async() => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
  const response = await axios.get(searchPetsByUserIDRoute,{params:{userID:data._id}})
  setPets(response.data);
}
,[]);
  
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  return (

    <>
            <Header></Header>
      <Container>
        <div className="container">
        <Logout />
        <Graph/>
        <Graph/>

        </div>
      </Container>
      
    </>
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
  .container {
    height: 85vh;
    width: 85vw;
  /*  background-image: url("${Background}"); */
    background-repeat: repeat;
    
    background-color:#efeae2;
    /*   display: grid;  */
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
