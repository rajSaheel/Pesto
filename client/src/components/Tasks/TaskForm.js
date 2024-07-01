import React, { useState, useContext } from 'react'
import TaskContext from '../../context/TaskContext'

const TaskForm = () => {
  const date = new Date()
  const formattedDate = date.toISOString().split('T')[0]
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status,setStatus] = useState('To Do')
  const [dueDate,setDueDate] = useState(null)
  const { createTask } = useContext(TaskContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createTask({ title, description, status,dueDate })
    setTitle('')
    setDescription('')
    setStatus('To Do')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input type='date' onChange={(e)=>setDueDate(e.target.value)} min={formattedDate}/>
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
