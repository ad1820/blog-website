import React, { createContext, useState, useEffect } from 'react'
import API from '../api/blog'

// Create context
export const AuthContext = createContext()

// Provider component
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking if user is authenticated...')
        const response = await API.get('/users/me')
        console.log('Auth check response:', response)

        if (response.data && response.data.user) {
          console.log('User authenticated:', response.data.user)
          
          setAuthData({
            _id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            fullName: response.data.user.fullName,
            userName: response.data.user.userName
          })
        } else {
          console.log('No user data found')
          setAuthData(null)
        }
      } catch (error) {
        console.error('Error while checking authentication:', error)
        setAuthData(null)
      } finally {
        //console.log('Authentication check complete');
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = (user) => {
    //console.log('Logging in user:', user)
    setAuthData(user);
  }

  const signup = (user) => {
    //console.log('Signing up user:', user)
    setAuthData(user);
  }

  const logout = async () => {
    try {
      console.log('Logging out user...')
      await API.post('/users/logout')
      console.log('Successfully logged out')
      setAuthData(null)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ authData, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider