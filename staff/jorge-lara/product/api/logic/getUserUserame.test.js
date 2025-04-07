import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'

console.info('TEST getUserUsername')

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let returnedUsername

            return getUserUsername('67dab7ecaccb3b1fe5b71236')
                .then(username => returnedUsername = username)
                .finally(() => console.assert(typeof returnedUsername === 'string', 'username is a string'));

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
