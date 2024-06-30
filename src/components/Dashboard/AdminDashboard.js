import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to='/students-attendance/manage' className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          Manage Attendance
        </Link>
        <Link to='/leave' className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          Approve Leave Requests
        </Link>
        <Link to='/grading' className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          Set Grading Criteria
        </Link>
        <Link to="/update-profile" className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 text-center">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
