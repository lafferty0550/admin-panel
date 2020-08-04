import jwt from 'jsonwebtoken'

import db from '../models'

const User = db.user

export const checkEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user)
            return res.status(400).send({
                success: false,
                msg: "email is already in use"
            })

        next()
    } catch (err) {
        console.log('Check duplicate email failed: ', err)
        res.status(500).send({
            success: false,
            msg: err
        })
    }
}

export default (req, res, next) => {
    let token = req.headers['authorization'] || req.headers['x-access-token']

    if (!token)
        return res.status(400).json({
            success: false,
            msg: 'No token'
        })
    if (token.startsWith('Bearer '))
        token = token.slice(7, token.length)
    
    if (!token)
        return res.status(400).json({
            success: false,
            msg: 'No token'
        })

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        console.log('Decode token failed: ', err.toString())
        res.status(400).json({
            success: false,
            msg: err.toString()
        })
    }
}