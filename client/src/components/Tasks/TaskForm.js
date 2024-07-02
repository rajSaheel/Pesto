import React, { useState, useContext } from 'react'
import TaskContext from '../../context/TaskContext'

const TaskForm = ({method}) => {
  const date = new Date()
  const formattedDate = date.toISOString().split('T')[0]
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status,setStatus] = useState('To Do')
  const [dueDate,setDueDate] = useState('')
  const { createTask } = useContext(TaskContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createTask({ title, description, status,dueDate })
    setTitle('')
    setDescription('')
    setStatus('To Do')
    setDueDate('')
    method()
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input type='date' value={dueDate} onChange={(e)=>setDueDate(e.target.value)} min={formattedDate}/>
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
