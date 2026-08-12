import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Componets/ui/ProtectedRoute";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";

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

          {/* Protected Route */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
