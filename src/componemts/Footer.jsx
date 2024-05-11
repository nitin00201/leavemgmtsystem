import React from 'react';
import logo from '../assets/images.png'
import { FaInstagram } from 'react-icons/fa';
import { CiFacebook } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer class="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a href="#" target="_blank" class="flex items-center">
            <img src={logo} class="mr-4 h-10" alt="Leave Management System Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Leave Management System</span>
          </a>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h3 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h3>
            <ul>
              <li class="mb-4">
                <a href="https://example.com" target="_blank" class="text-gray-600 hover:underline dark:text-gray-400">Leave Policy</a>
              </li>
              <li>
                <a href="https://example.com" target="_blank" rel="nofollow" class="text-gray-600 hover:underline dark:text-gray-400">Employee Handbook</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact Us</h3>
            <ul>
              <li class="mb-4">
                <a href="mailto:info@leavemanagement.com" class="text-gray-600 hover:underline dark:text-gray-400">info@leavemanagement.com</a>
              </li>
              <li>
                <a href="tel:+91 1234567890" class="text-gray-600 hover:underline dark:text-gray-400">+1 123 456 7890</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Social Media</h3>
            <div className='flex gap-3 text-3xl'>
            <FaInstagram />
            <CiFacebook />
            <FaXTwitter />
            <BiLogoGmail />
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between flex justify-center">
        <p class="text-sm text-gray-500 sm:text-center dark:text-gray-400 translate-x-[168%]">© 2024 Leave Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;