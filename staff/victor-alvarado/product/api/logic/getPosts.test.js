// Importamos el objeto 'data' desde el archivo '../data/index.js'.
// Este objeto probablemente maneja la conexión con la base de datos MongoDB.
import { data } from '../data/index.js'

// Importamos la función 'getPosts' desde el archivo './getPosts.js'.
// Esta función probablemente busca publicaciones en la base de datos.
import { getPosts } from './getPosts.js'

// Mostramos un mensaje en la consola indicando que estamos probando 'getPosts'.
console.info('TEST getPosts')

// Iniciamos la conexión a la base de datos MongoDB en la URL 'mongodb://localhost:27017'.
// Especificamos que queremos conectarnos a la base de datos llamada 'test'.
data.connect('mongodb://localhost:27017', 'test')

    // Si la conexión se establece correctamente, ejecutamos el código dentro de '.then()'.
    .then(() => {
        try {
            // Declaramos una variable 'posts2' sin valor inicial.
            let posts2

            // Llamamos a la función 'getPosts' pasando un ID de usuario específico.
            // Esto devuelve una promesa, lo que significa que 'getPosts' puede tardar en responder.
            return getPosts('67dfd24735777c20b6ad4139')

                // Cuando la promesa se resuelve correctamente, asignamos el resultado a 'posts2'.
                .then(posts => posts2 = posts)

                // '.finally()' se ejecuta siempre, haya o no error en la promesa.
                .finally(() =>
                    // Verificamos que 'posts2' sea un array.
                    // Si no lo es, se mostrará un error en la consola.
                    console.assert(posts2 instanceof Array, 'posts2 is an array')
                )

        } catch (error) {
            // Si ocurre un error en el bloque 'try', lo mostramos en la consola.
            console.error(error)
        }
    })

    // Si 'data.connect()' falla (por ejemplo, si MongoDB no está funcionando), el error se captura aquí.
    .catch(error => console.error(error))

    // '.finally()' se ejecuta siempre, sin importar si hubo éxito o error.
    // Cerramos la conexión con la base de datos.
    .finally(() => data.disconnect())