import React from 'react';
import { Link } from 'react-router-dom';

const LandPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Employee Management System</h1>
        <p className="text-base text-gray-600 mb-6">Streamline your employee management with our intuitive system.</p>
        <Link to="/sign-up">
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandPage;
