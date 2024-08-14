import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Basic UI Components
const Button = ({ children, className, onClick, variant = "default", size = "md" }) => {
  const baseStyles = "py-2 px-4 rounded-lg font-semibold transition duration-300 ";
  const variantStyles = {
    default: "bg-gray-800 text-white hover:bg-gray-900",
    outline: "border border-gray-800 text-gray-800 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-500 hover:bg-gray-100"
  };
  const sizeStyles = {
    sm: "text-sm py-1 px-2",
    md: "text-md py-2 px-4",
    lg: "text-lg py-3 px-6"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Table = ({ children }) => (
  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
    {children}
  </table>
);

const TableHeader = ({ children }) => (
  <thead className="bg-gray-100 text-gray-800">
    {children}
  </thead>
);

const TableRow = ({ children }) => (
  <tr className="bg-white border-b border-gray-200">
    {children}
  </tr>
);

const TableCell = ({ children, className }) => (
  <td className={`px-6 py-4 text-sm text-gray-700 ${className}`}>
    {children}
  </td>
);

const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
    {children}
  </th>
);

const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

const Avatar = ({ src, alt, children }) => (
  <div className="w-10 h-10 rounded-full overflow-hidden">
    {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

const AvatarFallback = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white font-bold text-lg">
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="bg-gray-800 text-white py-1 px-2 rounded-full text-xs font-medium">
    {children}
  </span>
);

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

  const filteredData = dataList.filter(employee =>
    (employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.mobile?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDesignation === '' || employee.designation === selectedDesignation) &&
    (selectedCourses.length === 0 || selectedCourses.some(course => employee.courses?.includes(course)))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <Link to="#" className="flex items-center gap-2">
          <MountainIcon className="w-6 h-6" />
          <span className="text-lg font-bold">Employee Portal</span>
        </Link>
        <nav className="hidden md:flex gap-6">
        {localStorage.getItem("name")?<h1>Welcome <b>{localStorage.getItem("name")}</b></h1>:""}
          {/* <Link to="#" className="hover:underline">Employees</Link> */}
          <Link to="/sign-in" className="hover:underline" onClick={() => localStorage.removeItem("name")}>Logout</Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="w-6 h-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <Link to='/add'>
            <Button className="bg-gray-800 hover:bg-gray-900">
              Add New Employee
            </Button>
          </Link>
          <span>
            <h2 className="text-3xl font-semibold text-gray-700 ml-[-845px]">Employee Lists</h2>
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 space-y-4 md:space-y-0 gap-4">
        <p className="text-lg font-medium text-gray-600w">Total Employees: {dataList.length}</p>
          <input
            type="text"
            placeholder="Search by Name, Email"
            className="border border-gray-300 rounded-lg py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 px-14 lg:mr-[-800px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
          >
            <option value="">All Designations</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((employee,index) => (
              <TableRow key={employee._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={employee.image || '/placeholder-user.jpg'} alt={employee.name} />
                    <AvatarFallback>{employee.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{employee.name || 'N/A'}</TableCell>
                <TableCell>{employee.email || 'N/A'}</TableCell>
                <TableCell>{employee.designation || 'N/A'}</TableCell>
                <TableCell>{employee.gender || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(employee.courses) ? employee.courses.map((course, index) => (
                      <Badge key={index}>{course}</Badge>
                    )) : 'No Courses'}
                  </div>
                </TableCell>
                <TableCell>{new Date(employee.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(employee.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link to={`/edit/${employee._id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
