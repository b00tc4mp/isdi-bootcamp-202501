import { updatePostText } from './updatePostText.js'
import { data } from '../data/index.js'

console.info('TEST updatePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67dfd24735777c20b6ad4138', '67dfe87a7669f5e87f53db45', 'texto cambiado')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())