import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ems');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        courses: checked ? [...prev.courses, value] : prev.courses.filter((course) => course !== value)
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    try {
      await axios.post('http://localhost:4000/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Employee added successfully!');
      navigate('/view');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, courses: [value] }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Employee List</h1>
      <div className="mb-8">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {employees.map((emp) => (
              <li key={emp._id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                <div className="text-gray-700">
                  <h2 className="text-xl font-semibold">{emp.name}</h2>
                  <p>{emp.email}</p>
                </div>
                <button className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600">View</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Employee</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Mobile No:</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Designation:</label>
            <select
              name="designation"
              value={form.designation}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Gender:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === 'Male'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === 'Female'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Courses:</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="MCA"
                  checked={form.courses.includes('MCA')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                MCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="BCA"
                  checked={form.courses.includes('BCA')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                BCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="BSC"
                  checked={form.courses.includes('BSC')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                BSC
              </label>
              {/* Add more checkboxes as needed */}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Upload Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
