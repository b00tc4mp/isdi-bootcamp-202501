import { data } from './index.js'

data.connect('mongodb://localhost:27017', 'test')
    .then(() => data.users.insertOne({ name: 'Marc', email: 'marc@jorda.com', username: 'marcjorda', password: '123123123' }))
    .then(result => console.log(result))
    .then(() => console.log('the end'))
    // .catch(error => console.error(error))
    .catch(console.error)
    .finally(() => data.disconnect())
