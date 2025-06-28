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
      console.log(data);

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="py-6 px-4">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-12">
                <h1 className="text-slate-900 text-3xl font-semibold">Sign up</h1>
                <p className="text-slate-600 text-[15px] mt-6 leading-relaxed">
                  Create your account and start managing your assets efficiently.
                </p>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter user name"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email" // ✅ fixed
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <a href="/forgot-password" className="text-blue-600 hover:underline font-medium">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Sign up
                </button>
                <p className="text-sm mt-6 text-center text-slate-600">
                  Already have an account?
                  <a href="/login" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap">Log in here</a>
                </p>
              </div>

              {error && (
                <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
              )}
            </form>
          </div>

          <div className="max-lg:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full aspect-[71/50] max-lg:w-4/5 mx-auto block object-cover"
              alt="login img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
