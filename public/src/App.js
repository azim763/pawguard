import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./utils/variable.css";
import InsuranceDetails from "./pages/InsuranceDetails/InsuranceDetails";
import ListInsurances from "./pages/ListInsurances/ListInsurances";

import ListClinics from "./pages/ListClinics/ListClinics";
import AboutUs from "./pages/AboutUs/AboutUs";
import InsuranceSearch from "./pages/InsuranceSearch/InsuranceSearch";
import Home from "./pages/Home/Home";
import PetPage from "./pages/petPage/petPage";
import IndividualClinic from "./pages/IndividualClinic/IndividualClinic";
import AddPet from "./pages/AddPet/AddPet";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="/getinsurances" element={<InsuranceSearch />} />
        <Route path="/insurances" element={<ListInsurances />} />
        <Route path="/insurance/details/:companyId" element={<InsuranceDetails />} />
        <Route path="/clinic/details/:clinicId" element={<IndividualClinic />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clinics" element={<ListClinics />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/home" element={<Home />} />
        <Route path="/petPage" element={<PetPage />} />
        <Route path="/addPet" element={<AddPet />} />
      </Routes>
    </BrowserRouter>
  );
}
