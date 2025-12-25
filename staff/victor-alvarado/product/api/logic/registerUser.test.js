import { data } from '../data/index.js' // Importa el objeto 'data' desde el archivo '../data/index.js'.
// 'data' maneja la conexión con MongoDB y permite acceder a las colecciones.

import { registerUser } from './registerUser.js' // Importa la función 'registerUser' desde 'registerUser.js'.
// 'registerUser' se encarga de registrar un usuario en la base de datos.

console.info('TEST registerUser')

data.connect('mongodb://localhost:27017', 'test') // Conecta a MongoDB usando la base de datos 'test'.
    // 'mongodb://localhost:27017' → URL del servidor de MongoDB local.
    // 'test' → Nombre de la base de datos.
    .then(() => { // Si la conexión es exitosa, ejecuta el siguiente código.
        try {
            let result2 = null

            return registerUser('manolo', 'manolo@lolo.com', 'manolo', '123123123') // Llama a 'registerUser' para registrar un usuario de prueba.
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
            // 'console.assert()' verifica que 'result' sea 'undefined'.
            // Si el resultado NO es 'undefined', mostrará el mensaje 'result is undefined'.
        } catch (error) { // Captura errores que puedan ocurrir dentro del bloque 'try'.
            console.error(error) // Muestra el error en la consola.
        }
    })
    .catch(error => console.error(error)) // Si ocurre un error en la conexión o ejecución de la promesa, se captura aquí.
    .finally(() => data.disconnect()) // Al finalizar la prueba (con éxito o con error), siempre se cierra la conexión con MongoDB.