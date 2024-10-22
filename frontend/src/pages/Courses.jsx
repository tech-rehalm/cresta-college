'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mail, Phone, MapPin, Star, Loader, Clock,CheckCircle, Calendar, DollarSign } from 'lucide-react'
import useCourseStore from '../store/courseStore'
import { toast } from 'react-toastify'

const mentors = [
  { name: 'Dr. Jane Smith', image: '/t3.jpg', specialty: 'Computer Science', rating: 4.9 },
  { name: 'Prof. John Doe', image: '/t4.jpg', specialty: 'Business Administration', rating: 4.8 },
  { name: 'Dr. Emily Brown', image: '/t5.jpg', specialty: 'Accounting', rating: 4.7 },
]

export default function CoursesPage() {
  const { courses, fetchCourses } = useCourseStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])
  const [sendingForm, setSendingForm] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  useEffect(() => {
    setFilteredCourses(
      courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, courses])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSendingForm(true)
    setResult('Sending ...')
    const formData = new FormData(e.target)

    formData.append("access_key", "951966d0-4c89-44d5-9994-141b01990e40")
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setResult('Message sent successfully!')
        toast.success('Message sent successfully!')
        e.target.reset()
      } else {
        setResult('Failed to send message')
        toast.error('Failed to send message')
      }
    } catch (error) {
      setResult('Error sending message. Please try again.')
      toast.error('Error sending message. Please try again.')
    } finally {
      setSendingForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 text-gray-100 mt-[60px]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Our Courses</h1>
        
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 rounded-full border-2 border-blue-500 focus:outline-none focus:border-blue-600 bg-slate-700 text-gray-100 font-bold"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                key={course._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">
                    {course.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-blue-400 mb-2">{course.name}</h2>
                  <p className="text-gray-300 mb-4 text-sm">{course.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Semesters: {course.semesters}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-lg font-bold text-green-400">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span>{course.pricePerSemester}/semester</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">Our Experienced Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-700 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{mentor.name}</h3>
                  <p className="text-gray-300 mb-2">{mentor.specialty}</p>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" />
                    <span>{mentor.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row bg-slate-900 rounded-lg overflow-hidden mt-10 lg:mt-20">
      <div className="md:w-1/2 bg-emerald-500 p-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h2>
        <p className="text-slate-800 mb-6">
          We'd love to hear from you! Reach out for
          admissions, inquiries, or just to say hello.
        </p>
        <ul className="space-y-2">
          <li className="flex items-center text-slate-800">
            <CheckCircle className="mr-2" /> 24/7 Student Support
          </li>
          <li className="flex items-center text-slate-800">
            <CheckCircle className="mr-2" /> World-Class Education
          </li>
          <li className="flex items-center text-slate-800">
            <CheckCircle className="mr-2" /> Career Guidance
          </li>
        </ul>
      </div>
      <div className="md:w-1/2 p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="johndoe@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-emerald-500 text-slate-900 py-2 px-4 rounded-md font-semibold hover:bg-emerald-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sendingForm ? (
              <Loader className='animate-spin mr-2 inline-block' />
            ) : (
              <CheckCircle className='mr-2 inline-block' />
            )}
            Send Message
          </motion.button>
        </form>
        {result && <p className="text-emerald-400 font-bold mt-4">{result}</p>}
      </div>
    </div>
      </motion.div>
    </div>
  )
}