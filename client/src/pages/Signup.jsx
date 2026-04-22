import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const departments = [
  { id: "CSE", name: "Computer Science", color: "bg-blue-500" },
  { id: "ECE", name: "Electronics", color: "bg-green-500" },
  { id: "EEE", name: "Electrical", color: "bg-yellow-500" },
  { id: "MECH", name: "Mechanical", color: "bg-red-500" },
  { id: "CIVIL", name: "Civil", color: "bg-gray-500" },
];

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectDept = (deptId) => {
    setFormData({ ...formData, department: deptId });
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/teachers/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Signup successful! Please login.");
        navigate("/login"); // Redirect to login
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDept = departments.find((d) => d.id === formData.department);

  return (
    <div
      className="flex min-h-screen bg-[#FFFFFF]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Left Side - Hero / Tagline */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center relative overflow-hidden bg-[#FFFFFF]">
        {/* Subtle dot-grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#0F1C3F 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="relative z-10 px-16 text-center">
          <h1
            className="text-5xl font-bold leading-tight text-[#0F1C3F]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Track every class.
            <br />
            Every student.
            <br />
            Every day.
          </h1>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#F4F6FA] p-8 rounded-2xl shadow-sm">
          <h2
            className="text-3xl font-bold text-[#0F1C3F] mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pt-4 text-[#0F1C3F] focus:border-[#2563EB] focus:outline-none transition-colors placeholder-transparent"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2563EB]"
              >
                Full Name
              </label>
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pt-4 text-[#0F1C3F] focus:border-[#2563EB] focus:outline-none transition-colors placeholder-transparent"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2563EB]"
              >
                Email Address
              </label>
            </div>

            {/* Custom Department Dropdown */}
            <div className="relative">
              <div
                className="relative cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div
                  className={`w-full border-b-2 ${isDropdownOpen ? "border-[#2563EB]" : "border-gray-300"} bg-transparent py-2 pt-4 text-[#0F1C3F] flex items-center justify-between transition-colors`}
                >
                  {selectedDept ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${selectedDept.color}`}
                      ></span>
                      {selectedDept.name} ({selectedDept.id})
                    </div>
                  ) : (
                    <span className="text-transparent">Select</span>
                  )}
                  <FiChevronDown className="text-gray-500" />
                </div>
                <label
                  className={`absolute left-0 transition-all ${selectedDept || isDropdownOpen ? "top-0 text-xs text-[#2563EB]" : "top-4 text-base text-gray-500"}`}
                >
                  Department
                </label>
              </div>

              {isDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => handleSelectDept(dept.id)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors text-[#0F1C3F]"
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${dept.color}`}
                      ></span>
                      {dept.name} ({dept.id})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pt-4 text-[#0F1C3F] focus:border-[#2563EB] focus:outline-none transition-colors placeholder-transparent"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2563EB]"
              >
                Password
              </label>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pt-4 text-[#0F1C3F] focus:border-[#2563EB] focus:outline-none transition-colors placeholder-transparent"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-0 top-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2563EB]"
              >
                Confirm Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F1C3F] hover:bg-[#2563EB] text-white py-3 rounded-lg font-medium transition-colors duration-200 mt-4 disabled:opacity-70"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#0F1C3F]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#2563EB] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
