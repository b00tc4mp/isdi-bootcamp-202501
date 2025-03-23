import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

console.info('TEST updatePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67dc479bdc839d93c260b103', '67dd88fb150062b2bb14db0c', 'alohaaaaa alo')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())