import { data } from './index.js'

data.connect('mongodb://localhost:27017', 'test')
    .then(() => data.users.insertOne({ name: 'paco', email: 'paco@paq.com', username: 'paquete', password: '123123123' }))
    .then(result => console.log(result))
    .then(() => console.log('the end'))
    .catch(console.error)
    .finally(() => data.disconnect())
