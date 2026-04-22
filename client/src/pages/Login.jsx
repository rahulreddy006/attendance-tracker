import React, { useState } from "react";
import { FiCheckSquare, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(30); // Start progress bar

    try {
      // Simulate network delay for the progress bar effect
      setTimeout(() => setProgress(70), 200);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/teachers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setProgress(100); // Complete progress bar

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => navigate("/dashboard"), 300); // Redirect to dashboard
      } else {
        setTimeout(() => toast.error(data.message || "Login failed"), 300);
      }
    } catch (error) {
      console.error("Error:", error);
      setProgress(100);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF8] relative"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#4338CA] transition-all duration-300 ease-out z-50"
        style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}
      ></div>

      {/* Keyframes for the drop-in animation */}
      <style>
        {`
          @keyframes dropIn {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      {/* App Logo & Name */}
      <div className="mb-6 flex flex-col items-center animate-[dropIn_400ms_ease-out_forwards]">
        <FiCheckSquare className="text-4xl text-[#4338CA] mb-2" />
        <h1 className="text-2xl font-bold text-gray-900">AttendTrack</h1>
      </div>

      {/* Login Card */}
      <div
        className="w-full max-w-[400px] bg-white rounded-2xl p-8 animate-[dropIn_400ms_ease-out_forwards]"
        style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] transition-all"
              placeholder="teacher@college.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] transition-all pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4338CA] text-white py-2.5 rounded-full font-medium shadow-[0_4px_14px_0_rgba(67,56,202,0.39)] hover:shadow-[0_6px_20px_rgba(67,56,202,0.23)] hover:-translate-y-[2px] transition-all duration-200 mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-gray-700 font-medium hover:text-[#4338CA] transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
