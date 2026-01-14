import mongoose, { Schema } from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/test')

const cat = new Schema({
    uid: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]+$/,
        unique: true
    },
    name: {
        type: String,
        maxLength: 10,
        match: /^[a-zA-Z]+$/,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
})
const Cat = mongoose.model('Cat', cat)

const kitty = new Cat({
    uid: 'abc123',
    name: 'Sucio',
    weight: 4
})

kitty.save()
    .catch(error => { throw new Error(error.message) })
    .then(() => console.log('meow'))
    .finally(() => mongoose.disconnect())