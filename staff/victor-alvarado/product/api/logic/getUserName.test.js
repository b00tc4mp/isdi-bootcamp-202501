import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserName')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userName

            return getUserName('67e58b4da1685492ecd65a43')
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())