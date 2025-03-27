import 'dotenv/config'
import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

console.info('TEST UPDATE_POST_TEXT')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return updatePostText('67e56b76aca435b739796a5c', '67e5840cf453f88166e71661', 'DONE BRUH')
                .then(result => result2 = result)
                .finally(() => console.log(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => data.disconnect())