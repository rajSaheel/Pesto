const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGO_DB_URI

app.use(express.json())

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
