import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Calendar } from 'lucide-react';

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const navigate = useNavigate();

  const id1 = localStorage.getItem("id1");

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      const response = await axios.get('http://localhost:8081/api/leave/');
      const separateBtUserId = response.data.filter((item) => item.uid == id1);
      setLeaveHistory(separateBtUserId);
    };

    fetchLeaveHistory();
  }, [id1]);

  const handleDelete = async (leaveId) => {
    try {
      await axios.delete(`http://localhost:8081/api/leave/${leaveId}`);
      alert(`Leave deleted, ${leaveId}`);
      setLeaveHistory(leaveHistory.filter(leave => leave.id !== leaveId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (leaveId) => {
    navigate(`/updateLeave/${leaveId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <Calendar className="mr-2" />
            Leave History
          </h1>
        </div>
        <div className="p-4 md:p-6 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-200 to-pink-200 text-gray-700">
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">ID</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">Applied Date</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">Start Date</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">End Date</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">Leave Cause</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">User Id</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">Leave Type</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">Status</th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaveHistory.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-2 py-3 md:px-4">{leave.id}</td>
                  <td className="px-2 py-3 md:px-4">{moment(leave.appliedDate).format('YYYY-MM-DD')}</td>
                  <td className="px-2 py-3 md:px-4">{moment(leave.startDate).format('YYYY-MM-DD')}</td>
                  <td className="px-2 py-3 md:px-4">{moment(leave.endDate).format('YYYY-MM-DD')}</td>
                  <td className="px-2 py-3 md:px-4">{leave.leaveCause}</td>
                  <td className="px-2 py-3 md:px-4">{leave.uid}</td>
                  <td className="px-2 py-3 md:px-4">{leave.leaveType}</td>
                  <td className="px-2 py-3 md:px-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      leave.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 md:px-4">
                    {leave.status === "PENDING" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(leave.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleUpdate(leave.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
