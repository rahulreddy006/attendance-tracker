import React, { useState, useEffect } from "react";
import API from "../services/api";
import { FiUserPlus, FiTrash2, FiUsers, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
function Students() {
  const [students, setStudents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormState = {
    name: "",
    rollNo: "",
    department: "",
    section: "",
  };
  const [form, setForm] = useState(initialFormState);

  // fetch students
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/students");
      setStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // add student
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rollNo || !form.department || !form.section) {
      return toast.error("Please fill all fields");
    }

    setIsSubmitting(true);
    try {
      await API.post("/students", form);
      setForm(initialFormState); // reset form
      setIsFormOpen(false); // close form panel
      fetchStudents(); // refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  // delete student
  const handleDelete = async (id, name) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to remove ${name}? This action cannot be undone.`,
    );

    if (isConfirmed) {
      try {
        await API.delete(`/students/${id}`);
        fetchStudents();
      } catch (error) {
        toast.error("Failed to delete student");
      }
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2
            className="text-3xl font-bold text-[#0F1C3F]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Student Directory
          </h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <FiUsers className="text-[#2563EB]" />
            Manage enrollments and student records
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-[#0F1C3F] hover:bg-[#2563EB] text-white py-2.5 px-6 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-[2px] flex items-center justify-center gap-2"
        >
          {isFormOpen ? <FiX size={18} /> : <FiUserPlus size={18} />}
          {isFormOpen ? "Close Form" : "Add New Student"}
        </button>
      </div>

      {/* Collapsible Add Form Card */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)] mb-8 border border-[#2563EB]/20 animate-[dropIn_300ms_ease-out_forwards]">
          <h3 className="text-lg font-bold text-[#0F1C3F] mb-4">
            Register New Student
          </h3>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
          >
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Roll No
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white"
                placeholder="e.g. 21X01A0501"
                value={form.rollNo}
                onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white"
                placeholder="Student Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Department
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              >
                <option value="">Select Dept</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>

            {/* Replace the old Section Dropdown with this in Students.jsx */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Section
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white uppercase"
                placeholder="e.g. A, B, E"
                value={form.section}
                onChange={(e) =>
                  setForm({
                    ...form,
                    section: e.target.value.toUpperCase().trim(),
                  })
                }
                maxLength={5}
              />
            </div>

            <div className="md:col-span-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 px-4 rounded-lg font-medium transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] disabled:opacity-70"
              >
                {isSubmitting ? "Adding..." : "Save Student"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Data Table Card */}
      <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">
            Loading student directory...
          </div>
        ) : students.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#F4F6FA] rounded-full flex items-center justify-center mb-4">
              <FiUsers className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-[#0F1C3F]">
              No students found
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Click "Add New Student" to start populating the directory.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F4F6FA] border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Roll Number</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Section</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-[#0F1C3F] font-medium bg-gray-100 px-2 py-1 rounded">
                        {s.rollNo}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#0F1C3F]">
                      {s.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {s.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      Section {s.section}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(s._id, s.name)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors inline-flex items-center justify-center"
                        title="Remove Student"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;
