import 'dotenv/config'
import { data } from '../data/index.js'

// Importamos la función 'deletePost' (probablemente para eliminar un post de la base de datos)
import { deletePost } from './deletePost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST deletePost')  // Mensaje de prueba en la consola

// Conectamos a la base de datos MongoDB en el servidor local, usando el nombre de la base de datos 'test'
data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null  // Declaramos una variable para almacenar el resultado de la eliminación del post

            // Llamamos a la función deletePost con dos parámetros: ID del usuario y ID del post a eliminar
            return deletePost('67e2e03c4eff94624efb7bfd', '67e6bbb8dc5b845cdacd374f')
                .then(result => result2 = result)  // Guardamos el resultado de deletePost en result2
                .finally(() => console.assert(result2 === undefined, 'result is undefined')) // Comprobamos que result2 sea undefined
        } catch (error) {
            console.error(error)  // Si ocurre un error en el bloque try, lo mostramos en la consola
        }
    })
    .catch(error => console.error(error))  // Si la conexión a la base de datos falla, lo mostramos en la consola
    .finally(() => data.disconnect())  // Finalmente, desconectamos