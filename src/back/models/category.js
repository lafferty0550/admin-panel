import mongoose from 'mongoose'

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {versionKey: false})

export default mongoose.model('categories', schema)