import axiosInstance from "./axiosInstance";

// Get all assets
export const getAllAssets = () => axiosInstance.get("/assets");

// Get single asset
export const getAssetById = (id) => axiosInstance.get(`/assets/${id}`);

// Create new asset
export const createAsset = (data) => axiosInstance.post("/assets", data);

// Update asset
export const updateAsset = (id, data) => axiosInstance.put(`/assets/${id}`, data);

// Delete asset
export const deleteAsset = (id) => axiosInstance.delete(`/assets/${id}`);
