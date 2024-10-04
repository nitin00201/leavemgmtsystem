import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, FileText, Send } from 'lucide-react';

function UpdateLeave() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveCause: '',
    status: "PENDING"
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/leave/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeave();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8081/api/leave/${id}`, formData);
      alert(`Leave has been updated.\nYour ID is: ${response.data.id}`);
      navigate('/dashboard'); // Assuming you want to redirect to a dashboard after update
    } catch (error) {
      console.log(error);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-center font-bold text-3xl text-indigo-800 mb-8">
            Update Leave Request: {id}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>}
            </div>

            <div>
              <label htmlFor="leaveCause" className="block text-sm font-medium text-gray-700 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                Reason for Leave
              </label>
              <textarea
                id="leaveCause"
                name="leaveCause"
                value={formData.leaveCause}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.reason && <p className="mt-2 text-sm text-red-600">{errors.reason}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                <Send className="w-5 h-5 mr-2" />
                Update Leave Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateLeave;