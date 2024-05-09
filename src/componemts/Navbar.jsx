import React from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';


const navItems = [
  { name: "Home", path: "/", roles: ["manager"] },
  { name: "Leave Status", path: "/leaveStatus", roles: ["employee"] },
  { name: "Calender", path: "/calander", roles: ["employee"] },
  { name: "Leave Management", path: "/leaveMgmt", roles: ["manager"] },
  { name: "Fill Leave form ", path: "/leaveForm", roles: ["employee"] },
  { name: "User List ", path: "/userlist", roles: ["employee", "manager"] }
];


const userRole = "employee";
const userName = 'Nitin';

const getVisibleItems = (items, role) => items.filter(item => item.roles.includes(role));

const Navbar = () => {
  const dispatch = useDispatch();
  const {auth } = useSelector((store)=>store)
  const visibleItems = getVisibleItems(navItems, userRole);

  return (
    <nav className="navbar">
      <ul>
        {visibleItems.map(item => (
          <li key={item.path}>
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul>
      <h2 className="user-greeting">Hi, {auth.user ? auth.user.email.split('@')[0] : userName} !</h2>    </nav>
  );
};

export default Navbar;