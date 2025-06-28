import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Chip,
  Divider,
  Card,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Add,
  Person,
  Badge,
  Phone,
  CalendarToday,
  LocationOn,
  PhotoCamera,
  Search,
  Download,
  FilterList,
  SelectAll,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import axios from "axios";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";
import { useNavigate } from "react-router-dom";

export default function AssetsTable() {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  const [allDesignations, setAllDesignations] = useState([]);
  const [newDesignation, setNewDesignation] = useState("");
  const [showAddDesignation, setShowAddDesignation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    empID: "",
    designation: "",
    aadhaarName: "",
    productNo: "",
    serialNo: "",
    modelNo: "",
    phoneNo: "",
    imeiNo: "",
    dateOfJoining: "",
    address: "",
    topImage: "",
    middleImage: "",
    bottomImage: "",
    chargerImage: "",
    mouseImage: "",
    phoneImage: "",
  });

  const navigate = useNavigate();

  const uniqueDesignations = [
    ...new Set(assets.map((asset) => asset.designation).filter(Boolean)),
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    const url = await uploadImageToCloudinary(file);
    console.log("✅ Uploaded:", fieldName, url);
    setFormData((prev) => ({ ...prev, [fieldName]: url }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/api/assets/${editId}`, formData);
        alert("Asset Updated Successfully");
      } else {
        await axios.post("http://localhost:4000/api/assets", formData);
        alert("Asset Created Successfully");
      }

      setOpen(false);
      setIsEditing(false);
      setEditId(null);
      setFormData({
        name: "",
        empID: "",
        designation: "",
        aadhaarName: "",
        productNo: "",
        serialNo: "",
        modelNo: "",
        phoneNo: "",
        imeiNo: "",
        dateOfJoining: "",
        address: "",
        topImage: "",
        middleImage: "",
        bottomImage: "",
        chargerImage: "",
        mouseImage: "",
        phoneImage: "",
      });

      const res = await axios.get("http://localhost:4000/api/assets");
      setAssets(res.data.assets);
    } catch (error) {
      console.error("Error creating asset:", error);
      alert("Failed to create asset");
    }
  };

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/designations");
        const fetchedDesignations = res.data.designations.map((d) => d.name);
        setAllDesignations(fetchedDesignations);
      } catch (error) {
        console.error("Failed to fetch designations:", error);
      }
    };

    fetchDesignations();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/assets/${id}`);
      alert("Asset Deleted Successfully");
      setAssets((prev) => prev.filter((asset) => asset._id !== id));
    } catch (error) {
      console.error("Failed to delete asset:", error);
      alert("Failed to delete asset");
    }
  };

  // Checkbox handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAssets(paginatedAssets.map((asset) => asset._id));
    } else {
      setSelectedAssets([]);
    }
  };

  const handleSelectAsset = (assetId, checked) => {
    if (checked) {
      setSelectedAssets((prev) => [...prev, assetId]);
    } else {
      setSelectedAssets((prev) => prev.filter((id) => id !== assetId));
    }
  };

  // Search and filter logic
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.empID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.phoneNo?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDesignation =
        filterDesignation === "" || asset.designation === filterDesignation;

      return matchesSearch && matchesDesignation;
    });
  }, [assets, searchTerm, filterDesignation]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = filteredAssets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get unique designations for filter

  // Download functionality
  const handleDownload = () => {
    const dataToDownload =
      selectedAssets.length > 0
        ? assets.filter((asset) => selectedAssets.includes(asset._id))
        : filteredAssets;

    const csvContent = [
      [
        "Name",
        "Employee ID",
        "Designation",
        "Phone",
        "Date of Joining",
        "Address",
      ],
      ...dataToDownload.map((asset) => [
        asset.name,
        asset.empID,
        asset.designation,
        asset.phoneNo,
        asset.dateOfJoining,
        asset.address,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assets-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/assets");
        setAssets(res.data.assets);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };
    fetchAssets();
  }, []);

  const formatValue = (value) => {
    if (!value || value === "N/A") return "N/A";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formFields = [
    { key: "name", label: "Full Name", icon: <Person /> },
    { key: "empID", label: "Employee ID", icon: <Badge /> },
    { key: "designation", label: "Designation", icon: <Badge /> },
    { key: "aadhaarName", label: "Aadhaar Name", icon: <Person /> },
    { key: "productNo", label: "Product Number", icon: <Badge /> },
    { key: "serialNo", label: "Serial Number", icon: <Badge /> },
    { key: "modelNo", label: "Model Number", icon: <Badge /> },
    { key: "phoneNo", label: "Phone Number", icon: <Phone /> },
    { key: "imeiNo", label: "IMEI Number", icon: <Phone /> },
    {
      key: "dateOfJoining",
      label: "Date of Joining",
      icon: <CalendarToday />,
      type: "date",
    },
    { key: "address", label: "Address", icon: <LocationOn />, multiline: true },
  ];

  const imageFields = [
    { key: "topImage", label: "Top View" },
    { key: "middleImage", label: "Middle View" },
    { key: "bottomImage", label: "Bottom View" },
    { key: "chargerImage", label: "Charger" },
    { key: "mouseImage", label: "mouse" },
    { key: "phoneImage", label: "Phone" },
  ];

  return (
    <div className="min-h-screen w-full max-w-screen-2xl mx-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Asset Management
          </h1>
          <p className="text-slate-600 text-lg">
            Manage and track all company assets with advanced filtering
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Add className="w-5 h-5" />
          Create Asset
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
              showFilters
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
            }`}
          >
            <FilterList className="w-5 h-5" />
            Filters
          </button>

          <button
            onClick={() => setShowAddDesignation(true)}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Designation
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Download{" "}
            {selectedAssets.length > 0 ? `(${selectedAssets.length})` : "All"}
          </button>

          {/* Items per page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap gap-4">
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Designation
                </label>
                <select
                  value={filterDesignation}
                  onChange={(e) => setFilterDesignation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">All Designations</option>
                  {uniqueDesignations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterDesignation("");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddDesignation && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              placeholder="Enter new designation"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={async () => {
                if (
                  newDesignation &&
                  !allDesignations.includes(newDesignation)
                ) {
                  try {
                    // 👇 Backend pe save karo
                    await axios.post("http://localhost:4000/api/designations", {
                      name: newDesignation,
                    });

                    // 👇 Backend se updated list fetch karo
                    const res = await axios.get(
                      "http://localhost:4000/api/designations"
                    );
                    const fetchedDesignations = res.data.designations.map(
                      (d) => d.name
                    );
                    setAllDesignations(fetchedDesignations);

                    // 👇 Form data update karo
                    setFormData((prev) => ({
                      ...prev,
                      designation: newDesignation,
                    }));

                    alert("Designation saved successfully!");
                  } catch (error) {
                    console.error("Error saving designation:", error);
                    alert("Failed to save designation");
                  }
                }
                setNewDesignation("");
                setShowAddDesignation(false);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddDesignation(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-slate-600">
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredAssets.length)} of{" "}
          {filteredAssets.length} assets
          {selectedAssets.length > 0 && (
            <span className="ml-2 text-blue-600 font-medium">
              ({selectedAssets.length} selected)
            </span>
          )}
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedAssets.length === paginatedAssets.length &&
                      paginatedAssets.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Emp-ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Joining Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedAssets.map((asset, index) => (
                <tr
                  key={asset._id}
                  className={`hover:bg-slate-50 transition-colors ${
                    selectedAssets.includes(asset._id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedAssets.includes(asset._id)}
                      onChange={(e) =>
                        handleSelectAsset(asset._id, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-medium text-slate-900">
                      {asset.name}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {asset.empID}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    {asset.designation}
                  </td>
                  <td className="px-4 py-2 text-slate-600">{asset.phoneNo}</td>
                  <td className="px-4 py-2 text-slate-600">
                    {formatValue(asset.dateOfJoining)}
                  </td>
                  <td className="px-4 py-2">
                    <div
                      className="px-4 py-2 max-w-[150px] truncate text-slate-600"
                      title={asset.address}
                    >
                      {asset.address}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() =>
                          navigate(`/assets/${asset._id}`, { state: asset })
                        }
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Visibility className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setFormData(asset);
                          setIsEditing(true);
                          setEditId(asset._id);
                          setOpen(true);
                        }}
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(asset._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Delete className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-slate-50 px-4 py-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          className: "rounded-2xl",
        }}
      >
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {isEditing ? "Update Asset" : "Create New Asset"}
            </h2>
            <p className="text-slate-600">
              {isEditing
                ? "Update the asset information below"
                : "Fill in the details to create a new asset"}
            </p>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Person className="w-5 h-5" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.slice(0, 4).map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {field.label}
                    </label>

                    {field.key === "designation" ? (
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Select Designation</option>
                        {allDesignations.map((designation) => (
                          <option key={designation} value={designation}>
                            {designation}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={field.key}
                        value={formData[field.key]}
                        onChange={handleChange}
                        type={field.type || "text"}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 my-6"></div>

            {/* Product Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Badge className="w-5 h-5" />
                Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.slice(4, 9).map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      name={field.key}
                      value={formData[field.key]}
                      onChange={handleChange}
                      type={field.type || "text"}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 my-6"></div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <CalendarToday className="w-5 h-5" />
                Additional Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {formFields.slice(9).map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        name={field.key}
                        value={formData[field.key]}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    ) : (
                      <input
                        name={field.key}
                        value={formData[field.key]}
                        onChange={handleChange}
                        type={field.type || "text"}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 my-6"></div>

            {/* Image Uploads */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <PhotoCamera className="w-5 h-5" />
                Asset Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {imageFields.map((field) => (
                  <div
                    key={field.key}
                    className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors"
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, field.key)}
                      accept="image/*"
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {formData[field.key] && (
                      <div className="mt-2">
                        <img
                          src={formData[field.key]}
                          alt={field.label}
                          className="w-full h-24 object-cover rounded-lg border border-slate-200"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {isEditing ? "Update Asset" : "Create Asset"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
