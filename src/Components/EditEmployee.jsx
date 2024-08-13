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
    courses: ''
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

  function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('email', inputs.email);
    formData.append('mobile', inputs.mobile);
    formData.append('designation', inputs.designation);
    formData.append('gender', inputs.gender);
    formData.append('courses', inputs.courses);
    if (file) {
      formData.append('image', file);
    }

    axios
      .put(`http://localhost:4000/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <div className='w-full h-screen flex'>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-green-300 sm:max-w-[900px]'>
        <div className='p-4 flex flex-col justify-around'>
          <form onSubmit={handleEdit}>
            <h2 className='text-4xl font-bold text-center mb-9 text-gray-600'>Edit Employee</h2>
            <div>
              <input 
                className='border p-2 mr-2 mb-4 w-80 ml-2' 
                type="text" 
                placeholder='Name' 
                id='name' 
                name='name' 
                value={inputs.name} 
                onChange={(event) => setInputs({ ...inputs, name: event.target.value })}
              />
            </div>
            <div>
              <input 
                className='border p-2 mb-4 w-80 ml-2' 
                type="email" 
                placeholder='Email' 
                value={inputs.email} 
                onChange={(event) => setInputs({ ...inputs, email: event.target.value })}
              />
            </div>
            <div>
              <input 
                className='border p-2 mb-4 w-80 ml-2' 
                type="text" 
                placeholder='Mobile Number' 
                value={inputs.mobile} 
                onChange={(event) => setInputs({ ...inputs, mobile: event.target.value })}
              />
            </div>
            <div>
              <input 
                className='border p-2 mb-4 w-80 ml-2' 
                type="text" 
                placeholder='Designation' 
                value={inputs.designation} 
                onChange={(event) => setInputs({ ...inputs, designation: event.target.value })}
              />
            </div>
            <div>
              <select 
                className='border p-2 mb-4 w-80 ml-2'
                value={inputs.gender}
                onChange={(event) => setInputs({ ...inputs, gender: event.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <input 
                className='border p-2 mb-4 w-80 ml-2' 
                type="text" 
                placeholder='Courses' 
                value={inputs.courses} 
                onChange={(event) => setInputs({ ...inputs, courses: event.target.value })}
              />
            </div>
            <div>
              <input 
                className='border p-2 mb-4 w-80 ml-2' 
                type="file" 
                onChange={handleFileChange}
              />
            </div>
            <button className='w-full py-2 my-4 bg-green-600 hover:bg-yellow-500 mt-7'>
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
