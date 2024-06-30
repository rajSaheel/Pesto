import React, { useContext } from 'react'
import  TaskContext  from '../../context/TaskContext'

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext)
  // const dueDate = new Date(task.dueDate).toDateString()
  const handleStatusChange = async (e) => {
    await updateTask(task._id, { ...task, status: e.target.value })
  }

  const handleDelete = async () => {
    await deleteTask(task._id)
  }

  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <select value={task.status} onChange={handleStatusChange}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
      {task.dueDate&&<p>Due:{new Date(task.dueDate).toDateString()}</p>}
    </li>
  )
}

export default TaskItem
