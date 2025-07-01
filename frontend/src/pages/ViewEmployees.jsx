import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";

const ViewEmployees = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">👨‍💼 Profile (Employee)</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow p-6">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Verified</th>
                <th className="px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {user ? (
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name || "—"}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.isVerified ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                    No user data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewEmployees;
