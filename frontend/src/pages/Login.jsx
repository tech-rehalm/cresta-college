import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from "lucide-react";
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail ] = useState("")
  const [password, setPassword ] = useState("")
  const {login, error, isLoading} = useAuthStore()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        await login(email, password);
        toast.success("Login successful");
        navigate("/");
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || "Login failed";
        toast.error(errorMessage);
    }
};

  return (
    <div className='w-full h-screen flex items-center justify-center text-info bg-gradient-to-t from-transparent '>
      <form onSubmit={handleSubmit} className="w-[300px] p-5 rounded-lg border border-gray-700 shadow-inner  flex flex-col backdrop-blur-lg  shadow-gray-700">
        <div className="w-full font-bold text-xl mb-2">Sign In</div>
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
          <button className="btn btn-info">{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign In"}</button>
          <p className="text-gray-300 font-light text-sm my-2">Doesn't have an account? <Link to={"/signup"} className="hover:underline text-info">Sign Up</Link></p>
      </form>
    </div>
  )
}
