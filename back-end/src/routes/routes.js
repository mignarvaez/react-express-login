import express from 'express'
import { register, login, home } from '../controller/controller.js'
import { verifyToken } from '../lib/utils.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/home', verifyToken, home)

export default router;