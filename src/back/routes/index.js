import express from 'express'

const router = express.Router()

import categoriesRoute from './categories'
import authRoute from './auth'

router.use('/categories/', categoriesRoute)
router.use('/auth/', authRoute)

export default router