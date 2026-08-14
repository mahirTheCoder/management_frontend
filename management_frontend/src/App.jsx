import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Componets/ui/ProtectedRoute";
// import SignUp from "./pages/SignUp";
// import VerifyOTP from "./pages/VerifyOTP";
// import ResendOTP from "./pages/ResendOTP";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResendOTP from "./pages/Auth/ResendOTP";
import ResetPassword from "./pages/Auth/ResetPassword";
// import ResendOTP from "./pages/Auth/ResendOTP";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
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
