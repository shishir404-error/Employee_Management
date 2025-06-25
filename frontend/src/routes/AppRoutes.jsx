import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Assets from "../pages/Assets";

import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";

import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute"; // 👈 Add this import
import Dashboard from "../pages/Dashboard";
import AssetDetail from "../components/assets/AssetsDetails";
import ViewEmployees from "../pages/ViewEmployees";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 Public Auth Routes wrapped in PublicRoute */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/verify" element={<PublicRoute><VerifyOtp /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

      {/* 🔐 Protected Routes under layout */}
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />
         <Route
          path="/assets/:id"
          element={
            <ProtectedRoute>
              <AssetDetail />
            </ProtectedRoute>
          }
        />
                <Route path="/employees"     
                element={
            <ProtectedRoute>
              <ViewEmployees/>
            </ProtectedRoute>
          }/>

      </Route>
     

      {/* 404 fallback */}
      <Route path="*" element={<p className="text-center mt-20 text-xl">404 - Page Not Found</p>} />
    </Routes>
  );
};

export default AppRoutes;
