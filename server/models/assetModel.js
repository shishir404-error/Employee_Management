import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  name: { type: String, required: true },
  empID: { type: String, required: true },
  designation: { type: String },
  aadhaarName: { type: String },
  productNo: { type: String },
  serialNo: { type: String },
  modelNo: { type: String },
  phoneNo: { type: String },
  imeiNo: { type: String },
  dateOfJoining: { type: Date },
  address: { type: String },
  topImage: { type: String },         // store image URL
  middleImage: { type: String },
  bottomImage: { type: String },
  chargerImage: { type: String },
  mouseImage: { type: String },
  phoneImage: { type: String }
});

export const Asset = mongoose.model("Asset", assetSchema);
