import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Componets/ui/ProtectedRoute";

// Auth
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResendOTP from "./pages/Auth/ResendOTP";
import ResetPassword from "./pages/Auth/ResetPassword";

// Admin
import AdminLayout from "./Componets/Layout/AdminLayout";
import Admin from "./pages/Admin_Dashboard/Admin.jsx";
import Admin_Details from "./Componets/Admin/Admin_Details.jsx";

// -- Payment
import Payments from "./pages/payment/payments.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ------------- PUBLIC ROUTES ------------- */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/VerifyOTP" element={<VerifyOTP />} />
          <Route path="/ResendOTP" element={<ResendOTP />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          {/* ------------- ADMIN ROUTES ------------- */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Admin />} />
            <Route path="/admin-details" element={<Admin_Details />} />


            {/* SSLCommerz Success */}
            <Route path="/paymentSuccess" element={<Payments />} />

            {/* SSLCommerz Fail */}
            {/* <Route path="paymentFail" element={<Payments />} /> */}

            {/* SSLCommerz Cancel */}
            {/* <Route path="paymentCancel" element={<Payments />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
