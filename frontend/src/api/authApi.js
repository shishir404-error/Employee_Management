import axiosInstance from "./axiosInstance";

export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const registerUser = (data) => axiosInstance.post("/auth/register", data);
export const getCurrentUser = () => axiosInstance.get("/auth/me");
export const forgotPassword = (data) => axiosInstance.post("/auth/forgot-password", data);
export const resetPassword = (data) => axiosInstance.post(`/auth/reset-password`, data);
export const verifyUser = (data) => axiosInstance.post("/auth/verify", data);
