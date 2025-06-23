import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Signup failed");
        return;
      }

      alert("OTP sent to your email!");
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-600 font-medium">{error}</p>}

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
