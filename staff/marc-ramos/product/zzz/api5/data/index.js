import { MongoClient, ObjectId } from 'mongodb' // importamos mongodb y el objectId para trabajar mejor con el id de user
import { errors } from 'com' // importamos errors de la carpeta com

const { SystemError } = errors // importamos los errores que vamos a usar

let client // declaramos la variable client para almacenar la conexion a la base de datos

export const data = { // Exportamos un objeto llamado 'data' que contendrá las colecciones y métodos para interactuar con la base de datos
    users: null,
    posts: null,

    connect(url, dbName) {
        return (client = new MongoClient(url)).connect() // creamos una nueva instancia de MongoClient y nos conectamos a la base de datos
            .catch(error => new SystemError(error.message)) // Si hay un error en la conexión, lanzamos un SystemError con el mensaje del error
            .then(client => { // Si la conexión es exitosa, obtenemos la base de datos y asignamos las colecciones
                const db = client.db(dbName)
                // Asignamos las colecciones 'users' y 'posts' a las propiedades del objeto 'data'
                data.users = db.collection('users')
                data.posts = db.collection('posts')
            })
    },

    disconnect() { // función para desconectar la base de datos
        return client.close()
    },

    ObjectId // Exportamos ObjectId para poder usarlo en otros módulos.
}