import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, FileText, Send } from 'lucide-react';

function LeaveForm() {
  const id1 = localStorage.getItem("id1");
  const da = localStorage.getItem("userType1");
  const bal = localStorage.getItem("remainingBalance");

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveCause: '',
    status: "PENDING",
    uid: parseInt(id1),
    departmentName: da,
    leaveType: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const date1 = new Date(formData.startDate);
    const date2 = new Date(formData.endDate);
    const differenceInMilliseconds = date2 - date1;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    if (differenceInDays < bal) {
      try {
        const response = await axios.post('http://localhost:8081/api/leave/', formData);
        alert(`Leave request has been sent.\nYour ID is: ${response.data.id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("No holiday available");
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-center font-bold text-3xl text-gray-800 mb-8">Leave Request Form</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a reason</option>
                <option value="sick">Sick</option>
                <option value="vacation">Vacation</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div>
              <label htmlFor="leaveCause" className="block text-sm font-medium text-gray-700 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Reason for Leave
              </label>
              <textarea
                id="leaveCause"
                name="leaveCause"
                value={formData.leaveCause}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Leave Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveForm;