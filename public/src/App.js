import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./utils/variable.css";
import InsuranceDetails from "./pages/InsuranceDetails/InsuranceDetails";
import ListInsurances from "./pages/ListInsurances/ListInsurances";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="/insurances" element={<ListInsurances />} />
        <Route path="/insurance/details" element={<InsuranceDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}
