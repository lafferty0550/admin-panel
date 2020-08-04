import express from 'express'

import checkAuth from '../middlewares/auth'

const router = express.Router()

import {
    getCategories,
    getCategory,
    createCategory,
    putCategory,
    deleteCategory
} from '../controllers/categories'

router.get('/', checkAuth, getCategories)
router.get('/:id', checkAuth, getCategory)
router.post('/', checkAuth, createCategory)
router.put('/:id', checkAuth, putCategory)
router.delete('/:id', checkAuth, deleteCategory)

export default router