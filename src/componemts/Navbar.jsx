import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';

const navItems = [
  { name: "Home", path: "/", roles: ["manager"] },
  { name: "Calendar", path: "/calendar", roles: ["employee"] },
  { name: "Leave Management", path: "/leaveMgmt", roles: ["manager","employee"] },
  { name: "Fill Leave form ", path: "/leaveForm", roles: ["employee"] },
  { name: "User List ", path: "/userList", roles: ["employee", "manager"] },
  { name: "Profile ", path: "/profile", roles: ["employee", "manager"] },
  { name: "Leave Authorize ", path: "/leaveAuthorize", roles: "manager" },
  { name: "User Creation", path: "/postUser", roles: "manager" },
  { name: "Approved Leave ", path: "/approved", roles: "employee" },
  { name: "Rejected Leave ", path: "/rejected", roles: "employee" }


];

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("employee");
  const id1 = localStorage.getItem("id1");


  useEffect(() => {
    const fetchData = async () => {
      if (id1) {
        try {
          const res = await axios.get(`http://localhost:8081/api/users/${id1}`);
          console.log("data in navbar", res.data);
          const data = res.data;
          setUserRole(data.role.toLowerCase());
          setUsername(data.email.split('@')[0]);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [id1]);
  const getVisibleItems = (items, role) => items.filter(item => item.roles.includes(role));

  const handleLogout =()=>{
    alert(`log out`)
    localStorage.clear()
  }

  return (
    <nav className="navbar">
      <ul>
        {getVisibleItems(navItems, userRole).map(item => (
          <li key={item.path}>
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul>
      {id1 && <button className="border-2 p-1 bg-red-500" onClick={handleLogout}>Logout</button>}
      <h2 className="user-greeting">Hi, {username}!</h2>
    </nav>
  );
};

export default Navbar;
