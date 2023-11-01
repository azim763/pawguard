import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import Button from "../components/Button/Button";
import Header from "../components/Header/header";
import loginbackground from "../assets/images/loginback.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/addPet");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
<Header/>
      <FormContainer>


      <div class="parent clearfix">
    <div class="bg-illustration">
      {/* <img src="https://i.ibb.co/Pcg0Pk1/logo.png" alt="logo"/>

      <div class="burger-btn">
        <span></span>
        <span></span>
        <span></span>
      </div> */}

    </div>
<div class="signinup">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>Sign In</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {/* <button type="submit">Log In</button> */}
          {/* <Button color={"red"} text={"Add"} onClick={"onAdd"} /> */}
          <Button variant="yellow" type="submit" label={"Log In"} size="dk-md-s" />
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
        </div>
        </div> 
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
//  align-items: center;
 // background-color: #dedfdc;
 
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #54656f;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    // background-color: #fff;
    // border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #54656f;
    border-radius: 0.4rem;
    color: #54656f;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  // button {
  //   background-color: #01a783;
  //   color: white;
  //   padding: 1rem 2rem;
  //   border: none;
  //   font-weight: bold;
  //   cursor: pointer;
  //   border-radius: 0.4rem;
  //   font-size: 1rem;
  //   text-transform: uppercase;
  //   &:hover {
  //     background-color: #01a783;
  //   }
  // }
  span {
    color: #54656f;
    text-transform: uppercase;
    a {
      color: #1F3E5B;
      text-decoration: none;
      font-weight: bold;
    }
  }

.signinup
{

  background-color: var(--off-white);

  min-width: 480px;
  justify-content: center;
  display: flex;
  gap: 1rem;
  -moz-box-align: center;
  align-items: center;
 // background-color: rgb(222, 223, 220);
  flex-direction: column;
  -moz-box-pack: center;
  justify-content: center;
  height: 100vh;


}
  .parent{
    display: grid;

  grid-template-columns: auto 1fr;
  }
  .bg-illustration {
    position: relative;
    height: 100vh;
    width: 894px;
    background: url("${loginbackground}") no-repeat center center scroll;
    background-size: cover;
    float: left;
    -webkit-animation: bgslide 2.3s forwards;
            animation: bgslide 2.3s forwards;
  }
  .bg-illustration img {
    width: 248px;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    height: auto;
    margin: 19px 0 0 25px;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1680px) {
    .bg-illustration {
      width: 50vw;
      -webkit-animation: none;
              animation: none;
    }
  
    .signinup {
      width: 50vw;
    }
  
   
  }


  @media only screen and (max-width: 1024px) {
    body {
      overflow-x: hidden;
    }
  
    @-webkit-keyframes slideIn {
      from {
        left: -100%;
        opacity: 0;
      }
      to {
        left: 0;
        opacity: 1;
      }
    }
  
    @keyframes slideIn {
      from {
        left: -100%;
        opacity: 0;
      }
      to {
        left: 0;
        opacity: 1;
      }
    }
    .bg-illustration {
      float: none;
      background: url("https://i.ibb.co/rwncw7s/bg-mobile.png") center center;
      background-size: cover;
      -webkit-animation: slideIn 0.8s ease-in-out forwards;
              animation: slideIn 0.8s ease-in-out forwards;
      width: 100%;
      height: 190px;
      text-align: center;
    }
    .bg-illustration img {
      width: 100px;
      height: auto;
      margin: 20px auto !important;
      text-align: center;
    }
    .bg-illustration .burger-btn {
      left: 33px;
      top: 29px;
      display: block;
      position: absolute;
    }
    .bg-illustration .burger-btn span {
      display: block;
      height: 4px;
      margin: 6px;
      background-color: #fff;
    }
    .bg-illustration .burger-btn span:nth-child(1) {
      width: 37px;
    }
    .bg-illustration .burger-btn span:nth-child(2) {
      width: 28px;
    }
    .bg-illustration .burger-btn span:nth-child(3) {
      width: 20px;
    }
  
   
  }


  @media only screen and (max-width: 600px)
  {
    .bg-illustration {
     display: none;
    }
  }
`;
