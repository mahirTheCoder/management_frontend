import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";


import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Componets/ui/ProtectedRoute";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResendOTP from "./pages/Auth/ResendOTP";
import ResetPassword from "./pages/Auth/ResetPassword";
import AdminLayout from "./Componets/Layout/AdminLayout";
import Admin from "./pages/Admin_Dashboard/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
                    <Route index element={<Admin/>} />

          
          {/* Public Route */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/VerifyOTP" element={<VerifyOTP />} />
          <Route path="/ResendOTP" element={<ResendOTP/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          {/* Protected Route */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
