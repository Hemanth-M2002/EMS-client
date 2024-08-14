import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: []
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/view/${id}`)
      .then((res) => {
        setInputs(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setInputs((prev) => ({
        ...prev,
        courses: checked ? [...prev.courses, value] : prev.courses.filter((course) => course !== value)
      }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleEdit(event) {
    event.preventDefault();

    const uploadImageToCloudinary = () => {
      return new Promise((resolve, reject) => {
        if (!file) {
          resolve(null);
        } else {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'ems_portal');
          formData.append('cloud_name', 'dmopj2k6n');

          axios
            .post('https://api.cloudinary.com/v1_1/dmopj2k6n/image/upload', formData)
            .then((response) => {
              resolve(response.data.url);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    };

    uploadImageToCloudinary()
      .then((imageUrl) => {
        const updatedData = {
          ...inputs,
          image: imageUrl || inputs.image,
        };

        return axios.put(`http://localhost:4000/edit/${id}`, updatedData);
      })
      .then((response) => {
        alert("Employee data edited successfully");
        navigate('/view');
      })
      .catch((error) => {
        console.error("Error updating employee data:", error);
      });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Edit Employee</h1>
      <form onSubmit={handleEdit} className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Employee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={inputs.name}
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
              value={inputs.email}
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
              value={inputs.mobile}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Designation:</label>
            <select
              name="designation"
              value={inputs.designation}
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
                  checked={inputs.gender === 'Male'}
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
                  checked={inputs.gender === 'Female'}
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
                  checked={inputs.courses.includes('MCA')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                MCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="BCA"
                  checked={inputs.courses.includes('BCA')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                BCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="BSC"
                  checked={inputs.courses.includes('BSC')}
                  onChange={handleInputChange}
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
          className="bg-green-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-md"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}
