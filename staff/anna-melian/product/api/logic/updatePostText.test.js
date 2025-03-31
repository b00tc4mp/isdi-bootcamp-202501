import { updatePostText } from './updatePostText.js'
import { data } from '../data/index.js'

console.info('TEST updatePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67dd3aacae6eebd29ddf55c7', '67dd4afc95e0df242e83eecf', 'hogwarts!!!')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

//TODO correct ids