import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PostUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    department: '',
    role: '',
    days: 50,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/users/', formData);
      alert(`User has been created with ID: ${response.data.id}`);
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl mx-auto p-8 mb-6 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-t-xl mb-6">
          Post User
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
            Department:
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a role</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="days" className="block text-gray-700 text-sm font-bold mb-2">
            Days:
          </label>
          <input
            type="number"
            id="days"
            name="days"
            value={formData.days}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      <div className="text-center">
        <Link
          to="/userList"
          className="text-blue-500 hover:underline"
        >
          View User List
        </Link>
      </div>
    </>
  );
};

export default PostUser;
