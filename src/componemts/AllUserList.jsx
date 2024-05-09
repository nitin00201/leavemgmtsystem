import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
      const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/users/allProfile", {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

        setUsers(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [jwt]);

  return (
    <div className="container mx-auto">
      <table className="table-auto w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Email</th>
            <th className="px-3 py-2 text-left">Department</th>
            <th className="px-3 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-3 py-2">{user.id}</td>
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2">{user.department ? user.department : 'N/A'}</td>
              <td className="px-3 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;