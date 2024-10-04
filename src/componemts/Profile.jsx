import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Briefcase, Mail, Key, Calendar } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const id1 = localStorage.getItem("id1");

  useEffect(() => {
    const fetchData = async () => {
      if (id1) {
        try {
          const res = await axios.get(`http://localhost:8081/api/users/${id1}`);
          localStorage.setItem("userType1", res.data.department);
          localStorage.setItem("userRole", res.data.role);
          setUserData(res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [id1]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const ProfileItem = ({ icon: Icon, label, value, color }) => (
    <div className={`flex items-center p-4 ${color} rounded-lg shadow-md`}>
      <Icon className="w-6 h-6 mr-4 text-white" />
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">User Profile</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <ProfileItem 
            icon={User} 
            label="Name" 
            value={userData.email.split("@")[0]} 
            color="bg-blue-500"
          />
          <ProfileItem 
            icon={User} 
            label="ID" 
            value={userData.id} 
            color="bg-green-500"
          />
          <ProfileItem 
            icon={Briefcase} 
            label="Department" 
            value={userData.department} 
            color="bg-yellow-500"
          />
          <ProfileItem 
            icon={Mail} 
            label="Email" 
            value={userData.email} 
            color="bg-red-500"
          />
          <ProfileItem 
            icon={Briefcase} 
            label="Role" 
            value={userData.role} 
            color="bg-indigo-500"
          />
          <ProfileItem 
            icon={Key} 
            label="Password" 
            value={userData.password}
            color="bg-pink-500"
          />
          <ProfileItem 
            icon={Calendar} 
            label="Leaves Allotted" 
            value={userData.days} 
            color="bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;