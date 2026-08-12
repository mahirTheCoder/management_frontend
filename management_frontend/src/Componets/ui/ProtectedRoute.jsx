import React from 'react'
import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Profile check এখনো শেষ হয়নি
  if (loading) return null;

  // Login করা নেই
  if (!user) return <Navigate to="/signIn" replace />;

  // Login করা আছে
  return children;
};

export default ProtectedRoute