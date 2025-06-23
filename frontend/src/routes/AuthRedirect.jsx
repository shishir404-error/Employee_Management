// src/components/AuthRedirect.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isProtectedPath = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/assets");

    if (!token && isProtectedPath) {
      navigate("/login");
    }
  }, [location, navigate]);

  return null; // No UI
};

export default AuthRedirect;
