import 'dotenv/config'
import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

const { MONGO_URL, MONGO_DBNAME } = process.env
/*
-Se declara result2 null, donde dentro después le asignaremos el resultado
y se guardará en updatePostText.
-Llamamos a updatePostText y le introducimos sus parámetros.
-Si la promesa se resuelve, asignamos el resultado a result2.
-Verificamos con console.assert result2 es undefined.
-Es necesario especificar result2 como undefined para asegurarnos que no se devuelve nada.

 */
console.info('TEST updatePostText')

data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67e8ea9172e445b1b8f6b5e1', '67e8ea9172e445b1b8f6b5e8', 'hello Darling, my old friend...')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())



//node logic.updatePostText.test.js