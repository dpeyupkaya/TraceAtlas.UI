import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/home/HomePage"
import AuthPanel from "./components/auth/AuthPanel";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPanel/>} />  
            </Routes>
    </Router>
  );
}

export default App;