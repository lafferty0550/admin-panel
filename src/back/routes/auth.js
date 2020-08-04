import express from 'express'

const router = express.Router()

import {checkEmail} from '../middlewares/auth'
import {signup, signin, refreshToken} from '../controllers/auth'

router.post('/signup', checkEmail, signup)
router.post('/signin', signin)
router.post('/token', refreshToken)

export default router