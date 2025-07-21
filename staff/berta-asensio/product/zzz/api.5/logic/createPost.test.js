import { data } from '../data/index.js'
import { createPost } from './createPost.js'

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

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return createPost('67e662617ba1f822e43656e6', 'https://media.giphy.com/media/5t235Nf4wo3rhLSMVy/giphy.gif?cid=790b7611hsy6vpfm1wzxmz83ggr3wkpq40gzzxgktapngt8u&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Nyami')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
