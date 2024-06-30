import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import useAutoLogin from "./hooks/useAutoLogin";
import StudentDashboard from './components/Dashboard/StudentDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Protected from './components/protected/Protected';
import Navbar from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import EditProfile from './components/Profile/EditProfile';
import RequestLeave from './components/Leave/RequestLeave';
import ViewLeaves from './components/Leave/ViewLeaves';
import MarkAttendance from './components/Attendance/MarkAttendance';
import ViewAttendance from './components/Attendance/ViewAttendance';
import ApproveLeaveRequests from './components/Admin/ApproveLeaveRequests';
import ManageAttendance from './components/Admin/ManageAttendance';
import SetGradingCriteria from './components/Admin/SetGradingCriteria';
import useTokenRefresh from './hooks/useAutoRefresh';

function App() {
  const isAuth = useSelector(state => state.user.auth);
  const loading = useAutoLogin();
  useTokenRefresh();

  return loading ? 'loading...' : (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/student-dashboard" element={
          <Protected isAuth={isAuth}>
              <StudentDashboard />
          </Protected>
        } />
        
        <Route path="/update-profile" element={
          <Protected isAuth={isAuth}>
            <EditProfile />
          </Protected>
        } />
        
        <Route path="/admin-dashboard" element={
          <Protected isAuth={isAuth}>
              <AdminDashboard />
          </Protected>
        } />
        
        <Route path="/submit-leave" element={
          <Protected isAuth={isAuth}>
            <RequestLeave />
          </Protected>
        } />
        
        <Route path="/leave-requests" element={
          <Protected isAuth={isAuth}>
            <ViewLeaves />
          </Protected>
        } />
        
        <Route path="/mark" element={
          <Protected isAuth={isAuth}>
            <MarkAttendance />
          </Protected>
        } />
        
        <Route path="/all-attendance" element={
          <Protected isAuth={isAuth}>
            <ViewAttendance />
          </Protected>
        } />
        
        <Route path="/leave" element={
          <Protected isAuth={isAuth}>
            <ApproveLeaveRequests />
          </Protected>
        } />
        
        <Route path="/students-attendance/manage" element={
          <Protected isAuth={isAuth}>
            <ManageAttendance />
          </Protected>
        } />
        
        <Route path="/grading" element={
          <Protected isAuth={isAuth}>
            <SetGradingCriteria />
          </Protected>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
