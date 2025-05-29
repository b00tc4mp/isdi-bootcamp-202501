import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getUserUsername')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let username2

            return getUserUsername('67f642d8d21b4e7479df8a73')
                .then(username => {
                    username2 = username
                    console.log(username2)
                })
                .finally(() => console.assert(typeof username2 === 'string', 'username2 is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())