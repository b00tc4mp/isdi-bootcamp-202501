import 'dotenv/config'
import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST updatePostText')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return updatePostText('67e0655b163e8121156a41db', '67e596f8a2457b9c61eee1da', 'Hello everybody')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result2 is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
