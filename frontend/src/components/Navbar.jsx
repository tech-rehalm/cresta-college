'use client'

import React, { useState, useEffect } from 'react'
import { useAuthStore } from "../store/authStore"
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bell, BookOpen, Calendar, Home, Info, LogIn, LogOut, Menu, User, X } from 'lucide-react'

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up")

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? "down" : "up"
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener("scroll", updateScrollDirection)
    return () => {
      window.removeEventListener("scroll", updateScrollDirection)
    }
  }, [scrollDirection])

  return scrollDirection
}

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [profile, setProfile] = useState(false)
  const { scrollY } = useScroll()
  const scrollDirection = useScrollDirection()

  const handleLogout = () => {
    logout()
    setProfile(false)
  }

  const navVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && scrollDirection === "down") {
      setIsOpen(false)
    }
  })

  return (
    <motion.nav
      variants={navVariants}
      animate={scrollDirection === "up" || scrollY.get() < 50 ? "visible" : "hidden"}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="navbar fixed top-0 left-0 right-0 z-50 bg-base-200 bg-opacity-90 backdrop-blur-sm border-b border-info/10 shadow-md"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="btn btn-ghost text-xl text-info">
          <img src="/logo.svg" alt="Cresta College Logo" className="w-8 h-8 mr-2" />
          <span className="hidden sm:inline">Cresta College</span>
        </Link>
        <div className="flex-none hidden md:block">
          <ul className="menu menu-horizontal px-1 text-info">
            <li><Link to="/"><Home className="w-4 h-4 mr-2" /> Home</Link></li>
            <li><Link to="/about"><Info className="w-4 h-4 mr-2" /> About</Link></li>
            <li><Link to="/courses"><BookOpen className="w-4 h-4 mr-2" /> Courses</Link></li>
            <li><Link to="/events"><Calendar className="w-4 h-4 mr-2" /> Events</Link></li>
          </ul>
        </div>
        <div className="flex items-center">
          <button className="btn btn-ghost btn-circle text-info mr-2">
            <a href='/notifications' className="indicator">
              <Bell className="w-5 h-5" />
              <span className="badge badge-xs badge-info indicator-item"></span>
            </a>
          </button>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.avatar || `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={`${user.name[0]}`} />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                <li><Link to={`/dashboard`}> My Dashboard</Link></li>
                {user.role === "admin" && (
                  <>
                  <li><Link to="/admin">Admin</Link></li>
                  <li><Link to="/admin/events">Events Admin</Link></li>
                  <li><Link to="/admin/courses">Courses Admin</Link></li>
                  <li><Link to="/admin/users">Users Admin</Link></li>
                  <li><Link to="/admin/enroll">Enrollemnts</Link></li>
                  </>
                )}
                <li><button onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link to="/signup" className="btn btn-ghost btn-sm mr-2">Register</Link>
              <Link to="/login" className="btn btn-info btn-sm"><LogIn className="w-4 h-4 mr-2" /> Log in</Link>
            </div>
          )}
          <button 
            className="btn btn-ghost btn-circle text-info ml-2 md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile and desktop menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-base-200 border-t border-info/10"
      >
        <ul className="menu menu-vertical px-1 py-2 text-info">
          <li><Link to="/" onClick={() => setIsOpen(false)}><Home className="w-4 h-4 mr-2" /> Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}><Info className="w-4 h-4 mr-2" /> About</Link></li>
          <li><Link to="/courses" onClick={() => setIsOpen(false)}><BookOpen className="w-4 h-4 mr-2" /> Courses</Link></li>
          <li><Link to="/events" onClick={() => setIsOpen(false)}><Calendar className="w-4 h-4 mr-2" /> Events</Link></li>
          {!user && (
            <>
              <li><Link to="/signup" onClick={() => setIsOpen(false)}>Register</Link></li>
              <li><Link to="/login" onClick={() => setIsOpen(false)}><LogIn className="w-4 h-4 mr-2" /> Log in</Link></li>
            </>
          )}
        </ul>
      </motion.div>
    </motion.nav>
  )
}