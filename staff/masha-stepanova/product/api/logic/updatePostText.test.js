import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

console.info('TEST updatePostText')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return updatePostText('67dc24464fb4f765fd5e5a67', '67dd4285d424f14537414246', 'Hello everybody')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result2 is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
