import axiosInstance from "./axiosInstance";

// Get all designations
export const getAllDesignations = () => axiosInstance.get("/designations");

// Create new designation
export const createDesignation = (data) => axiosInstance.post("/designations", data);

