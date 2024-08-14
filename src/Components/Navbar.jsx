import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md py-4 px-6 flex items-center justify-between">
      <Link to="/" className="text-white text-3xl font-bold hover:text-gray-300 transition duration-300">
        EMS
      </Link>
      <div className="relative">
        <button 
          onClick={toggleDropdown}
          className="text-white flex items-center text-lg font-semibold px-4 py-2 rounded-lg focus:outline-none transition duration-300"
        >
          Employee List
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg w-48 transition-opacity duration-300 opacity-100">
            <Link to="/view" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300">
              View Employees
            </Link>
            <Link to="/add" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-300">
              Create Employee
            </Link>
          </div>
        )}
      </div>
      {localStorage.getItem("name") && (
        <h2 className="text-white">{localStorage.getItem("name")}</h2>
      )}
      <Link to="/sign-in" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300">
        Logout
      </Link>
    </nav>
  );
}
