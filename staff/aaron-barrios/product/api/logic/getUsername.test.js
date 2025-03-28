import 'dotenv/config'
import { data } from '../data/index.js'
import { getUsername } from './getUsername.js'

console.info('GET_USERNAME TEST')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let username

            return getUsername('67e6b6b04219300670bd238d')
                .then(name => username = name)
                .then(console.log)
                .finally(() => console.assert(typeof username === 'string', 'username must be a string'))
        } catch (error) {
            console.error(error)
        }
    })
    // .catch(error => console.error(error)) => can be breakpointed on debugger
    .catch(console.error)           // cant be breakpointed on debugger

    // .finally(() => data.disconnect()) => can be breakpointed on debugger
    .finally(data.disconnect)       // cant be breakpointed on debugger