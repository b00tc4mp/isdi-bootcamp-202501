import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'


console.info('TEST deletePost')

/*
-Conectamos con la base de datos.
-Se define result2 con valor null, donde se almacenará el resultado de deletePost.
-Se llama a deletePost y se le pasa userId y el id del post que queremos eliminar.
-Se recibe el resultado de deletePost y se almacena en result2.
-Se verifica el resultado con console.assert.
*/

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return deletePost('67e04f98d9f076ef37e6a143', '67e105c20c61f603a8182bc4')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())


// node logic/deletePost.test.js