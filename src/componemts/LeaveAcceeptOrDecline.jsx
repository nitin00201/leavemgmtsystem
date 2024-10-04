import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const LeaveAcceptOrDecline = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const navigate = useNavigate();
  const da = localStorage.getItem("userType1");
  const [formData, setFormData] = useState("");

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/leave/');
        const authorizable = response.data.filter(el => el.status === "PENDING" && el.departmentName === da.toString());
        setLeaveHistory(authorizable);
      } catch (error) {
        console.error("Error fetching leave history:", error);
      }
    };

    fetchLeaveHistory();
  }, [da]);

  const acceptHandler = async (leaveId) => {
    try {
      await axios.put(`http://localhost:8081/api/leave/approve/${leaveId}`, { adminComment: formData });
      alert(`Leave has been approved. Leave ID: ${leaveId}`);
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const declineHandler = async (leaveId) => {
    try {
      await axios.put(`http://localhost:8081/api/leave/reject/${leaveId}`, { adminComment: formData });
      alert(`Leave has been declined. Leave ID: ${leaveId}`);
    } catch (error) {
      console.error("Error declining leave:", error);
    }
  };

  const handleChange = (event) => {
    setFormData(event.target.value);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-r from-blue-100 via-white to-blue-100 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-700">Leave Management Admin Panel</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 md:px-6 md:py-4">ID</th>
              <th className="px-4 py-2 md:px-6 md:py-4">Applied Date</th>
              <th className="px-4 py-2 md:px-6 md:py-4">Start Date</th>
              <th className="px-4 py-2 md:px-6 md:py-4">End Date</th>
              <th className="px-4 py-2 md:px-6 md:py-4">Leave Cause</th>
              <th className="px-4 py-2 md:px-6 md:py-4">Admin Comment</th>
              <th className="px-4 py-2 md:px-6 md:py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave) => (
              <tr key={leave.id} className="bg-white border-b last:border-none hover:bg-gray-100">
                <td className="px-4 py-2 md:px-6 md:py-4">{leave.id}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{moment(leave.appliedDate).format('YYYY-MM-DD')}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{moment(leave.startDate).format('YYYY-MM-DD')}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{moment(leave.endDate).format('YYYY-MM-DD')}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">{leave.leaveCause}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id={`adminComment-${leave.id}`}
                    name={`adminComment-${leave.id}`}
                    value={formData}
                    onChange={handleChange}
                    placeholder="Add comment"
                  />
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => acceptHandler(leave.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => declineHandler(leave.id)}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveAcceptOrDecline;
