import bcrypt from 'bcryptjs'

require('dotenv').config()

import Generator from './db-generator'
import db from '@back/models'

(async () => {
    console.log('INITIALIZATING DATABASE BY DEFAULT STATE...')
    db.mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

    await Generator.init(db)

    await db.user.deleteMany({})
    await db.user({
        firstname: 'Ilya',
        lastname: 'Mashinin',
        email: 'lafferty@gmail.com',
        password: bcrypt.hashSync('123', 8)
    }).save()

    db.mongoose.connection.close()
    console.log('INITIALIZATION IS SUCCESS...')
})()