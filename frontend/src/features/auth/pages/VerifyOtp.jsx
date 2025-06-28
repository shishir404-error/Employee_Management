import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "OTP invalid");
        return;
      }

      alert("Email verified successfully");
      navigate("/login");
    } catch (err) {
      setError("Server error");
    }
  };

  if (!email) return <p className="text-center mt-20 text-xl text-red-500">Invalid Access</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Verify Your Email</h2>
        <p className="text-sm text-slate-600 text-center mb-6">
          We’ve sent an OTP to <span className="font-medium text-blue-600">{email}</span>. Please enter it below to verify your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition duration-200"
          >
            Verify OTP
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          Didn’t receive the code? <span className="text-blue-600 font-medium cursor-pointer hover:underline">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
