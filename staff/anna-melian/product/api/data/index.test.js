import { data } from './index.js'

data.connect('mongodb://localhost:27017', 'test')
    .then(() => data.users.insertOne({ name: 'Ex ample', email: 'ex@ample.com', username: 'example', house: 'gryffindor', password: '123123123' }))
    .then(result => console.log(result))
    .then(() => console.log('the end'))
    .catch(console.error)
    .finally(() => data.disconnect())