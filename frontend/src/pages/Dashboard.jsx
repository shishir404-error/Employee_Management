import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, Laptop, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/assets");
      const data = await response.json();
      setAssets(data.assets);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load assets");
      setLoading(false);
    }
  };

  const totalAssets = assets.length;
  const uniqueEmployees = new Set(assets.map((a) => a.empID)).size;
  const avgAssetsPerEmp = uniqueEmployees > 0 ? (totalAssets / uniqueEmployees).toFixed(1) : 0;

  const assetsByDesignation = Object.entries(
    assets.reduce((acc, a) => {
      acc[a.designation] = (acc[a.designation] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Asset Dashboard</h1>
        <button
          onClick={fetchAssets}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex flex-col items-start">
          <Laptop className="text-blue-500 mb-2" />
          <span className="text-sm text-gray-500">Total Assets</span>
          <p className="text-2xl font-bold">{totalAssets}</p>
        </div>
        <div className="bg-white p-4 rounded shadow flex flex-col items-start">
          <Users className="text-green-500 mb-2" />
          <span className="text-sm text-gray-500">Total Employees</span>
          <p className="text-2xl font-bold">{uniqueEmployees}</p>
        </div>
     
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Assets by Designation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetsByDesignation}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Designation Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetsByDesignation}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {assetsByDesignation.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-6">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default Dashboard;
