import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserUsername')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userName

            return getUserUsername('67ec2dfbcc2bec731b0e1d21')
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())