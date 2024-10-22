'use client'

import React, { useState, useEffect } from 'react'
import { useEnrollmentStore } from "../../store/useEnrollementStore"
import { useAuthStore } from '../../store/authStore'
import useCourseStore from '../../store/courseStore'
import { Loader2, Trash2, Edit2, Save, X, Calendar, Book, User } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format } from 'date-fns'

export default function EnrollmentPage() {
  const { enrollments, fetchEnrollments, createEnrollment, updateEnrollment, deleteEnrollment, isLoading } = useEnrollmentStore()
  const { users, allUsers } = useAuthStore()
  const { courses, fetchCourses } = useCourseStore()

  const [newEnrollment, setNewEnrollment] = useState({
    studentId: '',
    courseId: '',
    coursePricePerSemester: '',
    courseTotalPrice: '',
    examDate: '',
    startDate: '',
    endDate: '',
  })

  const students = users.filter((user) => user.role === 'student')
  const [editingId, setEditingId] = useState(null)
  const [editedEnrollment, setEditedEnrollment] = useState({})
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchEnrollments()
    allUsers()
    fetchCourses()
  }, [fetchEnrollments, allUsers, fetchCourses])

  const handleAddEnrollment = async (e) => {
    e.preventDefault()
    try {
      await createEnrollment(newEnrollment)
      setNewEnrollment({
        studentId: '',
        courseId: '',
        coursePricePerSemester: '',
        courseTotalPrice: '',
        examDate: '',
        startDate: '',
        endDate: '',
      })
      fetchEnrollments()
    allUsers()
    fetchCourses()
      toast.success("Enrollment created successfully")
    } catch (error) {
        fetchEnrollments()
    allUsers()
    fetchCourses()
      toast.error(error.message)
    }
  }

  const handleEdit = (enrollment) => {
    setEditingId(enrollment._id)
    setEditedEnrollment(enrollment)
  }

  const handleSave = async () => {
    try {
      await updateEnrollment(editingId, editedEnrollment)
      setEditingId(null)
      fetchEnrollments()
    allUsers()
    fetchCourses()
      toast.success("Enrollment updated successfully")
    } catch (error) {
        fetchEnrollments()
    allUsers()
    fetchCourses()
      toast.error("Failed to update enrollment")
    }
  }

  const handleDelete = async (id) => {
      try {
        await deleteEnrollment(id)
        fetchEnrollments()
    allUsers()
    fetchCourses()
        toast.success("Enrollment deleted successfully")
      } catch (error) {
        fetchEnrollments()
    allUsers()
    fetchCourses()
        toast.error("Failed to delete enrollment")
      }
  }

  const formatDate = (date) => {
    return format(new Date(date), 'MMM d, yyyy')
  }

  const filteredEnrollments = activeTab === 'all' 
    ? enrollments 
    : enrollments.filter(enrollment => enrollment.course._id === activeTab)

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin text-info" />
//       </div>
//     )
//   }

  return (
    <div className=" p-4 md:p-10 lg:p-20 bg-slate-700  min-h-screen ">
      <h1 className="text-4xl font-bold text-info mb-8 text-center">Manage Enrollments</h1>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />

      <div className="card bg-slate-800 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Add Enrollment</h2>
          <form onSubmit={handleAddEnrollment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">Student</label>
              <select
                value={newEnrollment.studentId}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, studentId: e.target.value })}
                className="select select-bordered"
                required
              >
                <option value="" disabled>Select Student</option>
                {students.map(user => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">Course</label>
              <select
                value={newEnrollment.courseId}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, courseId: e.target.value })}
                className="select select-bordered"
                required
              >
                <option value="" disabled>Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">Course Price Per Semester</label>
              <input
                type="number"
                value={newEnrollment.coursePricePerSemester}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, coursePricePerSemester: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Total Course Price</label>
              <input
                type="number"
                value={newEnrollment.courseTotalPrice}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, courseTotalPrice: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Exam Date</label>
              <input
                type="date"
                value={newEnrollment.examDate}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, examDate: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Start Date</label>
              <input
                type="date"
                value={newEnrollment.startDate}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, startDate: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">End Date</label>
              <input
                type="date"
                value={newEnrollment.endDate}
                onChange={(e) => setNewEnrollment({ ...newEnrollment, endDate: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
            <div className="col-span-full">
              <button type="submit" className="btn btn-info w-full">Add Enrollment</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card bg-slate-800 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Enrollment List</h2>
          <div className="tabs tabs-boxed mb-4">
            <a 
              className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Courses
            </a>
            {courses.map(course => (
              <a
                key={course._id}
                className={`tab ${activeTab === course._id ? 'tab-active' : ''} text-yellow-600 text-xs`}
                onClick={() => setActiveTab(course._id)}
              >
                {course.name}
              </a>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="hidden md:table-cell">Student</th>
                  <th>Course</th>
                  <th className="hidden md:table-cell">Price/Semester</th>
                  <th className="hidden md:table-cell">Total Price</th>
                  <th>Exam Date</th>
                  <th className="hidden md:table-cell">Start Date</th>
                  <th className="hidden md:table-cell">End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map(enrollment => (
                  <tr key={enrollment._id}>
                    <td className="hidden md:table-cell">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4" />
                        <span>{enrollment.student.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <Book className="w-4 h-4" />
                        <span>{enrollment.course.name}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">${enrollment.coursePricePerSemester}</td>
                    <td className="hidden md:table-cell">${enrollment.courseTotalPrice}</td>
                    <td>
                      {editingId === enrollment._id ? (
                        <input
                          type="date"
                          value={editedEnrollment.examDate}
                          onChange={(e) => setEditedEnrollment({ ...editedEnrollment, examDate: e.target.value })}
                          className="input input-bordered input-sm"
                        />
                      ) : (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(enrollment.examDate)}</span>
                        </div>
                      )}
                    </td>
                    <td className="hidden md:table-cell">{formatDate(enrollment.startDate)}</td>
                    <td className="hidden md:table-cell">{formatDate(enrollment.endDate)}</td>
                    <td>
                      {editingId === enrollment._id ? (
                        <>
                          <button className="btn btn-sm btn-success mr-2" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                          </button>
                          <button className="btn btn-sm btn-error" onClick={() => setEditingId(null)}>
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-info mr-2" onClick={() => handleEdit(enrollment)}>
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="btn btn-sm btn-error" onClick={() => handleDelete(enrollment._id)}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}