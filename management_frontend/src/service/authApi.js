import api from "./api";

// ================= AUTH =================

// Signup
export const signup = (data) => {
  return api.post("/auth/signup", data);
};

// Signin
export const signin = (data) => {
  return api.post("/auth/signin", data);
};

// Verify OTP
export const verifyOtp = (data) => {
  return api.post("/auth/verifyOtp", data);
};

// Resend OTP
export const resendOtp = (data) => {
  return api.post("/auth/resendOtp", data);
};

// ================= PROFILE =================

// Get Profile
export const getProfile = () => {
  return api.get("/auth/getProfile");
};

// Update Profile
export const updateProfile = (data) => {
  return api.put("/auth/updateProfile", data);
};

// ================= PASSWORD =================

// Forgot Password
export const forgotPassword = (data) => {
  return api.post("/auth/forgotPassword", data);
};

// Reset Password
export const resetPassword = (token, data) => {
  return api.post(`/auth/reset-password/${token}`, data);
};

// ================= LOGOUT =================

// Logout
export const logout = () => {
  return api.post("/auth/logout");
};