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
import Typography from "../components/Typography/Typography";
import styles from "./login.module.css";

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
    <div className={styles.signUpContainer}>
      <Header />
      <FormContainer>
        <div class="bg-illustration"></div>
        <div class="signinup">
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              {/* <img src={Logo} alt="logo" /> */}
              <Typography variant="h2-poppins-semibold" color="almost-black">
                Sign In
              </Typography>
            </div>
            <div className={styles.usernameContainer}>
              <Typography variant="body2-poppins-medium">Username</Typography>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                onChange={(e) => handleChange(e)}
                min="3"
              />
            </div>
            <div className={styles.pwContainer}>
              <Typography variant="body2-poppins-medium">Password</Typography>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* <button type="submit">Log In</button> */}
            {/* <Button color={"red"} text={"Add"} onClick={"onAdd"} /> */}
            <div className={styles.forgetPW}>
              <Typography variant="body1-poppins-semibold">
                <Link to="/forgetpassword">Forget Password</Link>
              </Typography>
            </div>
            <div className={styles.submitContainer}>
              <Button
                variant="yellow"
                type="submit"
                label={"Log In"}
                size="dk-md"
              />
            </div>
            <div className={styles.createAcContainer}>
              <Typography variant="body2-poppins-medium">
                Don't have an account ?{" "}
              </Typography>
              <Typography variant="body1-poppins-semibold">
                <Link to="/register">Create One.</Link>
              </Typography>
            </div>
          </form>
        </div>
      </FormContainer>
      <ToastContainer />
    </div>
  );
}

const FormContainer = styled.div`
  height: 92vh;
  width: 100vw;
  display: grid;
  // flex-direction: column;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  // gap: 1rem;
//  align-items: center;
 // background-color: #dedfdc;
 
 
 @media screen and (max-width: 960px)
 {
  grid-template-columns: 1fr;
 }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 30px;
    img {
      height: 5rem;
    }
  }

  form {
    display: grid;
    // flex-direction: column;
    gap: 12px;
    // background-color: #fff;
    // border-radius: 2rem;
    // padding: 5rem;
    // overflow: scroll;
    // scrollbar-width: none;
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

.signinup
{
  background-color: var(--off-white);
  min-width: 280px;
  justify-content: center;
  display: grid;
  grid-template-column: 1fr 1fr
  gap: 1rem;
  padding: 150px 30px;
  -moz-box-align: center;
  align-items: center;
 // background-color: rgb(222, 223, 220);
  flex-direction: column;
  -moz-box-pack: center;
  justify-content: center;
  // height: 88vh;
}
  .parent{
    display: grid;

  grid-template-columns: auto 1fr;
  }

  .bg-illustration {
    position: relative;
    height: 100%;
    // grid-rows: 1/-1
    // width: 50vw;
    background: url("${loginbackground}") no-repeat center center scroll;
    background-size: cover;
    float: left;
  background-position: center;
  overflow: hidden;
    
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
      // width: 50vw;
      -webkit-animation: none;
              animation: none;
    }
  
    .signinup {
      // width: 50vw;
      height: 100%
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

    .signinup{
      padding: 0 20%;
    }

  }
`;
