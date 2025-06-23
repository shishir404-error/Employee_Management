import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Failed to reset password.");
        return;
      }

      setMsg("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>

        {msg && <p className="mt-4 text-green-600 text-center">{msg}</p>}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <a href="/" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
