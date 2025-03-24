import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

console.info('TEST updatePostText')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return updatePostText('67dffc2ca5d644d600b71238', '67dffef3a5d644d600b7123a', 'A volar 123456')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())



