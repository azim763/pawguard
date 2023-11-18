import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import loginbackground from "../assets/images/loginback.jpeg";
import Button from "../components/Button/Button";
import Header from "../components/Header/header";
import styles from "./register.module.css";
import Typography from "../components/Typography/Typography";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { firstname, lastname, password, confirmPassword, username, email } =
      values;
    if (firstname.length < 1) {
      toast.error("First name is required.", toastOptions);
      return false;
    } else if (lastname.length < 1) {
      toast.error("Last name is required.", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { firstname, lastname, email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        firstname,
        lastname,
        username,
        email,
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
        navigate("/addPet");
      }
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <div class="parent clearfix">
          <div class="bg-illustration"></div>
          <div class="signinup">
            <form action="" onSubmit={(event) => handleSubmit(event)}>
              <div className="brand">
                <Typography variant="h2-poppins-semibold">
                  Create Account
                </Typography>
              </div>
              <div className="name">
                <div>
                  <Typography variant="body2-poppins-medium">
                    First Name
                  </Typography>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstname"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <Typography variant="body2-poppins-medium">
                    Last Name
                  </Typography>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastname"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div>
                <Typography variant="body2-poppins-medium">Username</Typography>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <Typography variant="body2-poppins-medium">Email</Typography>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <Typography variant="body2-poppins-medium">Password</Typography>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <Typography variant="body2-poppins-medium">
                  Confirm Password
                </Typography>
                <input
                  type="password"
                  placeholder="Confirm your Password"
                  name="confirmPassword"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.submitBtnContainer}>
                <Button
                  variant="yellow"
                  type="submit"
                  label={"Create Account"}
                  size="dk-md"
                />
              </div>

              <div className={styles.loginContainer}>
                <Typography variant="body2-poppins-medium">
                  Already have an account?
                </Typography>
                <Typography variant="body1-poppins-semibold">
                  <Link to="/login">Sign In</Link>
                </Typography>
              </div>
            </form>
          </div>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 92vh;
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
    margin-bottom: 5px;
    img {
      height: 5rem;
    }
    h1 {
      color: #54656f;
     // text-transform: uppercase;
      font-size:2.2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    // background-color: #fff;
    // border-radius: 2rem;
    // padding: 2rem;
    max-width: 600px;
    // overflow: scroll;
    scrollbar-width: none;
  }
  input {
    background-color: var(--white-white);
    padding: .7rem;
    border: 0.1rem solid var(--almost-black);
    border-radius: 0.4rem;
    color: var(--small-text-gray);
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
  min-width: 320px;
  justify-content: center;
  display: flex;
  gap: 1rem;
  -moz-box-align: center;
  align-items: center;
 // background-color: rgb(222, 223, 220);
  flex-direction: column;
  -moz-box-pack: center;
  justify-content: center;
  height: 92vh;
}
  .parent{
    display: grid;

  grid-template-columns: auto 1fr;
  }
  .bg-illustration {
    position: relative;
    height: 92vh;
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
.name{
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr ;
}

  @media only screen and (min-width: 960px) and (max-width: 1680px) {
    .bg-illustration {
      width: 50vw;
      -webkit-animation: none;
              animation: none;
    }
  
    .signinup {
      width: 50vw;
      // padding: 7% 5% 0;
    }
  }
  }

  @media only screen and (max-width: 960px)
  {
    .name{
      gap: 1.2rem;
      // grid-template-columns: auto ;
    }
    .parent {
      display: grid;
      grid-template-columns: auto ;
    }
    .bg-illustration {
      
     display: none;
    }


  }

  @media only screen and (max-width: 800px)
  {
  form{
 padding: 3% 0px
  } 
  @media only screen and (max-width: 770px)
  {
  form{
    padding: 25% 3% 0;
  }

  @media only screen and (max-width: 500px)
  {
  .name{
    grid-template-columns: auto ;
  }
  form{
    padding: 60% 4% 0;
  }
}
`;
