import React, { useState } from "react";
import axios from "axios";
import { changepasswordRoute } from "../utils/APIRoutes";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button/Button";
import Header from "../components/Header/header";
import loginbackground from "../assets/images/loginback.jpeg";
import styles from "./changePassword.module.css";
import Typography from "../components/Typography/Typography";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { userID } = useParams();
  const { rec } = useParams();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmNewPassword } = values;
    // console.log(password);
    //   console.log(confirmNewPassword);
    //   console.log((password == confirmNewPassword));

    if (password !== confirmNewPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };
  // const [oldPassword, setOldPassword] = useState('');

  const handleChangePassword = async (event) => {
    // Check if the new password and confirm new password match

    event.preventDefault();
    const { password } = values;

    try {
      if (handleValidation()) {
        const response = await axios.put(`${changepasswordRoute}/${userID}`, {
          password,
          rec,
        });
        console.log(response);

        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        } else {
          toast.success("Password updated successfully", toastOptions);
          // navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error updating password:", error.message);
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <div class="parent clearfix">
          <div class="bg-illustration"></div>
          <div class="signinup">
            <form action="" onSubmit={(event) => handleChangePassword(event)}>
              <div className="brand">
                <Typography variant="h2-poppins-semibold">
                  Password Recovery
                </Typography>
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
                  placeholder="Confirm your password"
                  name="confirmNewPassword"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.submitBtnContainer}>
                <Button
                  variant="yellow"
                  type="submit"
                  label={"Change Password"}
                  size="dk-md"
                />
              </div>
            </form>
          </div>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
height: 92vh;
width: 100vw;
// display: grid;
// flex-direction: column;
grid-template-columns: 1fr 1fr;
justify-content: center;
// gap: 1rem;
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
    //  text-transform: uppercase;
      font-size:2.2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    // background-color: #fff;
    // border-radius: 2rem;
    padding: 5%;
    overflow: scroll;
    scrollbar-width: none;
  }
  input {
    background-color: var(--white-white);
    padding: 1rem;
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
  min-width: 280px;
  justify-content: center;
  display: flex;
  gap: 1rem;
  -moz-box-align: center;
  // align-items: center;
  // padding: 10%;
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

  @media only screen and (min-width: 960px) and (max-width: 1680px) {
    .bg-illustration {
      width: 50vw;
      -webkit-animation: none;
              animation: none;
    }
  
    .signinup {
      width: 50vw;
      padding: 10%;
    }

  }
  }
 

  @media only screen and (max-width: 960px)
{
  grid-template-columns: 1fr;

  {
    .parent {
      display: grid;
      grid-template-columns: auto ;
    }
    .bg-illustration {
      
     display: none;
    }

    form{
      padding: 0;
    }

    .signinup{
      align-items: unset;
      padding: 10% 20% 0px 20%;

    }

    @media only screen and (max-width: 500px)
    {
      .signinup{
        align-items: unset;
        padding: 10% 5% 0 5%;
  
      }
  }

`;

export default ChangePassword;
