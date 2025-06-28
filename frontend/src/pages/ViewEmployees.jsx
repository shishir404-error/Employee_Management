import React, { useEffect, useState } from "react";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users");
        const data = await res.json();
        console.error("❌ Error fetching employees:", err);

        setEmployees(data.users);
      } catch (err) {
        console.error("❌ Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">👨‍💼 Employees</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
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
              {employees.map((emp) => (
                <tr key={emp._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{emp.name || "—"}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">
                    {emp.isVerified ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(emp.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewEmployees;
