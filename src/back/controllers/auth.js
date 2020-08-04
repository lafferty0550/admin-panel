import bcrypt from 'bcryptjs'

import db from '@back/models'
import ResonseBuilder from '@back/helpers/response-builder'
import {gen_token} from '@back/helpers/auth'

const {
    SIGNUP_SUCCESSFUL,
    USER_DOES_NOT_EXIST,
    INVALID_CREDENTIALS,
    SIGNIN_SUCCESSFUL
} = ResonseBuilder.messages

const refreshTokens = {}

export const signup = async (req, res) => {
    const {email, firstname, lastname, password} = req.body

    try {
        await new db.user({
            email,
            firstname,
            lastname,
            password: bcrypt.hashSync(password, 8)
        }).save()

        res.status(200).json(ResonseBuilder.success(null, SIGNUP_SUCCESSFUL))
    } catch (err) {
        console.error('signup err: ', err)
        res.status(500).json(ResonseBuilder.failure())
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await db.user.findOne({email})
        if (!user)
            return res
                .status(401)
                .json(ResonseBuilder.failure(USER_DOES_NOT_EXIST))

        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch)
            return res
                .status(401)
                .json(ResonseBuilder.failure(INVALID_CREDENTIALS))

        const token = gen_token(user.id, 'access')
        const refreshToken = gen_token(user.id, 'refresh')

        const response = ResonseBuilder.success({
            ...user.toJSON(),
            token,
            refreshToken
        }, SIGNIN_SUCCESSFUL)

        refreshTokens[refreshToken] = response

        res.status(200).json(response)
    } catch (err) {
        console.error('Signin failed: ', err)
        res.status(401).json(ResonseBuilder.failure())
    }
}

export const refreshToken = async (req, res) => {
    const {refreshToken, id} = req.body

    if (refreshToken && (refreshToken in refreshTokens))
        res
            .status(200)
            .json(ResonseBuilder.success({
                token: gen_token(id, 'access')
            }))
    else {
        console.error('refresh token failed: no refresh token')
        res
            .status(404)
            .json(ResonseBuilder.failure('Invalid refresh token'))
    }
}