import React, { useState, useContext } from 'react'
import { TaskContext } from '../../context/TaskContext'

const TaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { createTask } = useContext(TaskContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createTask({ title, description, status: 'To Do' })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
