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
  span {
    color: #54656f;
    text-transform: uppercase;
    a {
      color: #1F3E5B;
      text-decoration: none;
      font-weight: bold;
    }
  }
button{
  margin: auto;
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
  @media only screen and (min-width: 960px) and (max-width: 1680px) {
    .bg-illustration {
      width: 50vw;
      -webkit-animation: none;
              animation: none;
    }
  
    .signinup {
      width: 50vw;
    }
  }
  }

  @media only screen and (max-width: 960px)
  {
    .parent {
      display: grid;
      grid-template-columns: auto ;
    }
    .bg-illustration {
      
     display: none;
    }
  }
`;
