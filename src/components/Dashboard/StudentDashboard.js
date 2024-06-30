import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold text-center mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to='/mark' className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          Mark Attendance
        </Link>
        <Link to="/all-attendance" className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          View Attendance
        </Link>
        <Link to="/submit-leave" className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          Request Leave
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Link to="/leave-requests" className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          View Leaves
        </Link>
        <Link to="/update-profile" className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
