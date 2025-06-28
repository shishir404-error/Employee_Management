import axiosInstance from "./axiosInstance";

export const getAllAssets = () => axiosInstance.get("/assets");
export const getAssetById = (id) => axiosInstance.get("/assets/${id}");
export const createAsset = (data) => axiosInstance.get("/assets",data);
export const updateAsset 
