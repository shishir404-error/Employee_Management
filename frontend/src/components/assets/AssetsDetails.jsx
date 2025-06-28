import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Download, FileText, Image, Info } from "lucide-react";

export default function AssetDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [asset, setAsset] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  const [showKeyInfo, setShowKeyInfo] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading asset details...</p>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Asset Not Found</h2>
          <p className="text-gray-500">The requested asset could not be found.</p>
        </div>
      </div>
    );
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

  const SectionHeader = ({ title, icon: Icon, isExpanded, onToggle }) => (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg mb-4"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      {isExpanded ? (
        <ChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );

  const keyInfoFields = Object.entries(asset).filter(
    ([key]) => isImportantField(key) && !isImageField(key) && key !== "_id" && key !== "__v"
  );

  const imageFields = Object.entries(asset).filter(
    ([key]) => isImageField(key) && key !== "_id" && key !== "__v"
  );

  const additionalFields = Object.entries(asset).filter(
    ([key]) => !isImportantField(key) && !isImageField(key) && key !== "_id" && key !== "__v"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                {asset.name?.[0] || asset.title?.[0] || "A"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {asset.name || asset.title || "Asset Details"}
                </h1>
                <p className="text-gray-600 mt-1">Asset ID: {id}</p>
              </div>
            </div>
            <button
              onClick={() => downloadJson(asset)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
            >
              <Download className="h-4 w-4" />
              Download JSON
            </button>
          </div>
        </div>

        {/* Key Information Section */}
        {keyInfoFields.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <SectionHeader
              title="Key Information"
              icon={Info}
              isExpanded={showKeyInfo}
              onToggle={() => setShowKeyInfo(!showKeyInfo)}
            />
            {showKeyInfo && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {keyInfoFields.map(([key, value]) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-1">{formatKey(key)}</p>
                      <p className="text-gray-900 font-medium break-words">{formatValue(key, value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}



        {/* Additional Details Section */}
        {additionalFields.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm">
            <SectionHeader
              title="Additional Details"
              icon={FileText}
              isExpanded={showAdditional}
              onToggle={() => setShowAdditional(!showAdditional)}
            />
            {showAdditional && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {additionalFields.map(([key, value]) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-1">{formatKey(key)}</p>
                      <p className="text-gray-700 text-sm break-words">{formatValue(key, value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}



                {/* Images Section */}
        {imageFields.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <SectionHeader
              title="Images"
              icon={Image}
              isExpanded={showImages}
              onToggle={() => setShowImages(!showImages)}
            />
            {showImages && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imageFields.map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-3">{formatKey(key)}</p>
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={value}
                          alt={formatKey(key)}
                          className="w-full h-48 object-cover rounded-lg border border-gray-300"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Image+Not+Found";
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}