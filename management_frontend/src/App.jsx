import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Componets/ui/ProtectedRoute";

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
          <Route path="/login" element={<SignIn />} />

          {/* Protected Route */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
