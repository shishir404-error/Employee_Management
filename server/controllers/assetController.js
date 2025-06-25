import { Asset } from "../models/assetModel.js";

// ➕ Create
export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json({ success: true, asset });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📄 Read All
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find(); // 👈 sabhi assets la raha hai from DB
    res.status(200).json({ success: true, assets }); // 👈 return in JSON
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); // 👈 error response
  }
};


// 📝 Update
export const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, asset });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Delete
export const deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Asset deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
