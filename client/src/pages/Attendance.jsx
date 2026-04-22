import React, { useState } from "react";
import API from "../services/api";
import { FiCalendar, FiUsers, FiCheckCircle, FiXCircle } from "react-icons/fi";
import toast from "react-hot-toast";

function Attendance() {
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format today's date for display
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fetchStudents = async () => {
    if (!department || !section) {
      toast.error("Please select both Department and Section.");
      return;
    }

    setIsLoading(true);
    setSubmitted(false);

    try {
      const res = await API.get("/students");

      // filter on frontend (as per original logic)
      const filtered = res.data.data.filter(
        (s) => s.department === department && s.section === section,
      );

      setStudents(filtered);

      // initialize attendance records (Default to true/Present is a common UX optimization,
      // but keeping your original logic of defaulting to false)
      const initialRecords = filtered.map((s) => ({
        studentId: s._id,
        status: false,
      }));

      setRecords(initialRecords);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // set a specific status for a student
  const setStatus = (id, newStatus) => {
    const updated = records.map((r) =>
      r.studentId === id ? { ...r, status: newStatus } : r,
    );
    setRecords(updated);
  };

  const submitAttendance = async () => {
    setIsSubmitting(true);
    try {
      // Format date to match API contract "YYYY-MM-DD"
      const formattedDate = new Date().toISOString().split("T")[0];

      await API.post("/attendance", {
        date: formattedDate,
        department,
        section,
        records,
      });

      setSubmitted(true);
      toast.success("Attendance marked successfully");

      // Clear screen after success
      setStudents([]);
      setRecords([]);
      setDepartment("");
      setSection("");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to submit attendance";
      toast.error(msg);
      console.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="max-w-5xl mx-auto"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2
            className="text-3xl font-bold text-[#0F1C3F]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Mark Attendance
          </h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <FiCalendar className="text-[#2563EB]" />
            {todayDate}
          </p>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.04)] mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
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

          {/* Replace the old Section Dropdown with this in Attendance.jsx */}
          <div className="w-full md:w-1/3">
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

          <button
            className="w-full md:w-auto bg-[#0F1C3F] hover:bg-[#2563EB] text-white py-2.5 px-6 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-[2px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
            onClick={fetchStudents}
            disabled={isLoading}
          >
            <FiUsers />
            {isLoading ? "Loading..." : "Fetch Students"}
          </button>
        </div>
      </div>

      {/* Students List Card */}
      <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Empty State */}
        {students.length === 0 && !isLoading && (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#F4F6FA] rounded-full flex items-center justify-center mb-4">
              <FiUsers className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-[#0F1C3F]">
              No students loaded
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Select a department and section to begin taking attendance.
            </p>
          </div>
        )}

        {/* Loaded State */}
        {students.length > 0 && (
          <div>
            <div className="bg-[#F4F6FA] px-6 py-3 border-b border-gray-100 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-8 md:col-span-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Student Details
              </div>
              <div className="col-span-4 md:col-span-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right md:text-center">
                Attendance Status
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {students.map((s) => {
                const record = records.find((r) => r.studentId === s._id);
                const isPresent = record?.status === true;

                return (
                  <div
                    key={s._id}
                    className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors"
                  >
                    {/* Student Info */}
                    <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center font-bold text-sm shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#0F1C3F]">{s.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                            {s.rollNo}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Status Toggles */}
                    <div className="col-span-12 md:col-span-6 flex justify-end md:justify-center gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => setStatus(s._id, true)}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          isPresent
                            ? "bg-green-100 text-green-700 border-2 border-green-200"
                            : "bg-white text-gray-500 border-2 border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        <FiCheckCircle size={16} /> Present
                      </button>

                      <button
                        onClick={() => setStatus(s._id, false)}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          !isPresent
                            ? "bg-red-100 text-red-700 border-2 border-red-200"
                            : "bg-white text-gray-500 border-2 border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        <FiXCircle size={16} /> Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 px-8 rounded-lg font-medium shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-[2px] transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
                onClick={submitAttendance}
                disabled={submitted || isSubmitting}
              >
                {isSubmitting ? "Saving Records..." : "Submit Attendance"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
