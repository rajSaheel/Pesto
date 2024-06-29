const jwt = require('jsonwebtoken')
const User = require('../models/User')

const ACCESS_TOKEN_SECRET = 'access_token_secret'
const REFRESH_TOKEN_SECRET = 'refresh_token_secret'
const ACCESS_TOKEN_EXPIRATION = '15m'
const REFRESH_TOKEN_EXPIRATION = '7d' 

// Function to generate tokens
const generateTokens = (user) => {
  const payload = { id: user._id, username: user.username,name:user.name }
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION })
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION })
  return { accessToken, refreshToken,user:payload }
}

// Register a new user
exports.register = async (req, res, next) => {
  const { username, password, name } = req.body
  try {
    let user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    user = new User({ username, password, name })
    await user.save()

    const tokens = generateTokens(user)
    res.json(tokens)
  } catch (error) {
    res.status(500).json({ message: 'Server error',error:error.message })
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(402).json({ message: 'User not registered' })
    }
    else if(await user.comparePassword(password)){
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const tokens = generateTokens(user)
    res.json(tokens)
  } catch (error) {
    res.status(500).json({ message: 'Server error',error:error.message })
  }
}


exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body
  if (!refreshToken) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ message: 'User not found' })
    const payload = { id: user._id, username: user.username,name:user.name }
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION })
    res.json({ accessToken,user:payload })
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' })
  }
}


exports.auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' , error:e.message })
  }
}

exports.fetchUser = async(req,res)=>{
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if(!token) return res.status(401).json({message:'No token provided'})
  
  try{
    const decoded = jwt.verify(token,ACCESS_TOKEN_SECRET)
    res.json({decoded})
  }catch(e){
    res.status(401).json({message:'Invalid token',error:e.message})
  }
}