import React, { createContext, useState , useContext} from 'react'
import axios from 'axios'
import { fetchUser } from './AuthContext'
import AuthContext from './AuthContext'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const { fetchUser } = useContext(AuthContext)

  const fetchTasks = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
      setTasks(response.data)
    }catch(e){
      fetchUser()
    }
    
  }

  const createTask = async (task) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    setTasks([...tasks, response.data])
  }

  const updateTask = async (id, task) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    setTasks(tasks.map(t => (t._id === id ? response.data : t)))
  }

  const deleteTask = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    setTasks(tasks.filter(t => t._id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext
