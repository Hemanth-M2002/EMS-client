import React from 'react'
import Navbar from './Navbar'
const Admin = () => {
  return (
    <div>
    <Navbar />
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-gray-700">Welcome to the Employee Management System portal!</p>
        {/* Add more admin functionalities here */}
      </div>
    </main>
  </div>
  )
}

export default Admin
