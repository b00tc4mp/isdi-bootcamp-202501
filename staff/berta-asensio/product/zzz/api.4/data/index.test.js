import { data } from './index.js'

data.connect('mongodb://localhost:27017', 'test')
    .then(() => data.users.insertOne({ name: 'Roger Hall', username: 'HallRuxi', password: '123123aa', email: 'roger@hall.com' }))
    .then(result => console.log(result))
    .then(() => console.log('the end'))
    .catch(console.error)
    .finally(() => data.disconnect())

/*
-Pasamos los parámetros url y dbName por el método connect()
-Insertamos un usuario en la colección de users.
-Imprimimos el resultado en consola ( result el es ID generado automáticamente
por MongoDB)
-Mostramos un mensaje de finalización
-Capturamos un error y lo imprimimos si es que lo ha habido.
-Cerramos conexión con finally.
*/