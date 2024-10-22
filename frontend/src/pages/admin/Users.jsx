'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useAuthStore } from "../../store/authStore"
import { UserPlus, Loader2, Edit2, Trash2, Save, X,Users, Search, GraduationCap, Briefcase, Users2, ShieldCheck  } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UsersManagement() {
  const { users, allUsers, create, editUser, deleteUser, isLoading, error } = useAuthStore()
  
  // Local states
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' })
  const [editingId, setEditingId] = useState(null)
  const [editedUser, setEditedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Fetch all users once on component mount
  useEffect(() => {
    allUsers()
  }, [allUsers])

  const filteredUsers = activeTab === 'all' ? users : users.filter(user => user.role === activeTab)

  const tabs = [
    { id: 'all', label: 'All Users', icon: Users },
    { id: 'student', label: 'Students', icon: GraduationCap },
    { id: 'staff', label: 'Staff', icon: Briefcase },
    { id: 'parent', label: 'Parents', icon: Users2 },
    { id: 'admin', label: 'Admins', icon: ShieldCheck },
  ]

  // Handle input changes for new user
  const handleNewUserChange = (e) => {
    const { name, value } = e.target
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      await create(newUser.name, newUser.email, newUser.password, newUser.role)
      setNewUser({ name: '', email: '', password: '', role: 'user' })
      allUsers() 
      toast.success("User created successfully")
    } catch (error) {
      toast.error("Error creating a user")
      console.error('Error adding user:', error)
    }
  }

  // Initiate edit mode
  const handleEdit = (user) => {
    setEditingId(user._id)
    setEditedUser({ ...user }) // Set a copy of the user for editing
  }

  // Save edited user
  const handleSave = async () => {
    if (!editedUser) return
    try {
      await editUser(editingId, editedUser)
      setEditingId(null) // Exit editing mode
      setEditedUser(null)
      toast.success("User edited successfully")
      allUsers() // Refresh user list
    } catch (error) {
      toast.error("Error updating user")
      console.error('Error updating user:', error)
    }
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditedUser(null)
  }

  // Handle user deletion
  const handleDelete = async (id) => {
   
      try {
        await deleteUser(id)
        toast.success("User deleted successfully")
        allUsers() // Refresh user list after deletion
      } catch (error) {
        toast.error("Error deleting user")
        console.error('Error deleting user:', error)
    }
  }

  // Filter users based on search term
  const filteredUser = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
    
  )

  const roles = ['student', 'staff', 'parent', 'admin']
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen mt-[50px]">
  //       <Loader2 className="w-10 h-10 animate-spin text-info" />
  //     </div>
  //   )
  // }

  return (
    <div className=" p-4 md:p-10 lg:p-20 bg-slate-800 min-h-screen mt-[80px] w-full">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      <h1 className="text-4xl font-bold text-info mb-8 text-center">User Management</h1>

      {/* Add New User Form */}
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Add New User</h2>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4 roles">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleNewUserChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleNewUserChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleNewUserChange}
                className="select select-bordered"
              >
                <option value=''>Select Role</option>
                <option value="">User</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div className="col-span-full">
              <button type="submit" className="btn btn-info w-full">
                <UserPlus className="w-5 h-5 mr-2" />
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User List */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">User List</h2>

          {/* Search Bar */}
          <div className="form-control mb-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search users..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-square btn-info">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
          <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">User List</h2>
        <div className="tabs tabs-boxed mb-4">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
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
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    {editingId === user._id ? (
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="input input-bordered input-sm w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editingId === user._id ? (
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="input input-bordered input-sm w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editingId === user._id ? (
                      <select
                        value={editedUser.role}
                        onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        className="select select-bordered select-sm w-full"
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`badge ${
                        user.role === 'admin' ? 'badge-secondary' :
                        user.role === 'staff' ? 'badge-accent' :
                        user.role === 'parent' ? 'badge-warning' :
                        'badge-primary'
                      }`}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === user._id ? (
                      <>
                        <button className="btn btn-sm btn-success mr-2" onClick={handleSave}>
                          <Save className="w-4 h-4" />
                        </button>
                        <button className="btn btn-sm btn-error" onClick={handleCancelEdit}>
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-sm btn-info mr-2" onClick={() => handleEdit(user)}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="btn btn-sm btn-error" onClick={() => deleteUser(user._id)}>
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
        </div>
      </div>
    </div>
  )
}
