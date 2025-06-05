import 'dotenv/config'
import { data } from '../data/index.js'
import { createPost } from './createPost.js'

const { MONGO_URL, MONGO_DBNAME} = process.env

/*
-Si conectamos entramos en el then.
-Se declara result2 en null, donde dentro después le asignaremos el resultado de createPost.
-Se llama a createPost pasándole sus argumentos.
-Como createPost devuelve una promesa, se encadena con el siguiente then.
-Si createPost se ejecuta con éxito, el resultado (result) se almacena en result2.
-Verificamos el resultado con console.assert:
    -Si result2 es undefined (no se ha creado el post, nos lo mostrará por consola.)
-Si hay un error en el bloque try, lo capturamos en el siguiente catch.
-Si hay un error en la base de datos o en createPost, se captura en el segundo catch.
-Se desconecta la conexión con la base de datos.
*/

console.info('TEST createPost')

data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let result2 = null

            return createPost('67e8ea9172e445b1b8f6b5e5', 'https://media.giphy.com/media/mx0rj9sZRBcGTwEIX1/giphy.gif?cid=790b7611jiqaknu9whanizk5cl8xsude31ecmhuhj3wkru9a&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'You are a ROCK')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
