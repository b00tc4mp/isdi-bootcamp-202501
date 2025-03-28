import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserName } from './getUsername.js'

console.info('TEST getUserName')

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let username

            return getUserName('67dab7ecaccb3b1fe5b71236')
                .then(name => userName = name)
                .finally(() => console.assert(typeof username === 'string', 'username is a string'));

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
