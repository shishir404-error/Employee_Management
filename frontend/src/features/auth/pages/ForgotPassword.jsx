import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Something went wrong");
        return;
      }

      setMsg("OTP sent to your email.");
      navigate("/reset-password");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </form>

        {msg && <p className="mt-4 text-green-600 text-center">{msg}</p>}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-500">
          Go back to{" "}
          <a href="/" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
