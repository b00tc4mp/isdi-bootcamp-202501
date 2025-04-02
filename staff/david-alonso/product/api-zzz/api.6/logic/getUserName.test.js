import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserName')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userName

            return getUserName('67e9946baa195117fab71239')
                .then(name => userName = name)
                .then(console.log)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
