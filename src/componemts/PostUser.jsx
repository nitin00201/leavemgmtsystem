import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const PostUser = () => {
    const navigate = useNavigate()
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
        const response = await axios.post("http://localhost:8081/api/users/",formData)
        alert(`user has been sent ${response.data.id}`)
        console.log("post user ",response.data);
        console.log("post user days ",response.data.days);

        navigate("/")
    } catch (error) {
        console.log(error)
    }
    console.log(formData);

  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl mx-auto p-2 mb-2 border-2 w-3/12">
    <h1 className='text-center font-bold text-3xl bg-blue-500 w-full rounded-t-xl h-11 '>Post User Page</h1>

      <div className="mb-4 mt-4 flex gap-2 items-center">
        <label htmlFor="email" className="block text-gray-700 translate-x-[-20%] text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="shadow appearance-none border translate-x-[6%] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 flex gap-2 items-center">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 flex gap-2">
  <label htmlFor="department" className="block text-gray-700 text-sm translate-x-[-10%] font-bold mb-2">
    Department:
  </label>
  <select
    id="department"
    name="department"
    value={formData.department}
    onChange={handleInputChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select a department</option>
    <option value="HR">HR</option>
    <option value="IT">IT</option>
    <option value="Finance">Finance</option>
  </select>
</div>

<div className="mb-4 flex gap-2">
  <label htmlFor="role" className="block text-gray-700 translate-x-[-150%] text-sm font-bold mb-2">
    Role:
  </label>
  <select
    id="role"
    name="role"
    value={formData.role}
    onChange={handleInputChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select a role</option>
    <option value="employee">Employee</option>
    <option value="manager">Manager</option>
  </select>
</div>

      <div className="mb-4 flex gap-2">
        <label htmlFor="days" className="block text-gray-700 text-sm font-bold mb-2">
          Days:
        </label>
        <input
          type="number"
          id="days"
          name="days"
          value={formData.days}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
    <Link to={`/userList`} >user List</Link>
   </>
  );
};

export default PostUser;