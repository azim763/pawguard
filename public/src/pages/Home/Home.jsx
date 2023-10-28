import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Graph from '../../components/Graph/Graph'
import TotalPets from '../../components/TotalPets/TotalPets'
import {
  searchPetsByUserIDRoute,
} from "../../utils/APIRoutes.js";

const Home = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (storedData) {
          const data = JSON.parse(storedData);
          const response = await axios.get(searchPetsByUserIDRoute, {
            params: { userID: data._id },
          });
          await setPets(response.data);
          console.log(response.data); // Log the response data here
        }
      } catch (error) {
        // Handle any errors here
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      {pets && <TotalPets pets={pets}></TotalPets>}
    </div>
  )
}

export default Home
