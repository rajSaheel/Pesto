import React, { useState, useEffect, useContext } from 'react'
import TaskContext from '../../context/TaskContext.js'
import TaskForm from './TaskForm.js'
import TaskItem from './TaskItem.js'

const TaskListPage = () => {
  const { tasks, fetchTasks } = useContext(TaskContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filteredTasks, setFilteredTasks] = useState([])

  

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    const filterAndSearchTasks = () => {
      let updatedTasks = tasks
  
      // Filter tasks
      if (filterStatus !== 'All') {
        updatedTasks = updatedTasks.filter(task => task.status === filterStatus)
      }
  
      // Search tasks
      if (searchQuery) {
        updatedTasks = updatedTasks.filter(task =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
  
      setFilteredTasks(updatedTasks)
    }
    filterAndSearchTasks()
  }, [tasks, searchQuery, filterStatus])

  

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm/>
      <input
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <ul>
        {filteredTasks.map(task => 
          <TaskItem key={task._id} task={task}/>
        )}
      </ul>
    </div>
  )
}

export default TaskListPage
