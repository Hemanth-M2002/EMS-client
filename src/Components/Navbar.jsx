import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState()

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-grey p-2 shadow-md text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-3xl font-bold hover:text-gray-200 transition duration-300">
          EMS
        </Link>
        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="text-black-200 flex justify-end text-lg font-semibold px-4 py-2 rounded-lg focus:outline-none transition duration-300"
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
          {localStorage.getItem("name")?<h2>{localStorage.getItem("name")}</h2>:""}
        <Link to="/sign-in" className="text-black text-lg font-semibold hover:text-gray-200 transition duration-300">
          Logout
        </Link>
      </div>
    </nav>
  );
}
