import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

/*
-Se declara result2 null, donde dentro después le asignaremos el resultado
y se guardará en updatePostText.
-Llamamos a updatePostText y le introducimos sus parámetros.
-Si la promesa se resuelve, asignamos el resultado a result2.
-Verificamos con console.assert result2 es undefined.
-Es necesario especificar result2 como undefined para asegurarnos que no se devuelve nada.

 */
console.info('TEST updatePostText')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67e04f98d9f076ef37e6a143', '67e17413437a0ec724f5e262', 'hiiiii!!!')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())



//node logic.updatePostText.test.js