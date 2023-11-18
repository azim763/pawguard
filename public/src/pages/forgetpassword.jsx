import React, { useState } from "react";
import axios from "axios";
import { sendmailRoute } from "../utils/APIRoutes";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button/Button";
import Header from "../components/Header/header";
import loginbackground from "../assets/images/loginback.jpeg";
import { useLocation } from "react-router-dom";
import Typography from "../components/Typography/Typography";
import styles from "./forgetPassword.module.css";

//console.log("hi");
const ForgetPassword = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { userID } = useParams();
  //const { rec } = useParams();

  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  //console.log("hi2");
  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { email } = values;
    // console.log(password);
    //   console.log(confirmNewPassword);
    //   console.log((password == confirmNewPassword));
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };
  // const [oldPassword, setOldPassword] = useState('');

  //   const handleChangePassword = async (event) => {
  //     // Check if the new password and confirm new password match

  //     event.preventDefault();
  //     const { email } = values;

  //     try {
  //       if (handleValidation()) {

  // //   sendmail

  //       }
  //     } catch (error) {
  //       console.error('Error sending Email:', error.message);
  //     }
  //   };

  const sendEmail = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { email } = values;
      // console.log(email);
      //  const { data } = await axios.post(`${sendmailRoute}`, {
      //   email,
      // });
      // console.log(data);

      const host = window.location.origin;
      console.log(email);
      console.log(host);
      if (handleValidation()) {
        console.log(email);
        //  console.log(userID);
        const response = await axios.post(`${sendmailRoute}`, {
          email,
          host,
        });
        //console.log(response.data);
        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        } else {
          toast.success(response.data.msg, toastOptions);
        }

        console.log(response.data);
      }
    } catch (error) {
      toast.error("Email is not valid.", toastOptions);
      console.error("Error sending email:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <FormContainer>
        <div class="parent clearfix">
          <div class="bg-illustration"></div>
          <div class="signinup">
            <form action="" onSubmit={(event) => sendEmail(event)}>
              <div className="brand">
                <Typography variant="h2-poppins-semibold">
                  Password Recovery
                </Typography>

                <div>
                  <Typography
                    variant="body2-poppins-medium"
                    color="small-text-gray"
                  >
                    Enter the email associated with your account and we’ll send
                    an email with instructions to reset your password.
                  </Typography>
                </div>
              </div>
              <div className={styles.emailContainer}>
                <Typography variant="body2-poppins-medium">Email</Typography>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {loading ? (
                <p>Sending Email...</p>
              ) : (
                <div className={styles.submitBtnContainer}>
                  <Button
                    variant="yellow"
                    type="submit"
                    label={"Send"}
                    size="dk-md"
                  />
                </div>
              )}
              <div className={styles.createAcContainer}>
                <Typography variant="body2-poppins-medium">
                  Don’t have account yet?
                </Typography>
                <Typography variant="body1-poppins-semibold">
                  <Link to="/register">Create Account</Link>
                </Typography>
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
display: grid;
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
    // justify-content: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 45px;
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
    display: grid;
    // flex-direction: column;
    gap: 12px;
    // background-color: #fff;
    // border-radius: 2rem;
    // padding: 5rem;
    // overflow: scroll;
    // scrollbar-width: none;
    padding: 20%;
    // justify-items: center
    
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
  min-width: 280px;
  justify-content: center;
  display: flex;
  gap: 1rem;
  -moz-box-align: center;
  align-items: center;
 // background-color: rgb(222, 223, 220);
  flex-direction: column;
  -moz-box-pack: center;
  justify-content: center;
  height: 88vh;
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
    }
  }
  }

  @media only screen and (max-width: 1300px) {
    form {
      padding: 10%;
    }

  @media only screen and (max-width: 960px)
  {
    grid-template-columns: auto; 
    .parent {
      display: grid;
      grid-template-columns: auto ;
    }
    .bg-illustration {
      
     display: none;
    }

    form {
      padding: 60px 20% 0;
    }
  }

  @media only screen and (max-width: 750px) {
    form {
      padding: 200px 20% 0;
    }

    @media only screen and (max-width: 600px) {
      form {
        padding: 200px 5% 0;
      }

`;

export default ForgetPassword;
