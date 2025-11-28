import 'leaflet/dist/leaflet.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/home/HomePage"
import AuthPanel from "./components/auth/AuthPanel";
import MapPage from "./pages/MapPage";
import BaseProfil from './components/profile/BaseProfil';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPanel/>} />  
        <Route path="/map" element={<MapPage/>} />
        <Route path="/profile" element={<BaseProfil/>} />
        </Routes>
    </Router>
  );
}

export default App;