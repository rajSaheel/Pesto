import React, { useEffect, useContext } from 'react'
import { TaskContext } from '../../context/TaskContext.js'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'

const TaskList = () => {
  const { tasks, fetchTasks } = useContext(TaskContext)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm />
      <ul>
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
