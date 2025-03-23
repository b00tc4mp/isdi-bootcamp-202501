import { MongoClient, ObjectId } from 'mongodb'
import { errors } from 'com' 

const { SystemError } = errors

/*
-Se define data como un objeto con users y posts. Incialmente con valor
null porque aún no se ha hecho la conexión.
-Se usa el método connect() para conectar a MongoDB.
-Y nos conectamos al servidor de MongoDB: creamos una nueva instancia de 
MongoClient y llamamos al método connect donde url es la dirección del servidor
de MongoDB (es decir, 27017).
-Lanzamos SystemError por si hay error de conexión.
-Happypath: 
    -A través de client (que es una instancia de MongoClient), accedemos a la 
    base de datos y colecciones.
    -Obtenemos la base de datos en la que queremos trabajar (dbName, test..) y 
    la guardamos en db (que ahora será un objeto que representa la base de datos)
    -Obtenemos las colecciones 'users' y 'posts' y se guardan en data.
-Disconnect: Cerramos mediante el método close() la conexión con MongoDB (en este 
caso con client, que es la instancia que hemos usado de Mongo)
-ObjectId: Incluimos ObjectId (necesario pra los id que crea MongoDB) en el objeto
de data para poder utilizarlo después en otros archivos simplemente importando data.
*/

let client 

export const data = {
    users: null, 
    posts: null,

    connect(url, dbName) {
        return (client = new MongoClient(url)).connect()
            .catch(error => new SystemError(error.message))
            .then(client => {
                const db = client.db(dbName)

                data.users = db.collection('users')
                data.posts = db.collection('posts')
            })
    },

    disconnect() {
        return client.close()
    },

    ObjectId
}

