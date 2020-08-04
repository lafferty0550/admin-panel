import jwt from 'jsonwebtoken'

const {
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    JWT_EXPIRES,
    JWT_REFRESH_EXPIRES
} = process.env

export const gen_token = (id, type) => {
    if (type === 'access')
        return jwt.sign({id}, JWT_SECRET, {expiresIn: Number(JWT_EXPIRES)})
    if (type === 'refresh')
        return jwt.sign({id}, JWT_REFRESH_SECRET, {expiresIn: Number(JWT_REFRESH_EXPIRES)})
}