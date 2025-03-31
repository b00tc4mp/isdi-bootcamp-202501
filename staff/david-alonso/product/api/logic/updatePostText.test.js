import 'dotenv/config'
import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST updatePostText')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return updatePostText('67e48815ca2262aa6ec9d0cb', '67e51663f371d02dd67e34a7', 'A volar 123456')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())



