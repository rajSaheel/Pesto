import React, { useState, useEffect, useContext } from 'react'
import TaskContext from '../../context/TaskContext.js'
import TaskForm from './TaskForm.js'
import TaskItem from './TaskItem.js'

const TaskList = () => {
  const { tasks, fetchTasks, error } = useContext(TaskContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filteredTasks, setFilteredTasks] = useState([])
  const [formVisibility, setFormVisibilty] = useState(false)

  const handleForm = () => setFormVisibilty(!formVisibility)

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
    <>
      {formVisibility ? <TaskForm method={handleForm} /> :
        <div className='task-content'>
          <div className='task-tools'>
            <div>
            <input
              type="text"
              placeholder="Search tasks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
            <div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            </div>
            
          </div>
          <div className='task-list-heading'>
            <h1>{error && error}</h1>
            <h1>Tasks</h1>
          </div>
          <ul className='task-list'>
            {filteredTasks.map(task =>
              <TaskItem key={task._id} task={task} />
            )}
          </ul>
        </div>
      }
      <span className='form-btn' onClick={handleForm}>+</span>
    </>

  )
}

export default TaskList
