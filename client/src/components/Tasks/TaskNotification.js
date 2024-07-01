import React, { useContext, useState, useEffect } from "react"
import TaskContext from "../../context/TaskContext"

const TaskNotification = () => {
    const [dueTasks, setDueTasks] = useState([])
    const [visible, setVisible] = useState(true)
    const { tasks } = useContext(TaskContext)

    const getDueTasks = (tasks) => {
        const date = new Date()
        const soon = new Date()
        soon.setDate(date.getDate() + 2)
  
        const dueTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate)
            return dueDate <= soon && task.dueDate && task.status !== 'Done'
        })
  
        return dueTasks
    }

    const handleClose = () => {
        setVisible(false)
    }

    useEffect(() => {
        const dueSoonTasks = getDueTasks(tasks)
        if(JSON.stringify(dueSoonTasks)!==JSON.stringify(dueTasks))
        setDueTasks(dueSoonTasks)
        
    }, [tasks])

    useEffect(()=>{
        if (dueTasks.length > 0) {
            setVisible(true)
            const timer = setTimeout(() => setVisible(false), 10000)
            return () => clearTimeout(timer)
        }
    },[dueTasks])

    return (
        <>
            {dueTasks.length > 0 && visible && (
                <div className="notification-popup">
                    <button className="close-btn" onClick={handleClose}>X</button>
                    <h3>Tasks Due Soon</h3>
                    <ul>
                        {dueTasks.map(task => (
                            <li key={task._id}>{task.title} - Due on {new Date(task.dueDate).toLocaleDateString()}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default TaskNotification
