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
      navigate("/");
    } catch (err) {
      setError("Server error");
    }
  };

  if (!email) return <p>Invalid Access</p>;

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
        <button type="submit">Verify</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyOtp;
