import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Briefcase, UserCheck, Calendar, Trash2, Edit2 } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/users/");
        localStorage.setItem("jwt", JSON.stringify(response.data));
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchUsers();
  }, []);

  const handleUpdate = (employeeId) => {
    navigate(`/updateUser/${employeeId}`);
  }

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8081/api/users/${employeeId}`);
      setUsers(users.filter(user => user.id !== employeeId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Users className="mr-2" />
            User List
          </h1>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Days Allotted</th>
                {role === "manager" && (
                  <>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200  ">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3 flex items-center">
                    <Mail className="mr-2 text-blue-500" />
                    {user.email}
                  </td>
                  <td className="px-4 py-3 flex items-center">
                    <Briefcase className="mr-2 text-purple-500" />
                    {user.department ? user.department : 'N/A'}
                  </td>
                  <td className="px-4 py-3 flex items-center">
                    <UserCheck className="mr-2 text-green-500" />
                    {user.role}
                  </td>
                  <td className="px-4 py-3 flex items-center">
                    <Calendar className="mr-2 text-orange-500" />
                    {user.days}
                  </td>
                  {role === "manager" && (
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          title="Update User"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;