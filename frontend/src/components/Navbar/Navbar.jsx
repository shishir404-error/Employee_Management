import {
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaEye,
} from "react-icons/fa";
import "./Navbar.css";
import * as XLSX from "xlsx";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/authApi"; // ✅ Tumhari service file se import karo
import { createAsset } from "../../api/assetsApi"; // ✅ Correct file se import karo


const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Get user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser({ name: "Guest" }); // fallback
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    let assets = [];

    try {
      // ✅ JSON
      if (fileName.endsWith(".json")) {
        const text = await file.text();
        const jsonData = JSON.parse(text);
        if (!Array.isArray(jsonData)) {
          alert("❌ Invalid JSON: must be an array.");
          return;
        }
        assets = jsonData;
      }
      // ✅ CSV or XLSX
      else if (fileName.endsWith(".csv") || fileName.endsWith(".xlsx")) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (!Array.isArray(parsedData)) {
          alert("❌ Invalid file structure.");
          return;
        }
        assets = parsedData;
      } else {
        alert("❌ Unsupported file type. Upload .json, .csv, or .xlsx");
        return;
      }

      // ✅ Send data to API
      for (const asset of assets) {
        try {
          await createAsset(asset);
        } catch (err) {
          console.error("❌ Failed to upload:", asset, err);
        }
      }

      alert("✅ Bulk upload completed.");
    } catch (err) {
      console.error("❌ Error parsing file:", err);
      alert("❌ Upload failed.");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-right">
        <label htmlFor="json-upload">
          <div className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Upload File
          </div>
        </label>
        <input
          type="file"
          id="json-upload"
          accept=".json,.csv,.xlsx"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        <div className="user-dropdown">
          <div className="user-profile" tabIndex={0}>
            <div className="user-avatar">
              <FaUserCircle size={32} />
            </div>
            <div className="user-details">
              <span className="user-name">{user ? user.name : "Loading..."}</span>
              <span className="user-role">Admin</span>
            </div>
            <FaChevronDown size={12} className="dropdown-arrow" />
          </div>

          {/* Dropdown on Hover */}
          <div className="user-menu">
            <div className="menu-header">
              <span className="user-name">{user ? user.name : "Loading..."}</span>
              <span className="user-role"> &nbsp; AD.</span>
            </div>
            <Link to="/employees" className="user-action">
              <FaEye size={14} /> View Profile
            </Link>
            <button className="user-action" onClick={handleLogout}>
              <FaSignOutAlt size={14} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
