import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminLogin = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!email || !password) {
      toast.error('Please fill all fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/admin`,
        { email, password }
      )

      if (response.data.success) {
        // Store token in both state and localStorage
        const receivedToken = response.data.token
        setToken(receivedToken)
        localStorage.setItem('adminToken', receivedToken)
        
        toast.success('Login successful!')
        navigate('/admin/dashboard') // Redirect to admin dashboard
      } else {
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      
      if (error.response) {
        // Handle specific error messages from server
        const errorMsg = error.response.data?.message || 
                        error.response.statusText || 
                        'Login failed'
        toast.error(errorMsg)
        
        // Clear form if unauthorized
        if (error.response.status === 401) {
          setEmail('')
          setPassword('')
        }
      } else {
        toast.error('Network error. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Email Field (unchanged) */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="admin@example.com"
            />
          </div>

          {/* Password Field (unchanged) */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold py-2.5 rounded-lg transition duration-300 flex justify-center items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin