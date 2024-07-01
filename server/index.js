const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGO_DB_URI

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())
// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)
app.get("/",(req,res)=>{
  res.json("{welcome to the Pesto Task app}")
})
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
