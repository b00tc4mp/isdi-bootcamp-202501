import 'dotenv/config'
import { updatePostText } from './updatePostText.js'
import { data } from '../data/index.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST updatePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67e2e03c4eff94624efb7bff', '67e2e03c4eff94624efb7c03', 'saludos terricolas!')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())