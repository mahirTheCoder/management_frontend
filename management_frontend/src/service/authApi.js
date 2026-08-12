import api from "./api";

export const signup = (data) => {
  return api.post("/auth/signup", data);
};

export const verifyOtp = (data) => {
  return api.post("/auth/verify-otp", data);
};

export const resendOtp = (data) => {
  return api.post("/auth/resend-otp", data);
};

export const signin = (data) => {
  return api.post("/auth/signin", data);
};

export const getProfile = () => {
  return api.get("/auth/getProfile");
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};