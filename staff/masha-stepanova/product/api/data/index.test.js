import { data } from './index.js'

data.connect('mongodb://localhost:27017', 'test')
    .then(() => data.users.insertOne({ name: "Arielle", email: "arielle@princess.com", username: "arielle", password: "123456789" }))
    .then(result => console.log(result))
    .then(() => console.log('the end'))
    .catch(error => console.error(error))
    .finally(() => data.disconnect())