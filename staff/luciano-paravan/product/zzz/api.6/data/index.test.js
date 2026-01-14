import { data } from './index.js'

//Donde esta 'test', es el dbName, asi podemos cambiar el nombre y conectarnos a otra db y testear
data.connect('mongodb://localhost:27017', 'test')
    .then(() => data.users.insertOne({ name: 'Da Ta', email: 'da@ta.com', username: 'datazo', password: '123123123' }))
    .then(result => console.log(result))
    .then(() => console.log('the end'))
    //.catch(error => console.error(error))
    .catch(console.error)
    .finally(() => data.disconnect())

//con el ()=> tenemos el return implicito.