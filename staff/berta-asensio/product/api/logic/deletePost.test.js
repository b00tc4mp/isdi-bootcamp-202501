import 'dotenv/config'
import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

const { MONGO_URL, MONGO_DBNAME } = process.env

console.info('TEST deletePost')

/*
-Conectamos con la base de datos.
-Se define result2 con valor null, donde se almacenará el resultado de deletePost.
-Se llama a deletePost y se le pasa userId y el id del post que queremos eliminar.
-Se recibe el resultado de deletePost y se almacena en result2.
-Se verifica el resultado con console.assert.
*/

data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let result2 = null

            return deletePost('67e8ea9172e445b1b8f6b5e5', '67eabb87b36d874c4b6cfbd2')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())


// node logic/deletePost.test.js