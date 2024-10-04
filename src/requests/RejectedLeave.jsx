import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const RejectedLeave = () => {
  const id1 = localStorage.getItem("id1");
  const [leaveRequest, setLeaveRequest] = useState([]);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      const response = await axios.get('http://localhost:8081/api/leave/');
      const data = response.data;
      const rejectedLeaves = data.filter(el => el.status === "reject" && el.uid == id1);
      setLeaveRequest(rejectedLeaves);
    };
    fetchLeaveHistory();
  }, [id1]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-400 via-red-500 to-red-600 p-4 md:p-8">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">Rejected Leave</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-white">
            <thead>
              <tr className="bg-red-700 text-white">
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">ID</th>
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Applied Date</th>
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Start Date</th>
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">End Date</th>
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Leave Cause</th>
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Leave Type</th>
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Admin Comment</th>
                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequest.map((leave) => (
                <tr key={leave.id} className="bg-white bg-opacity-10 hover:bg-opacity-20 transition">
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{leave.id}</td>
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{moment(leave.appliedDate).format('YYYY-MM-DD')}</td>
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{moment(leave.startDate).format('YYYY-MM-DD')}</td>
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{moment(leave.endDate).format('YYYY-MM-DD')}</td>
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{leave.leaveCause}</td>
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{leave.leaveType}</td>
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{leave.adminComment ? JSON.parse(leave.adminComment).adminComment : ""}</td>
                  <td className="border border-gray-300 px-2 py-2 md:px-4">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RejectedLeave;
