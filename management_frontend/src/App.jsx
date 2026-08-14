import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Admin from "./pages/Admin_Dashboard/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>

          {/* ------------- PUBLIC ROUTES  */}

          <Route path="/signIn" element={<SignIn />} />

          <Route path="/signUp" element={<SignUp />} />

          <Route path="/VerifyOTP" element={<VerifyOTP />} />

          <Route path="/ResendOTP" element={<ResendOTP />} />

          <Route
            path="/ForgotPassword"
            element={<ForgotPassword />}
          />

          <Route
            path="/ResetPassword"
            element={<ResetPassword />}
          />


          {/* --------- ADMIN ROUTES  */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* /admin */}
            <Route index element={<Admin />} />

          </Route>

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;