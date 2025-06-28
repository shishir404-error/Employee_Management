import { Designation } from "../models/designationModal.js";

// ➕ Create
export const createDesignation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const existing = await Designation.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: "Designation already exists" });
    }

    const designation = await Designation.create({ name });
    res.status(201).json({ success: true, designation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📄 Get All
export const getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.status(200).json({ success: true, designations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
