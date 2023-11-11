import React, { useState } from 'react';
import axios from 'axios';
import { changepasswordRoute } from "../utils/APIRoutes";

const ChangePassword = () => {
 // const [oldPassword, setOldPassword] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    // Check if the new password and confirm new password match
    if (Password !== confirmNewPassword) {
      alert("New password and confirm password don't match");
      return;
    }

    try {
      // Make a request to your API to update the user's password
      const userId = '653c651aa51913f23a97f48e'; // Replace with the actual user ID
      // const response = await axios.put(changepasswordRoute, {UserID: userId,
      //   Password: Password,
      // });
    const response = await axios.put(`http://localhost:5000/api/auth/changepassword/${userId}`, {
        Password,
      });

      // Handle the response (you might want to show a success message)
      console.log('Password updated successfully:', response.data);
    } catch (error) {
      // Handle errors (display an error message or redirect to a login page)
      console.error('Error updating password:', error.message);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <label>
        New Password:
        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { registerRoute } from "../utils/APIRoutes";
// import loginbackground from "../assets/images/loginback.jpeg";
// import Button from "../components/Button/Button";
// import Header from "../components/Header/header";
// import stylle from "../assets/css/common.css"

// export default function changePassword() {
//   const navigate = useNavigate();
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');


//   const [values, setValues] = useState({
//     firstname:"",
//     lastname:"",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   useEffect(() => {
//     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//       navigate("/");
//     }
//   }, []);

//   const handleChange = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const handleValidation = () => {
//     const {firstname, lastname,  password, confirmPassword, username, email } = values;
//      if (firstname.length <1) {
//       toast.error("First name is required.", toastOptions);
//       return false;
//     }
//     else if (lastname .length <1) {
//       toast.error("Last name is required.", toastOptions);
//       return false;
//     }
// else if (password !== confirmPassword) {
//       toast.error(
//         "Password and confirm password should be same.",
//         toastOptions
//       );
//       return false;
//     } else if (username.length < 3) {
//       toast.error(
//         "Username should be greater than 3 characters.",
//         toastOptions
//       );
//       return false;
//     } else if (password.length < 8) {
//       toast.error(
//         "Password should be equal or greater than 8 characters.",
//         toastOptions
//       );
//       return false;
//     } else if (email === "") {
//       toast.error("Email is required.", toastOptions);
//       return false;
//     }
//      return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (handleValidation()) {
//       const { firstname, lastname, email, username, password } = values;
//       const { data } = await axios.post(registerRoute, {
//         firstname,
//         lastname,
//         username,
//         email,
//         password,
//       });

//       if (data.status === false) {
//         toast.error(data.msg, toastOptions);
//       }
//       if (data.status === true) {
//         localStorage.setItem(
//           process.env.REACT_APP_LOCALHOST_KEY,
//           JSON.stringify(data.user)
//         );
//         navigate("/addPet");
//       }
//     }
//   };

//   return (
//     <>
//     <Header/>
//       <FormContainer>
//       <div class="parent clearfix">
//     <div class="bg-illustration">
//     </div>
// <div class="signinup">

//         <form action="" onSubmit={(event) => handleSubmit(event)}>
//           <div className="brand">
//             <h1>Create Account</h1>
//           </div>

//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             onChange={(e) => handleChange(e)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             onChange={(e) => handleChange(e)}
//           />
//           <Button variant="yellow" type="submit" label={"Create Account"} size="dk-md-s" />
//           <span>
//             Already have an account ? <Link to="/login">Login.</Link>
//           </span>
//         </form>
//         </div>
//     </div>
//       </FormContainer>
//       <ToastContainer />
//     </>
//   );
// }

// const FormContainer = styled.div`
//   height: 88vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
// //  align-items: center;
//  // background-color: #dedfdc;
 
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: #54656f;
//      // text-transform: uppercase;
//       font-size:2.2rem;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 1.2rem;
//     // background-color: #fff;
//     // border-radius: 2rem;
//     padding: 2rem;
//     max-width: 600px;
//     overflow: scroll;
//     scrollbar-width: none;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #54656f;
//     border-radius: 0.4rem;
//     color: #54656f;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #997af0;
//       outline: none;
//     }
//   }
//   span {
//     color: #54656f;
//     text-transform: uppercase;
//     a {
//       color: #1F3E5B;
//       text-decoration: none;
//       font-weight: bold;
//     }
//   }
// button{
//   margin: auto;
// }
// .signinup
// {

//   background-color: var(--off-white);
//   min-width: 480px;
//   justify-content: center;
//   display: flex;
//   gap: 1rem;
//   -moz-box-align: center;
//   align-items: center;
//  // background-color: rgb(222, 223, 220);
//   flex-direction: column;
//   -moz-box-pack: center;
//   justify-content: center;
//   height: 88vh;
// }
//   .parent{
//     display: grid;

//   grid-template-columns: auto 1fr;
//   }
//   .bg-illustration {
//     position: relative;
//     height: 88vh;
//     width: 894px;
//     background: url("${loginbackground}") no-repeat center center scroll;
//     background-size: cover;
//     float: left;
//     -webkit-animation: bgslide 2.3s forwards;
//             animation: bgslide 2.3s forwards;
//   }
//   .bg-illustration img {
//     width: 248px;
//     -webkit-user-select: none;
//        -moz-user-select: none;
//         -ms-user-select: none;
//             user-select: none;
//     height: auto;
//     margin: 19px 0 0 25px;
//   }
// .name{
//   display:grid;
//   gap: 1rem;
//   grid-template-columns: 1fr 1fr ;
// }

//   @media only screen and (min-width: 960px) and (max-width: 1680px) {
//     .bg-illustration {
//       width: 50vw;
//       -webkit-animation: none;
//               animation: none;
//     }
  
//     .signinup {
//       width: 50vw;
//     }
//   }
//   }

//   @media only screen and (max-width: 960px)
//   {
//     .name{
//       gap: 1.2rem;
//       grid-template-columns: auto ;
//     }
//     .parent {
//       display: grid;
//       grid-template-columns: auto ;
//     }
//     .bg-illustration {
      
//      display: none;
//     }
//   }
// `;
