import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Basic UI components
const Card = ({ children, className }) => <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="border-b border-gray-300 p-4">{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-2xl font-semibold text-gray-900 ${className}`}>{children}</h2>;
const CardDescription = ({ children }) => <p className="text-gray-700">{children}</p>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const CardFooter = ({ children, className }) => <div className={`border-t border-gray-300 p-4 ${className}`}>{children}</div>;

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-gray-800 font-medium mb-2">
    {children}
  </label>
);

const Input = ({ id, type = 'text', placeholder, ...props }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
    {...props}
  />
);

const Select = ({ id, children }) => (
  <select id={id} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
    {children}
  </select>
);

const SelectTrigger = ({ children }) => <div>{children}</div>;
const SelectValue = ({ placeholder }) => <option value="">{placeholder}</option>;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

const RadioGroup = ({ children }) => <div>{children}</div>;
const RadioGroupItem = ({ id, name, value, ...props }) => (
  <input type="radio" id={id} name={name} value={value} {...props} />
);

const Checkbox = ({ id, ...props }) => (
  <input type="checkbox" id={id} {...props} />
);

const Button = ({ type = 'button', children, className, ...props }) => (
  <button type={type} className={`bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 ${className}`} {...props}>
    {children}
  </button>
);

const CreateEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/view');
        setEmployees(response.data.data);
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
    setImageFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ems_portal'); // Replace with your upload preset
  
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dmopj2k6n/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data && response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error('Image upload failed: No URL returned');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const employeeData = {
        ...form,
        image: imageUrl
      };

      await axios.post('http://localhost:4000/create', employeeData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Employee added successfully!');
      navigate('/view');
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Employee Management</CardTitle>
        <CardDescription>Fill out the form to add a new employee.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleInputChange} placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleInputChange} placeholder="john@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile No.</Label>
              <Input id="mobile" name="mobile" type="tel" value={form.mobile} onChange={handleInputChange} placeholder="123-456-7890" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="designation">Designation</Label>
              <Select id="designation" name="designation" value={form.designation} onChange={handleInputChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4 flex flex-col justify-between ml-8">
            <div className="grid gap-2">
              <Label>Gender</Label>
              <div className="flex items-center gap-4">
                <Label htmlFor="male" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroup>
                    <RadioGroupItem name="gender" id="male" value="male" checked={form.gender === 'male'} onChange={handleInputChange} className="peer sr-only" />
                    <div className="w-5 h-5 rounded-full border border-gray-300 transition-colors peer-checked:bg-gray-800 peer-checked:border-gray-800" />
                    <span className="text-sm text-gray-800">Male</span>
                  </RadioGroup>
                </Label>
                <Label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroup>
                    <RadioGroupItem name="gender" id="female" value="female" checked={form.gender === 'female'} onChange={handleInputChange} className="peer sr-only" />
                    <div className="w-5 h-5 rounded-full border border-gray-300 transition-colors peer-checked:bg-gray-800 peer-checked:border-gray-800" />
                    <span className="text-sm text-gray-800">Female</span>
                  </RadioGroup>
                </Label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Courses</Label>
              <div className="flex items-center gap-4">
                <Label htmlFor="mca" className="flex items-center gap-2 cursor-pointer">
                  <Checkbox id="mca" value="MCA" checked={form.courses.includes('MCA')} onChange={handleInputChange} />
                  <span className="text-sm text-gray-800" > MCA</span>
                </Label>
                <Label htmlFor="bca" className="flex items-center gap-2 cursor-pointer">
                  <Checkbox id="bca" value="BCA" checked={form.courses.includes('BCA')} onChange={handleInputChange} />
                  <span className="text-sm text-gray-800"> BCA</span>
                </Label>
                <Label htmlFor="mba" className="flex items-center gap-2 cursor-pointer">
                  <Checkbox id="mba" value="MBA" checked={form.courses.includes('MBA')} onChange={handleInputChange} />
                  <span className="text-sm text-gray-800"> MBA</span>
                </Label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
          <Button type="submit" className="self-end">Add Employee</Button>
        </form>
      </CardContent>
      <CardFooter>
        {loading && <p className="text-gray-500">Loading...</p>}
      </CardFooter>
    </Card>
  );
};

export default CreateEmployee;
