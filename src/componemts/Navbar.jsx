import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Home, Calendar, FileText, Users, User, CheckSquare, UserPlus, FileSignature, ThumbsUp, ThumbsDown, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { name: "Home", path: "/", roles: ["manager", 'employee'], icon: Home },
  { name: "Calendar", path: "/calendar", roles: ["employee"], icon: Calendar },
  { name: "Leave Management", path: "/leaveMgmt", roles: ["employee"], icon: FileText },
  { name: "User List", path: "/userList", roles: ["employee", "manager"], icon: Users },
  { name: "Profile", path: "/profile", roles: ["employee", "manager"], icon: User },
  { name: "Leave Authorize", path: "/leaveAuthorize", roles: ["manager"], icon: CheckSquare },
  { name: "User Creation", path: "/postUser", roles: ["manager"], icon: UserPlus },
  { name: "Fill Leave form", path: "/leaveForm", roles: ["employee"], icon: FileSignature },
  { name: "Approved Leave", path: "/approved", roles: ["employee"], icon: ThumbsUp },
  { name: "Rejected Leave", path: "/rejected", roles: ["employee"], icon: ThumbsDown }
];

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("employee");
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu
  const id1 = localStorage.getItem("id1");
  const rbl = localStorage.getItem("remainingBalance");

  useEffect(() => {
    const fetchData = async () => {
      if (id1) {
        try {
          const res = await axios.get(`http://localhost:8081/api/users/${id1}`);
          localStorage.setItem("days", res.data.days);
          setUserRole(res.data.role.toLowerCase());
          setUsername(res.data.email.split('@')[0]);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [id1]);

  const getVisibleItems = (items, role) => items.filter(item => 
    Array.isArray(item.roles) ? item.roles.includes(role) : item.roles === role
  );

  const handleLogout = () => {
    alert(`log out`);
    localStorage.clear();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">Logo</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {getVisibleItems(navItems, userRole).map(item => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <h2 className="text-lg font-semibold mr-4">Hi, {username}!</h2>
            {id1 && (
              <button
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150 ease-in-out"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {getVisibleItems(navItems, userRole).map(item => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
