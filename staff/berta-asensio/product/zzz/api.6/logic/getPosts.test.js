import 'dotenv/config'
import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

const { MONGO_URL, MONGO_DBNAME } = process.env

console.info('TEST getPosts')

/*
-Nos conectamos a la base de datos de Mongodb.
-Y devolvemos una promesa que ejecuta then cuando la
conexión ha sido exitosa.
-Posts2 (undefined de inicio) almacenará el array de publicaciones obtenido.
-Se llama a la función getPosts pasando un identificador y el resultado de la promesa
se asigna a la variable posts2.
-Después de obtener las publicaciones, se usa el método finally para asegurar que posts2
sea una instancia de Array. Lo que verifica que se ha obtenido un array de publicaciones.
-Si ocurre algun error dentro del bloque try, será capturado en este primer catch.
-El siguiente catch es para capturar error asincrono, de las promesas.
-Se desconecta de la base de datos.

 */
data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let posts2

            return getPosts('67e8ea9172e445b1b8f6b5e3')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 is an arry'))
            
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
