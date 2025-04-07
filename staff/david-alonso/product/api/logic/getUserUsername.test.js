import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserUsername')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let username

            return getUserUsername('67e9946baa195117fab71239')
                .then(name => username = name)
                .then(console.log)
                .finally(() => console.assert(typeof username === 'string', 'username is a string'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
