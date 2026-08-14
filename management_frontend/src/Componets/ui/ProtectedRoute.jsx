import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  // Profile check এখনো শেষ হয়নি
  if (loading) {
    return null;
  }

  // Login করা নেই
  if (!user) {
    return <Navigate to="/signIn" replace />;
  }

  // Role check
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/signIn" replace />;
  }

  // Login + authorized role
  return children;
};

export default ProtectedRoute;