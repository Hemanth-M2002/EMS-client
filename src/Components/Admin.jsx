import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Admin = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <img 
              src="https://img.freepik.com/free-vector/group-business-people-avatar-character_24877-57277.jpg?t=st=1723640340~exp=1723643940~hmac=a5aa091c28fd18f4c7003869f20f02ea04d55749d6479eaf7f68dc01045de900&w=996" 
              alt="EMS Dashboard"
              className="w-16 h-16 rounded-full border border-gray-300 mr-4"
            />
            <p className="text-lg text-gray-700">
              Welcome to the Employee Management System portal! Manage your employees with ease.
            </p>
          </div>
          {/* Add more admin functionalities here */}
          <Link to="/view">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
              View Employees
            </button>
          </Link>
        </div>
      </main>
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-opacity-30" style={{ backgroundImage: `url('https://www.example.com/your-background-image-url.jpg')` }}></div>
    </div>
  );
};

export default Admin;
