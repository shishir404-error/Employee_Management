import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AssetDetail.css";

export default function AssetDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [asset, setAsset] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    if (!asset) {
      setLoading(true);
      axios
        .get(`http://localhost:4000/api/assets/${id}`)
        .then((res) => {
          setAsset(res.data.asset);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching asset", err);
          setLoading(false);
        });
    }
  }, [id, asset]);

  const formatKey = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).replace(/_/g, " ");

  const formatValue = (key, value) => {
  if (key.toLowerCase().includes("timestamp") || key.toLowerCase().includes("date")) {
    const date = new Date(value);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return typeof value === "object" ? JSON.stringify(value, null, 2) : value || "N/A";
};


  const isImageField = (key) =>
    key.toLowerCase().includes("image") || key.toLowerCase().includes("photo");

  const isImportantField = (key) => {
    const importantFields = ["name", "title", "id", "type", "status"];
    return importantFields.some((field) => key.toLowerCase().includes(field));
  };

  if (loading) {
    return <div className="loading">Loading asset details...</div>;
  }

  if (!asset) {
    return <div className="not-found">Asset Not Found</div>;
  }


  const downloadJson = (data) => {
  const fileName = `asset-${id}.json`;
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};


  return (
    
  <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="flex items-center gap-4 mb-8">
      <div className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-semibold shadow-md">
        {asset.name?.[0] || asset.title?.[0] || "A"}
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Asset Overview</h1>
        <p className="text-gray-500">Detailed view of asset properties</p>
      </div>
    </div>
        <div className="mt-10 flex justify-end">
  <button
    onClick={() => downloadJson(asset)}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
  >
    Download
  </button>
</div>

    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Key Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(asset)
          .filter(([key]) => isImportantField(key) && !isImageField(key))
          .map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">{formatKey(key)}</p>
              <p className="text-lg font-medium text-gray-800 break-all">{formatValue(key,value)}</p>
            </div>
          ))}
      </div>
    </section>

    {Object.entries(asset).some(([key]) => isImageField(key)) && (
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(asset)
            .filter(([key]) => isImageField(key))
            .map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                <p className="text-sm text-gray-500 mb-2">{formatKey(key)}</p>
                <img
                  src={value}
                  alt={formatKey(key)}
                  className="w-full h-48 object-cover rounded border"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
                  }}
                />
              </div>
            ))}
        </div>
      </section>
    )}

    <section>
      <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Additional Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(asset)
          .filter(([key]) => !isImportantField(key) && !isImageField(key))
          .map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-500">{formatKey(key)}</p>
              <p className="text-gray-800 break-words text-sm">{
                formatValue(key,value)}
              </p>
            </div>
          ))}
      </div>
    </section>



  </div>


    
    
  );
}
