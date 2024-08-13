import React from 'react'
import { Link } from 'react-router-dom';

const LandPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md p-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">EMS Landing Page</h1>
        <p className="text-lg mb-8">Welcome to our EMS system.</p>
        <Link to="/sign-up">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LandPage
