import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader, Lock, Mail, User } from "lucide-react";
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';


export default function Signup() {
  const [role, setRole ] = useState("")
  const [name, setName ] = useState("")
  const [email, setEmail ] = useState("")
  const [password, setPassword ] = useState("")
  const {signup, error, isLoading} = useAuthStore()
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(name, email, password, role);
    
    try {
      await signup(name, email, password, role)
      toast.success("Account created")
      navigate("/login")
    } catch (error) {
      console.log(error);
        const errorMessage = error.response?.data?.message || "Login failed";
        toast.error(errorMessage);
    }
  }
  return (
    <div className='w-full h-screen flex items-center justify-center text-info'>
      <form onSubmit={handleSubmit} className="w-[300px] p-5 rounded-lg border border-gray-700 shadow-inner  flex flex-col">
        <div className="w-full font-bold text-xl mb-2">Create Account</div>
        <select name="role" id="role" className='select select-info'  onChange={(e) =>setRole(e.target.value)}>
          <option className='disabled selected'>Select yor role</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="parent">Parent</option>
          <option value="other">Other</option>
        </select>
        <input 
          type="text"
          placeholder='Full Name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='input  my-2 input-info'
          />
           <input 
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='input  my-2 input-info'
          />
           <input 
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className='input  my-2 input-info'
          />
          <button className="btn btn-info">{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}</button>
          <p className="text-gray-300 font-light text-sm my-2">Already have an account? <Link to={"/login"} className="hover:underline text-info">Sign in</Link></p>
      </form>
    </div>
  )
}
