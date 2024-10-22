'use client'

import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, BookOpen, Calendar, Map, FileText, Users, LogOut, 
  ChevronRight, BarChart2, Award, Clock,
  Menu,
  X,
  DollarSign,
  User
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import useCourseStore from '../store/courseStore'
import { useEnrollmentStore } from '../store/useEnrollementStore'
import { format } from 'date-fns'
import Structure from '../components/Structure'
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}


export default function StudentDashboard() {
  const { user,logout } = useAuthStore()
  const { courses, fetchCourses } = useCourseStore()
  const {enrollments, fetchEnrollments} = useEnrollmentStore()
  const enrolledCourse = enrollments.filter(enrollment => enrollment.student._id === user._id)
  const [hideBar, setHideBar] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const handleLogout = () => {
    logout()
    setProfile(false)
  }

  const formatDate = (date) => {
    return format(new Date(date), 'MMM d, yyyy')
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: BookOpen, label: 'My Courses' },
    { icon: Calendar, label: 'My Status' },
    { icon: FileText, label: 'Assignments' },
    { icon: Users, label: 'Groups' },
    { icon: Map, label: 'Forum' },
    { icon: BarChart2, label: 'Analytics' },
  ]
  console.log(enrolledCourse)

  useEffect(()=>{
    fetchCourses()
    fetchEnrollments()
    fetchEnrollments()
  },[])

  return (
    <div className="min-h-screen bg-slate-800 text-white relative">
      <div className="flex ">
        {/* Sidebar */}
        
        <motion.aside 
          className={` absolute top-0 md:fixed   bottom-0 transition duration-500 w-44 bg-slate-900 z-10 p-4 h-screen   pt-[70px] ${hideBar && "hidden"}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >

          <h1 className="text-2xl font-bold mb-8 text-info">Cresta
          </h1>
          <div className="flex items-center mb-8">
            <img src="/p2.webp" alt={user.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-400">{user.role}</p>
            </div>
          </div>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
                    <item.icon size={20} className="text-info" />
                    <span >{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="mt-8 flex items-center gap-3 text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-slate-800 transition-colors w-full">
            <LogOut size={20} /> Log out
          </button>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-44 p-8 pt-[70px] w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="md:text-3xl flex font-bold">{user.name}&apos; Dashboard</h1>
            <div className="flex gap-4">
              <button className="btn btn-outline btn-info">
                <Calendar size={20} />
              </button>
              <button className="btn btn-info md:hidden" onClick={()=>setHideBar(!hideBar)}>
            {hideBar? <Menu /> : <X />}
            </button>
            </div>
          </div>


          {enrolledCourse.length > 0 && <motion.section {...fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border-2 rounded-xl border-gray-700 bg-gray-800 p-4">
            <div className="border-2  rounded-xl border-gray-800 h-36 bg-gray-900 p-4">
              <div className="flex  items-center ">
                <img src={`${enrolledCourse[0].course.image}`} alt="" className="h-14 w-14 rounded-full" />
                <h1 className="text-2xl font-extrabold text-info md:text-3xl ml-4">
                {enrolledCourse[0].course.name}
              </h1>
              </div>
              <p className=" font-bold text-info md:text-lg flex items-center my-1">
                Total Fees <span className="text-fuchsia-600 flex items-center"><DollarSign className='p-1'/>{enrolledCourse[0].courseTotalPrice}</span>
              </p>
            </div>
            </div>
            <div className="border-2 rounded-xl border-gray-700 bg-gray-800 p-4">
            <div className="border-2 rounded-xl border-gray-800  h-36  bg-gray-900 p-4">
              <div className="flex  flex-col">
                <h1 className="text-xl font-extrabold text-info md:text-xl ">
                Total Fees {enrolledCourse[0].courseTotalPrice}
              </h1>
              </div>
              
              <p className=" font-bold text-info text-sm flex items-center ">
                Total semesters: <span className="text-warning ml-3">{enrolledCourse[0].course.semesters}</span>  
              </p>
              <p className=" font-bold text-info text-sm flex items-center ">
                Course start date: <span className="text-warning ml-3">{formatDate(enrolledCourse[0].startDate)}</span>  
              </p>
              <p className=" font-bold text-info text-sm flex items-center ">
                Course end date: <span className="text-warning ml-4">{formatDate(enrolledCourse[0].endDate)}</span>  
              </p>
            </div>
            </div>
            <div className="border-2 rounded-xl border-gray-700 bg-gray-800 p-4">
            <div className="border-2 rounded-xl border-gray-800  h-36  bg-gray-900 p-4">
              <div className="flex  flex-col">
                <h1 className="text-xl font-extrabold text-info md:text-xl flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-bl from-purple-600 to-blue-600 rounded-full p-2 text-black mr-2"><User/></div>
                <p className="bg-gradient-to-r from-purple-600 to-[aqua] text-xl bg-clip-text text-transparent ">{user.name}</p>
              </h1>
              </div>
              
              <p className=" font-bold text-info md:text-sm flex items-center ">
                Email<span className="text-warning m-3">{user.email}</span>  
              </p>
              <p className=" font-bold text-info md:text-sm flex items-center ">
                Role:  <span className="text-warning ml-3">{user.role}</span>  
              </p>
             
            </div>
            </div>
           
          </motion.section>}

          {/* Course Statistics and Activities */}
         

          {/* Summary and Topics */}
          <div className="">
            <motion.section {...fadeIn} className="bg-slate-700 p-1 rounded-lg">
              <Structure/>
            </motion.section>

            <motion.section {...fadeIn} className="bg-slate-700 p-6 rounded-lg my-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">Tip for studying</h3>
                <button className="btn btn-sm btn-outline btn-info">View all</button>
              </div>
              {['Online Research', 'Collaboration', 'Goal minded'].map((topic, index) => (
                <div key={index} className="flex justify-between items-center mb-4">
                  <span>{`0${index + 1} ${topic}`}</span>
                  <span className="badge badge-info">{75 - index * 10}%</span>
                </div>
              ))}
            </motion.section>
          </div>
        </main>

        {/* Right Sidebar */}
        {/* <motion.aside 
          className="w-80 bg-slate-900 p-4 h-screen fixed right-0 overflow-y-auto pt-[70px]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">My courses</h2>
          {enrolledCourses.map((course, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">{course.name}</h3>
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <progress className="progress progress-info w-full" value="75" max="100"></progress>
            </div>
          ))}
          {enrolledCourse.map((enrollment, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">{enrollment.course.name}</h3>
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <progress className="progress progress-info w-full" value="75" max="100"></progress>
            </div>
          ))}

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Course schedule</h3>
            <div className="flex justify-between mb-4">
              {['12 Dec', '14 Dec', '16 Dec', '18 Dec'].map((date, index) => (
                <div key={index} className={`text-center ${index === 2 ? 'bg-info text-white' : ''} rounded-full p-2`}>
                  <div className="text-sm">{date.split(' ')[0]}</div>
                  <div className="font-bold">{date.split(' ')[1]}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Award size={20} className="text-info mr-2" />
                <span>Introduction</span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="text-info mr-2" />
                <span>Starting Your Next Project</span>
              </div>
            </div>
          </div>
        </motion.aside> */}
      </div>
    </div>
  )
}