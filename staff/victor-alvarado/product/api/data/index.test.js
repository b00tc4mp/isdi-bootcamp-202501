import { data } from './index.js' // Importa el objeto 'data' desde el archivo 'index.js'.
// 'data' contiene métodos para conectar, desconectar y acceder a las colecciones de la base de datos.

data.connect('mongodb://localhost:27017', 'test') // Llama al método 'connect' para establecer conexión con MongoDB.
    // 'mongodb://localhost:27017' es la URL del servidor de MongoDB en el entorno local.
    // 'test' es el nombre de la base de datos a la que queremos conectarnos.
    .then(() => data.users.insertOne({ // Si la conexión es exitosa, ejecuta el siguiente código.
        name: 'Da Ta', // Nombre del usuario.
        email: 'da@ta.com', // Correo electrónico del usuario.
        username: 'data', // Nombre de usuario.
        password: '123123123' // Contraseña del usuario 
    }))
    // 'insertOne' es un método de MongoDB que agrega un documento (registro) a la colección 'users'.

    .then(result => console.log('the end')) // Si la inserción fue exitosa, imprime "the end" en la consola.

    .catch(console.error) // Si ocurre un error en cualquier parte del proceso, lo captura y lo muestra en la consola.

    .finally(() => data.disconnect()) // Sin importar si hubo éxito o error, siempre cierra