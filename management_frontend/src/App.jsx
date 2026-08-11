import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
