import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/me`,{},{
    headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}`}})
      setUser(response.data.decoded)
    } catch (error) {
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/token`,{refreshToken:localStorage.getItem('refreshToken')})
        localStorage.setItem('accessToken',response.data.accessToken)
        setUser(response.data.user)
      }catch(e){
        setUser(null)
      }
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password })
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      setUser(response.data.user)
      setError(null)
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError({login:'Invalid credentials'})
      } else if(error.response && error.response.status === 401){
        setError({login:'User not registered'})
      }
      else {
        setError({login:'An error occurred. Please try again.'})
      }
    }
  }

  const register = async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData,{headers:{
        'Content-Type':'multipart/form-data'
      }})
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      setUser(response.data.user)
      setError(null)
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError({register:'Username already registered'})
      } else {
        setError({register:'An error occurred. Please try again.'})
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    
  }

  const isAuthenticated = () => {
    return !!user
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, error,fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
