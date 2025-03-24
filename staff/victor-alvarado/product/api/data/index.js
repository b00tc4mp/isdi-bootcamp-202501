import { MongoClient, ObjectId } from 'mongodb' // Importa MongoClient para conectar con MongoDB y ObjectId para manejar identificadores únicos.
import { errors } from 'com' // Importa un módulo llamado 'com' que contiene un objeto 'errors'.

const { SystemError } = errors // Extrae 'SystemError' de 'errors', que parece ser una clase para manejar errores.

let client // Declara una variable 'client' que almacenará la conexión a la base de datos.

export const data = { // Se exporta un objeto 'data' que almacenará las colecciones y métodos para la base de datos.
    users: null, // Inicialmente 'users' es null, luego se asignará la colección de usuarios.
    posts: null, // Inicialmente 'posts' es null, luego se asignará la colección de publicaciones.

    connect(url, dbName) { // Método para conectar a la base de datos.
        return (client = new MongoClient(url)).connect() // Crea un nuevo cliente con la URL y lo conecta a MongoDB.
            .catch(error => new SystemError(error.message)) // Si hay un error en la conexión, lo maneja con SystemError.
            .then(client => { // Si la conexión es exitosa, ejecuta esta parte.
                const db = client.db(dbName) // Obtiene la base de datos con el nombre proporcionado.

                data.users = db.collection('users') // Asigna la colección 'users' a 'data.users'.
                data.posts = db.collection('posts') // Asigna la colección 'posts' a 'data.posts'.
            })
    },

    disconnect() { // Método para cerrar la conexión con MongoDB.
        return client.close() // Llama a 'client.close()' para cerrar la conexión.
    },

    ObjectId // Exporta 'ObjectId' dentro de 'data' para que pueda usarse en otros módulos.
}
