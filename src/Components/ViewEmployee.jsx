import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function ViewEmployee() {
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:4000/view")
      .then((resp) => {
        setDataList(resp.data.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/delete/${id}`)
      .then(() => {
        fetchData();
        alert("Employee deleted Successfully :)");
      })
      .catch((error) => {
        console.log("Error deleting employee:", error);
      });
  };

  // Handle search filter
  const filteredData = dataList.filter(employee =>
    (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.mobile.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDesignation === '' || employee.designation === selectedDesignation) &&
    (selectedCourses.length === 0 || selectedCourses.some(course => employee.courses.includes(course)))
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h2 className='text-4xl font-extrabold text-gray-800 mb-6 text-center'>Employee Management System (EMS)</h2>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <Link to='/add'>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Add New Employee
            </button>
          </Link>
          <h2 className='text-3xl font-semibold text-gray-700'>Employee List</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <p className='text-lg font-medium text-gray-600'>Total Employees: {dataList.length}</p>
          <input
            type="text"
            placeholder="Search by Name, Email, or Mobile..."
            className="border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
          >
            <option value="">All Designations</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
            {/* Add more options as required */}
          </select>
          <div className="flex flex-col space-y-2">
            <span className="text-lg font-medium text-gray-600">Courses:</span>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Course1"
                checked={selectedCourses.includes("Course1")}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCourses(prevCourses => 
                    prevCourses.includes(value) 
                      ? prevCourses.filter(course => course !== value) 
                      : [...prevCourses, value]
                  );
                }}
                className="mr-2"
              />
              Course1
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Course2"
                checked={selectedCourses.includes("Course2")}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCourses(prevCourses => 
                    prevCourses.includes(value) 
                      ? prevCourses.filter(course => course !== value) 
                      : [...prevCourses, value]
                  );
                }}
                className="mr-2"
              />
              Course2
            </label>
            {/* Add more checkboxes for additional courses */}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">S.No</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">Mobile</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">Designation</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">Gender</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">Courses</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {filteredData.map((employee, index) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.mobile}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.designation}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{Array.isArray(employee.courses) ? employee.courses.join(', ') : 'No Courses'}</td>
                  <td className="px-6 py-4 text-sm font-medium flex space-x-2">
                    <Link to={`/edit/${employee._id}`}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
