import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

import Home from './components/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/admin/Admin';
import AdminCourses from './pages/admin/courses';
import CoursesPage from './pages/Courses';
import AboutPage from './pages/About';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/admin/EventsPage';
import Notifications from './pages/Notifications';
import Events from './pages/Events';
import UsersManagement from './pages/admin/Users';
import EnrollmentPage from './pages/admin/EnrollmentPage';

// Protected Route Component for Authenticated Users
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Route Component for Admin Users
const AdminRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Redirect Authenticated Users (e.g., Login and Signup Pages)
const RedirectAuthenticatedUser = ({ children }) => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  return (
    <div className="w-full h-screen text-info bg-slate-800">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/signup" element={<RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>} />
        <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        
        {/* Protected Routes (Requires Authenticated Users) */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />

        {/* Admin Routes (Requires Admin Role) */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UsersManagement /></AdminRoute>} />
        <Route path="/admin/enroll" element={<AdminRoute><EnrollmentPage /></AdminRoute>} />
        <Route path="/admin/events" element={<AdminRoute><EventsPage /></AdminRoute>} />
      </Routes>
    </div>
  );
}
