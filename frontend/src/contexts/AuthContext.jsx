import React, { createContext, useState, useEffect } from 'react'
import API from '../api/blog.js'

export const AuthContext = createContext()

// Provider component
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if the user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await API.get('/users/me')
        if (response.data && response.data.data) {
          setAuthData(response.data.data)
        }
      } catch (error) {
        console.error('Not authenticated', error)
        setAuthData(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (user) => {
    setAuthData(user)
  }

  const signup = (user) => {
    setAuthData(user)
  }

  const logout = async () => {
    try {
      await API.post('/users/logout')
      setAuthData(null)
      console.log('Successfully logged out')
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
