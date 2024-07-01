import React, { createContext, useState , useContext} from 'react'
import axios from 'axios'
import { fetchUser } from './AuthContext'
import AuthContext from './AuthContext'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const { fetchUser } = useContext(AuthContext)

  const sortArr = (unsortedArr)=>{
    const notNullArr = unsortedArr.filter(task=>task.dueDate!=null)
    const nullArr = unsortedArr.filter(task=>task.dueDate==null)
    return notNullArr.concat(nullArr)
  }

  const fetchTasks = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
      
      const finalArr = sortArr(response.data)
      setTasks(finalArr)
    }catch(e){
      fetchUser()
    }
    
  }

  const createTask = async (task) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    fetchTasks()
  }

  const updateTask = async (id, task) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    fetchTasks()
  }

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext
