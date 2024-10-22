import React from 'react'
import { Bell, Calendar, MessageSquare, Search, User } from 'lucide-react'

export default function Structure() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="navbar bg-slate-800">
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <button className="btn btn-ghost btn-circle">
            <Bell className="h-5 w-5" />
          </button>
          <button className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/logo.svg" alt="Avatar" />
            </div>
          </button>
        </div>
      </nav>

      <main className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Overview</h1>
          <div className="flex flex-col gap-4 sm:flex-row items-center">
            <h2 className="md:text-xl flex md:font-semibold mr-4">My Progress</h2>
            <select className="select select-bordered select-sm w-full max-w-xs">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-slate-800 shadow-xl">
            <div className="p-2">
              <div className="flex items-center mb-4">
                
                <div>
                  <h2 className="card-title">Expected Timeline</h2>
                  <p className="text-gray-400">Student - Beginner - Pro</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2  gap-4">
                <div className="stat bg-slate-700 rounded-box">
                  <div className="stat-figure text-orange-400">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="stat-title">Follow Syllabus</div>
                  <div className="stat-value text-2xl">24/7</div>
                </div>
                <div className="stat bg-slate-700 rounded-box">
                  <div className="stat-figure text-yellow-400">
                    <User className="w-8 h-8" />
                  </div>
                  <div className="stat-title">Complete Sections</div>
                  <div className="stat-value text-2xl">Test</div>
                </div>
                <div className="stat bg-slate-700 rounded-box">
                  <div className="stat-figure text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div className="stat-title">Learning Points</div>
                  <div className="stat-value text-2xl">Reseach</div>
                </div>
                <div className="stat bg-slate-700 rounded-box">
                  <div className="stat-figure text-pink-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  </div>
                  <div className="stat-title">Online Time</div>
                  <div className="stat-value text-2xl">24/7</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-slate-800 shadow-xl">
            <div className="card-body">
              <div className="flexx lg:flex-row fle-col justify-between items-center mb-4">
                <div className="radial-progress text-blue-400" style={{"--value":48, "--size": "8rem"}}>48%</div>
                <div>
                  <div className="stat-title">Visited Lessons</div>
                  <div className="stat-value text-2xl">14/45</div>
                  <progress className="progress progress-warning w-56" value="14" max="45"></progress>
                </div>
              </div>
              <div>
                <div className="stat-title">Completed</div>
                <div className="stat-value text-2xl">12/25</div>
                <progress className="progress progress-info w-56" value="12" max="25"></progress>
              </div>
              <div className="mt-4">
                <div className="stat-title">Total Hours</div>
                <div className="stat-value text-3xl">7h 20m</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}