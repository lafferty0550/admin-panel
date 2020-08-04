import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import rootRoute from './routes'

let server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static(path.resolve('build', 'public')))
server.use('/api/', rootRoute)

import db from './models'

const {DB_URL, PORT} = process.env

db.mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

server.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})