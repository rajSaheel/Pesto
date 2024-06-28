const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')

router.post('/register', authMiddleware.register)
router.post('/login', authMiddleware.login)
router.post('/token', authMiddleware.refreshToken)

module.exports = router
