import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import useCourseStore from '../../store/courseStore'
import useEventStore from '../../store/useEventStore'
import { Menu, Users, BookOpen, Calendar, PieChart, BarChart, Activity } from 'lucide-react'
import { Pie, Line } from 'react-chartjs-2'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
)

export default function Admin() {
  const { users, allUsers } = useAuthStore()
  const { courses, fetchCourses, deleteCourse } = useCourseStore()
  const { events,fetchEvents, deleteEvent } = useEventStore()
  const [activeTab, setActiveTab] = useState('all')

  const userRoles = ['admin', 'staff', 'student', 'parent', 'other']
  const filteredUsers = activeTab === 'all' ? users : users.filter(user => user.role === activeTab)

  const userRoleData = {
    labels: userRoles,
    datasets: [
      {
        data: userRoles.map(role => users.filter(user => user.role === role).length),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  }

  const courseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Course Enrollments',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  }
  useEffect(() => {
    fetchCourses()
    fetchEvents();
    allUsers()
  }, [fetchCourses])

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      toast.success('Event deleted successfully!');
    } catch (error) {
      toast.error('An error occurred while deleting the event.');
    }
  }
  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      toast.success('Course deleted successfully!');
    } catch (error) {
      toast.error('An error occurred while deleting the event.');
    }
  }

  return (
    <div className="drawer lg:drawer-open p-10 mt-12">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-200">
        {/* Navbar */}
        <div className="navbar bg-base-100 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <Menu />
            </label>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Admin Dashboard</a>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 space-y-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-100 shadow">
              <div className="stat-figure text-info">
                <Users size={36} />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-info">{users.length}</div>
            </div>
            <div className="stat bg-base-100 shadow">
              <div className="stat-figure text-info">
                <BookOpen size={36} />
              </div>
              <div className="stat-title">Total Courses</div>
              <div className="stat-value text-info">{courses.length}</div>
            </div>
            <div className="stat bg-base-100 shadow">
              <div className="stat-figure text-info">
                <Calendar size={36} />
              </div>
              <div className="stat-title">Total Events</div>
              <div className="stat-value text-info">{events.length}</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-base-100 p-4 rounded-box shadow">
              <h2 className="text-xl font-bold mb-4">User Distribution</h2>
              <Pie data={userRoleData} />
            </div>
            <div className="bg-base-100 p-4 rounded-box shadow">
              <h2 className="text-xl font-bold mb-4">Course Enrollments</h2>
              <Line data={courseData} />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-base-100 p-4 rounded-box shadow">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <div className="tabs tabs-boxed mb-4">
              <a 
                className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </a>
              {userRoles.map(role => (
                <a 
                  key={role}
                  className={`tab ${activeTab === role ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab(role)}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </a>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <a href='/admin/users' className="btn btn-xs btn-info mr-2">Edit</a>
                        <button className="btn btn-xs btn-error">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Courses Table */}
          <div className="bg-base-100 p-4 rounded-box shadow">
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Instructor</th>
                    <th>Students</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id}>
                      <td>{course.name}</td>
                      <td>{course.duration}</td>
                      <td>{course.examPrice}</td>
                      <td>
                        <a href='/admin/courses' className="btn btn-xs btn-info mr-2">Edit</a>
                        <button className="btn btn-xs btn-error" onClick={()=> handleDeleteCourse(`${course._id}`)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-base-100 p-4 rounded-box shadow">
            <h2 className="text-xl font-bold mb-4">Events</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event._id}>
                      <td>{event.Name}</td>
                      <td>{event.Date}</td>
                      <td>{event.EventLocation}</td>
                      <td>
                        <a href='/admin/events' className="btn btn-xs btn-info mr-2">Edit</a>
                        <button className="btn btn-xs btn-error"  onClick={() => handleDelete(event._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li className="mb-4">
            <h2 className="text-2xl font-bold">Cresta College</h2>
          </li>
          <li>
            <a className="active">
              <Users /> Users
            </a>
          </li>
          <li>
            <a>
              <BookOpen /> Courses
            </a>
          </li>
          <li>
            <a>
              <Calendar /> Events
            </a>
          </li>
          <li>
            <a>
              <PieChart /> Analytics
            </a>
          </li>
          <li>
            <a>
              <BarChart /> Reports
            </a>
          </li>
          <li>
            <a>
              <Activity /> System Health
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}