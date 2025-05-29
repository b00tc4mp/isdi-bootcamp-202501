import 'dotenv/config'
import { data } from '../data/index.js'
import { getLevel } from './getLevel.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getLevel')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let level2

            return getLevel('67f930d7e3a7c4252c9ee1a8', '67f69b881788473789bedd0c')
                .then(level => level2 = level)
                .finally(() => {
                    console.log(level2)
                    console.assert(level2 instanceof Object, 'level2 is an object')
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
