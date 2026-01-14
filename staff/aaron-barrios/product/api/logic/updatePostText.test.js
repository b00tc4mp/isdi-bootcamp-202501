import 'dotenv/config'
import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

console.info('TEST UPDATE_POST_TEXT')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return updatePostText('67e6ccf7b76029277c320c03', '67e6ccf7b76029277c320c07', 'heeeeey')
                .then(result => result2 = result)
                .finally(() => console.log(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => data.disconnect())