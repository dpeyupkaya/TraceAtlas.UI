import 'leaflet/dist/leaflet.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

import SharedLocationPage from "./pages/SharedLocationPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/home/HomePage";
import AuthPanel from "./components/auth/AuthPanel";
import MapPage from "./pages/MapPage";
import BaseProfil from './components/profile/BaseProfil';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import ConfirmEmailPage from './components/auth/ConfirmEmailPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Contact from './components/about/Contact';
import GlobalLoader from './common/GlobalLoader';

function App() {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error"
  });

  window.__showSnackbar = (msg, severity = "error") => {
    setSnack({
      open: true,
      message: msg,
      severity
    });
  };

  return (

    <>
    <GlobalLoader />
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPanel />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<BaseProfil />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="/shared/:token" element={<SharedLocationPage />} />
        <Route path='/terms' element={<TermsPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/f' element={<Footer />} />
      </Routes>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </Router>
    </>
  );
}

export default App;
