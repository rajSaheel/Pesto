const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Task = require('../models/Task')

// Create Task
router.post('/', authMiddleware.auth, async (req, res) => {
  const { title, description, status,dueDate } = req.body
  const userId = req.user.id
  const date = new Date(dueDate)
  try {
    const task = new Task({ title, description, status, userId: userId,dueDate:date })
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error',error:error.message })
  }
})

// Read Tasks (All)
router.get('/', authMiddleware.auth, async (req, res) => {
  const userId = req.user.id

  try {
    const tasks = await Task.find({ userId: userId })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error:error.message })
  }
})

// Read Task
router.get('/:id', authMiddleware.auth, async (req, res) => {
  const userId = req.user.id
  const taskId = req.params.id
  try {
    const tasks = await Task.findOne({ userId: userId, _id:taskId })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Server error', })
  }
})

// Update Task
router.put('/:id', authMiddleware.auth, async (req, res) => {
  const taskId = req.params.id
  const { title, description, status } = req.body
  const userId = req.user.id

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: userId },
      { title, description, status },
      { new: true }
    )
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete Task
router.delete('/:id', authMiddleware.auth, async (req, res) => {
  const taskId = req.params.id
  const userId = req.user.id

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId: userId })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
