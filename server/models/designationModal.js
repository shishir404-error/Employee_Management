import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export const Designation = mongoose.model("Designation", designationSchema);
