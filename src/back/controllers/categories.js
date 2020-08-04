import db from '@back/models'
import ResonseBuilder from '@back/helpers/response-builder'

const {
    NOT_FOUND,
    EDITING_SUCCESSFUL,
    CREATING_SUCCESSFUL,
    DELETING_SUCCESSFUL
} = ResonseBuilder.messages

export const getCategories = async (req, res) => {
    try {
        res.status(200).json(ResonseBuilder.success(await db.category.find()))
    } catch (err) {
        console.error(err.toString())
        res.status(500).json(ResonseBuilder.failure(NOT_FOUND))
    }
}

export const getCategory = async (req, res) => {
    try {
        res.status(200).json(ResonseBuilder.success(await db.category.findById(req.params.id)))
    } catch (err) {
        console.error(err.toString())
        res.status(404).json(ResonseBuilder.failure(NOT_FOUND))
    }
}

export const putCategory = async (req, res) => {
    try {
        const result = await db.category.updateOne({_id: req.params.id}, req.body)
        if (!result.ok)
            res.status(500).json(ResonseBuilder.failure())
        else
            res.status(200).json(ResonseBuilder.success(null, EDITING_SUCCESSFUL))
    } catch (err) {
        console.error(err.toString())
        res.status(500).json(ResonseBuilder.failure())
    }
}

export const createCategory = async (req, res) => {
    try {
        await db.category.create(req.body)
        res.status(200).json(ResonseBuilder.success(null, CREATING_SUCCESSFUL))
    } catch (err) {
        console.error(err.toString())
        res.status(500).json(ResonseBuilder.failure())
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const result = await db.category.deleteOne({_id: req.params.id})
        if (!result.ok)
            res.status(500).json(ResonseBuilder.failure())
        else
            res.status(200).json(ResonseBuilder.success(null, DELETING_SUCCESSFUL))
    } catch (err) {
        console.error(err.toString())
        res.status(500).json(ResonseBuilder.failure())
    }
}