import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      const response = await axios.get('http://localhost:8081/api/leave/leave/history');
      setLeaveHistory(response.data);
    };

    fetchLeaveHistory();
  }, []);

  return (
    <div>
      <h1>Leave History</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Applied Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Cause</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{moment(leave.appliedDate).format('YYYY-MM-DD')}</td>
              <td>{moment(leave.startDate).format('YYYY-MM-DD')}</td>
              <td>{moment(leave.endDate).format('YYYY-MM-DD')}</td>
              <td>{leave.leaveCause}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveHistory;