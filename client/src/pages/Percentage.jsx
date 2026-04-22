import React, { useState, useEffect } from "react";
import API from "../services/api";
import {
  FiPieChart,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";
import toast from "react-hot-toast";

function Percentage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // filter students based on department & section
  useEffect(() => {
    if (department && section) {
      const filtered = students.filter(
        (s) => s.department === department && s.section === section,
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
    // Reset selection and result if filters change
    setStudentId("");
    setResult(null);
  }, [department, section, students]);

  // fetch percentage
  const fetchPercentage = async () => {
    if (!studentId || !department || !section) {
      return toast.error("Please select Department, Section, and a Student.");
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await API.get(
        `/attendance/percentage/${studentId}?department=${department}&section=${section}`,
      );
      setResult(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header Section */}
      <div className="mb-8">
        <h2
          className="text-3xl font-bold text-[#0F1C3F]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Attendance Reports
        </h2>
        <p className="text-gray-500 mt-1 flex items-center gap-2">
          <FiPieChart className="text-[#2563EB]" />
          View real-time statistics and shortage warnings
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.04)] mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Department
            </label>
            <select
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white text-[#0F1C3F]"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Dept</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          {/* Section */}
          {/* Replace the old Section Dropdown with this in Percentage.jsx */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Section
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white text-[#0F1C3F] uppercase"
              placeholder="Enter Section (e.g. E)"
              value={section}
              onChange={(e) => setSection(e.target.value.toUpperCase().trim())}
              maxLength={5}
            />
          </div>

          {/* Student Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Student
            </label>
            <select
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white text-[#0F1C3F] disabled:bg-gray-50 disabled:text-gray-400"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={filteredStudents.length === 0}
            >
              <option value="">
                {filteredStudents.length === 0
                  ? "Select Dept & Sec first"
                  : "Select Student"}
              </option>
              {filteredStudents.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.rollNo} - {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-4 mt-2">
          <button
            className="bg-[#0F1C3F] hover:bg-[#2563EB] text-white py-2.5 px-8 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-[2px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
            onClick={fetchPercentage}
            disabled={!studentId || isLoading}
          >
            <FiTrendingUp />
            {isLoading ? "Calculating..." : "Generate Report"}
          </button>
        </div>
      </div>

      {/* Result Card (Renders only when result exists) */}
      {result && (
        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden animate-[dropIn_400ms_ease-out_forwards]">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#F4F6FA] flex items-center justify-center text-[#2563EB]">
                <FiUser size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F1C3F]">
                  Student Report
                </h3>
                <p className="text-gray-500 text-sm">Attendance Summary</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Percentage Circle / Bar */}
              <div className="flex flex-col justify-center bg-[#F4F6FA] p-6 rounded-xl">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Total Attendance
                </p>
                <div className="flex items-end gap-2 mb-4">
                  <span
                    className="text-5xl font-bold text-[#0F1C3F]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {result.percentage.toFixed(2)}%
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${result.status.toLowerCase() === "low" ? "bg-red-500" : "bg-[#2563EB]"}`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Right Column: Stats & Status */}
              <div className="flex flex-col justify-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">
                      Classes Attended
                    </p>
                    <p className="text-2xl font-bold text-[#0F1C3F]">
                      {result.presentDays}
                    </p>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <p className="text-gray-500 text-sm mb-1">Total Classes</p>
                    <p className="text-2xl font-bold text-[#0F1C3F]">
                      {result.totalDays}
                    </p>
                  </div>
                </div>

                {/* Dynamic Status Alert */}
                {result.status.toLowerCase() === "low" ? (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3 items-start">
                    <FiAlertCircle
                      className="text-red-500 mt-0.5 shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="font-semibold text-red-700">
                        Attendance Shortage
                      </p>
                      <p className="text-red-600 text-sm mt-1">
                        Student needs to attend{" "}
                        <strong>
                          {result.requiredClasses} more consecutive classes
                        </strong>{" "}
                        to reach the required threshold.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex gap-3 items-center">
                    <FiCheckCircle
                      className="text-green-600 shrink-0"
                      size={20}
                    />
                    <p className="font-semibold text-green-700">
                      Attendance is on track
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Percentage;
