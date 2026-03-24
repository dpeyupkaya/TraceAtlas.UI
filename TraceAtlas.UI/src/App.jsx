import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect, lazy, Suspense } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import { Snackbar, Alert } from "@mui/material";

import GlobalLoader from './common/GlobalLoader';
import TokenAlert from './Alert';
import LandingPage from './pages/LandingPage';

const SharedLocationPage = lazy(() => import("./pages/SharedLocationPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const AuthPanel = lazy(() => import("./components/auth/AuthPanel"));
const MapPage = lazy(() => import("./pages/MapPage"));
const BaseProfil = lazy(() => import("./components/profile/BaseProfil"));
const ResetPasswordPage = lazy(() => import("./components/auth/ResetPasswordPage"));
const ConfirmEmailPage = lazy(() => import("./components/auth/ConfirmEmailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const About = lazy(() => import("./components/about/About"));
const Contact = lazy(() => import("./components/about/Contact"));
const Footer = lazy(() => import("./components/footer/Footer"));

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken"); 

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {

  useEffect(() => {
    const hostname = window.location.hostname;
    const targetDomain = "www.traceatlas.com.tr";

    if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
      return;
    }
    if (hostname === targetDomain) {
      return;
    }
    const newUrl = `https://${targetDomain}${window.location.pathname}${window.location.search}`;

    window.location.replace(newUrl);

  }, []); 

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
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="/auth" element={<AuthPanel />} />
            <Route path="/map" element={<MapPage />} />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <BaseProfil />
                </ProtectedRoute>
              } 
            />

            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/confirm-email" element={<ConfirmEmailPage />} />
            <Route path="/shared/:token" element={<SharedLocationPage />} />
            <Route path='/terms' element={<TermsPage />} />
            <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>

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