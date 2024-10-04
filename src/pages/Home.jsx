import React from 'react';
import Navbar from '../componemts/Navbar';
import img2 from '../assets/images2.jpg';

const Home = () => {
  return (
    <div className='relative h-screen'>
      <img src={img2} alt="Background" className='w-full h-full object-cover opacity-50 absolute top-0 left-0' />
      
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-center p-4'>
        <div className='text-4xl md:text-6xl font-extrabold text-white'>
          Employee Leave Management
        </div>
        <div className='text-4xl md:text-6xl font-extrabold text-white mt-4'>
          System
        </div>
      </div>
    </div>
  );
};

export default Home;
