import React from 'react';
import logo from '../assets/images.png';
import { FaInstagram } from 'react-icons/fa';
import { CiFacebook } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="p-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white">
      <div className="md:flex md:justify-between items-center">
        <div className="mb-6 md:mb-0 flex items-center">
          <a href="/" target="_blank" className="flex items-center">
            <img src={logo} className="mr-4 h-12 rounded-full shadow-lg" alt="Leave Management System Logo" />
            <span className="self-center text-2xl font-bold">Leave Management System</span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 text-center md:text-left">
          <div>
            <h3 className="mb-6 text-lg font-semibold uppercase">Resources</h3>
            <ul>
              <li className="mb-4">
                <a href="/leavepol" className="text-gray-300 hover:text-white hover:underline">Leave Policy</a>
              </li>
              <li>
                <a href="/handbook" className="text-gray-300 hover:text-white hover:underline">Employee Handbook</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-semibold uppercase">Contact Us</h3>
            <ul>
              <li className="mb-4">
                <a href="mailto:info@leavemanagement.com" className="text-gray-300 hover:text-white hover:underline">info@leavemanagement.com</a>
              </li>
              <li>
                <a href="tel:+91 1234567890" className="text-gray-300 hover:text-white hover:underline">+1 123 456 7890</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-semibold uppercase">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 text-3xl">
              <a href="https://instagram.com" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
              <a href="https://facebook.com" className="hover:text-blue-500 transition-colors"><CiFacebook /></a>
              <a href="https://twitter.com" className="hover:text-sky-500 transition-colors"><FaXTwitter /></a>
              <a href="mailto:info@leavemanagement.com" className="hover:text-red-500 transition-colors"><BiLogoGmail /></a>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-500 sm:mx-auto" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400">© 2024 Leave Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
