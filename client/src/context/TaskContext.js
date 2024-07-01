import React, { createContext, useState , useContext} from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [error,setError] = useState(null)
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
      setError("Something went wrong!")
    }
    
  }

  const createTask = async (task) => {
    try{
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
      fetchTasks()
    }catch(e){
      setError("Something went wrong!")

    }
    
  }

  const updateTask = async (id, task) => {
    try{
      await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
      fetchTasks()
    }catch(e){
      setError('Something went wrong')
    }
    
  }

  const deleteTask = async (id) => {
    try{
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
      fetchTasks()
    }catch(e){
      setError('Something went wrong')
    }
    
  }

  

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, createTask, updateTask, deleteTask,error }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext
