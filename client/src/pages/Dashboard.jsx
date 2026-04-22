import React, { useState, useEffect } from "react";
import Students from "./Students";
import Attendance from "./Attendance";
import Percentage from "./Percentage";
import { useNavigate } from "react-router-dom";

import {
  FiUsers,
  FiCheckSquare,
  FiPieChart,
  FiLogOut,
  FiCheckCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
// UPDATE YOUR IMPORTS: Add FiMenu and FiX

function Dashboard() {
  const [active, setActive] = useState("students");
  const [teacherName, setTeacherName] = useState("Teacher");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useNavigate();

  const handleNavClick = (id) => {
    setActive(id);
    setIsSidebarOpen(false);
  };
  // Load the teacher's name from the login session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.name) setTeacherName(user.name);
      } catch (e) {
        console.error("Could not parse user data");
      }
    }
  }, []);

  const renderContent = () => {
    if (active === "students") return <Students />;
    if (active === "attendance") return <Attendance />;
    if (active === "percentage") return <Percentage />;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { id: "students", label: "Student Directory", icon: <FiUsers size={20} /> },
    {
      id: "attendance",
      label: "Mark Attendance",
      icon: <FiCheckSquare size={20} />,
    },
    {
      id: "percentage",
      label: "Reports & Analytics",
      icon: <FiPieChart size={20} />,
    },
  ];

  return (
    <div
      className="flex h-screen bg-[#FAFAF8] overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ADD THIS OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      {/* UPDATE THESE CLASSES */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-72 bg-[#0F1C3F] text-white flex flex-col shadow-2xl z-30 shrink-0 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo Area */}
        <div className="p-8 pb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FiCheckCircle size={24} className="text-white" />
          </div>
          <h2
            className="text-2xl font-bold tracking-wide"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            AttendTrack
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 text-left ${
                active === item.id
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile & Logout Bottom Anchor */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors duration-200"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white h-20 px-8 flex items-center justify-between border-b border-gray-100 shrink-0 z-10">
          <div className="flex items-center gap-3">
            {/* ADD THIS HAMBURGER BUTTON */}
            <button
              className="md:hidden p-2 -ml-2 text-gray-600 hover:text-[#0F1C3F] hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>

            <div className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider hidden sm:block">
              {active === "students"
                ? "Directory"
                : active === "attendance"
                  ? "Daily Tracking"
                  : "Analytics"}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-[#0F1C3F]">{teacherName}</p>
              <p className="text-xs text-gray-500">Instructor</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
              {teacherName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#FAFAF8] custom-scrollbar">
          {renderContent()}
        </main>
      </div>

      {/* Optional Custom Scrollbar Styles to keep the UI clean */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #D1D5DB;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
