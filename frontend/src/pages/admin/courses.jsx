"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, Edit, Trash, Save, X } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as filestack from 'filestack-js'
import useCourseStore from '../../store/courseStore'

export default function CoursesAdmin() {
  const { courses, fetchCourses, createCourse, editCourse, deleteCourse } = useCourseStore()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [semesters, setSemesters] = useState("")
  const [pricePerSemester, setPricePerSemester] = useState("")
  const [examPrice, setExamPrice] = useState("")
  const [duration, setDuration] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [editingCourse, setEditingCourse] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const filestackClient = filestack.init("AxE8x2IMRQSmQfUnVU5rLz")

  const uploadImage = () => {
    filestackClient.picker({
      onUploadDone: (res) => {
        const uploadedFileUrl = res.filesUploaded[0].url
        setImageUrl(uploadedFileUrl)
      },
    }).open()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createCourse({
        name,
        description,
        semesters: parseInt(semesters),
        pricePerSemester: parseFloat(pricePerSemester),
        examPrice: parseFloat(examPrice),
        image: imageUrl,
        duration
      })
      toast.success("Course created successfully")
      // Reset form fields
      setName("")
      setDescription("")
      setSemesters("")
      setPricePerSemester("")
      setExamPrice("")
      setDuration("")
      setImageUrl("")
      fetchCourses() // Refresh the course list
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    }
  }

  const handleEdit = (course) => {
    setEditingCourse({ ...course })
  }

  const handleSaveEdit = async () => {
    try {
      await editCourse(editingCourse._id, editingCourse)
      setEditingCourse(null)
      toast.success("Course updated successfully")
      fetchCourses() // Refresh the course list
    } catch (error) {
      toast.error(error.message || "Error updating course")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id)
        toast.success("Course deleted successfully")
        fetchCourses() // Refresh the course list
      } catch (error) {
        toast.error(error.message || "Error deleting course")
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8  mt-[50px] bg-grid-white/[0.05] relative">
         <div className="absolute left-[20%] z-[0] w-[60%] h-[60%] -top-0 rounded-full blue__gradient bottom-40" />
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-[#0000004d] backdrop-blur-sm p-8 rounded-lg shadow-lg relative z-10"
      >
        <h1 className="text-4xl font-bold text-center text-accent mb-8">Course Management</h1>

        <form onSubmit={handleSubmit} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Add New Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor='image' className="label cursor-pointer justify-center">
                <span className="label-text sr-only">Upload Image</span>
                <div className="w-4/5 h-32 rounded-lg bg-base-300 flex items-center justify-center text-primary overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload size={40} />
                  )}
                </div>
              </label>
              <button type="button" onClick={uploadImage} className="w-full p-2 btn btn-info  mt-2">
                Upload Image
              </button>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                className="w-full p-2 input input-info bg-slate-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Course Name"
                required
              />
              <input 
                type="number" 
                className="w-full p-2 input input-info bg-slate-900"
                value={semesters}
                onChange={(e) => setSemesters(e.target.value)}
                placeholder="Number of Semesters"
                required
              />
              <input 
                type="number" 
                className="w-full p-2 input input-info bg-slate-900"
                value={pricePerSemester}
                onChange={(e) => setPricePerSemester(e.target.value)}
                placeholder="Price per Semester"
                required
              />
              <input 
                type="number" 
                className="w-full p-2 input input-info bg-slate-900"
                value={examPrice}
                onChange={(e) => setExamPrice(e.target.value)}
                placeholder="Exam Price"
                required
              />
              <input 
                type="text" 
                className="w-full p-2 input input-info bg-slate-900"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Course Duration"
                required
              />
            </div>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-20 p-2 input input-info bg-slate-900 mt-4"
            placeholder="Enter course description"
            rows={4}
            required
          ></textarea>
          <button
            className="w-full px-10 py-4 mt-6 rounded-md shadow-lg bg-accent text-white font-semibold hover:bg-accent/80 transition focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
            type="submit"
          >
            Add Course
          </button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-accent">Course List</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Semesters</th>
                  <th>Price/Semester</th>
                  <th>Exam Price</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      {editingCourse && editingCourse._id === course._id ? (
                        <input
                          type="text"
                          value={editingCourse.name}
                          onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})}
                          className="w-full p-2 rounded-md bg-slate-900"
                        />
                      ) : (
                        course.name
                      )}
                    </td>
                    <td>
                      {editingCourse && editingCourse._id === course._id ? (
                        <input
                          type="number"
                          value={editingCourse.semesters}
                          onChange={(e) => setEditingCourse({...editingCourse, semesters: e.target.value})}
                          className="w-full p-2 rounded-md bg-slate-900"
                        />
                      ) : (
                        course.semesters
                      )}
                    </td>
                    <td>
                      {editingCourse && editingCourse._id === course._id ? (
                        <input
                          type="number"
                          value={editingCourse.pricePerSemester}
                          onChange={(e) => setEditingCourse({...editingCourse, pricePerSemester: e.target.value})}
                          className="w-full p-2 rounded-md bg-slate-900"
                        />
                      ) : (
                        course.pricePerSemester
                      )}
                    </td>
                    <td>
                      {editingCourse && editingCourse._id === course._id ? (
                        <input
                          type="number"
                          value={editingCourse.examPrice}
                          onChange={(e) => setEditingCourse({...editingCourse, examPrice: e.target.value})}
                          className="w-full p-2 rounded-md bg-slate-900"
                        />
                      ) : (
                        course.examPrice
                      )}
                    </td>
                    <td>
                      {editingCourse && editingCourse._id === course._id ? (
                        <input
                          type="text"
                          value={editingCourse.duration}
                          onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})}
                          className="w-full p-2 rounded-md bg-slate-900"
                        />
                      ) : (
                        course.duration
                      )}
                    </td>
                    <td>
                      {editingCourse && editingCourse._id === course._id ? (
                        <div className="flex space-x-2">
                          <button onClick={handleSaveEdit} className="btn btn-sm btn-accent">
                            <Save size={16} />
                          </button>
                          <button onClick={() => setEditingCourse(null)} className="btn btn-sm btn-error">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button onClick={() => handleEdit(course)} className="btn btn-sm btn-accent">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(course._id)} className="btn btn-sm btn-error">
                            <Trash size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}