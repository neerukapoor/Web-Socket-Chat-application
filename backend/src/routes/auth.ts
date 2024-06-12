const router = require('express').Router()
import authRouter from '../controllers/auth'

router.post('/signup', authRouter.signup)
router.post('/login', authRouter.login)

export default router