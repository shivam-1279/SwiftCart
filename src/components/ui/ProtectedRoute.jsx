import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../../api'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null)

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh')
    if (!refreshToken) {
      setIsAuthorized(false)
      return false
    }

    try {
      const res = await api.post('/token/refresh/', {
        refresh: refreshToken,
      })
      if (res.status === 200) {
        localStorage.setItem('access', res.data.access)
        setIsAuthorized(true)
        return true
      } else {
        setIsAuthorized(false)
        return false
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      // Clear invalid tokens
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      setIsAuthorized(false)
      return false
    }
  }

  const auth = async () => {
    const token = localStorage.getItem('access')
    if (!token) {
      setIsAuthorized(false)
      return
    }

    try {
      const decoded = jwtDecode(token)
      const expiryDate = decoded.exp
      const currentTime = Date.now() / 1000
      const tokenExpired = currentTime > expiryDate

      if (tokenExpired) {
        await refreshToken()
      } else {
        // Token is valid, verify it works by making a test request
        try {
          // Optional: You can make a lightweight API call to verify token
          // await api.get('/user_items/') - but this might be heavy
          setIsAuthorized(true)
        } catch (error) {
          // Token might be invalid server-side, try refresh
          await refreshToken()
        }
      }
    } catch (error) {
      console.error('Token validation error:', error)
      await refreshToken()
    }
  }

  if (isAuthorized === null) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return isAuthorized ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute