import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

const AdminLogin = ({setToken}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {

    try {
         e.preventDefault()
        const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
        if (response.data.success) {
            setToken(response.data.setToken)
            
        }else{
            toast.error(response.data.message)
        }
        

         
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
   
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">© 2025 Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
