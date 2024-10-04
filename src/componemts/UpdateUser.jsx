import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    department: '',
    role: '',
    days: 20,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/users/${id}`);
        const data = response.data;
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8081/api/users/${id}`, formData);
      alert(`User has been updated: ${response.data.id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="w-full max-w-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8 underline">Update User</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white bg-opacity-50 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-white mb-2">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white bg-opacity-50 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-bold text-white mb-2">Department:</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white bg-opacity-50 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              >
                <option value="">Select a department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-white mb-2">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white bg-opacity-50 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              >
                <option value="">Select a role</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div>
              <label htmlFor="days" className="block text-sm font-bold text-white mb-2">Days:</label>
              <input
                type="number"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white bg-opacity-50 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit Employee
              </button>
              <Link to="/userList" className="text-white underline">Back to User List</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
