import { errors } from 'com'
import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

console.info('TEST updatePostText')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return updatePostText('67daf8420a914c7c2ba729a6', '67e0875ce6ab78206be79b83', 'GOOD MORNING MDF!')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result2 is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
