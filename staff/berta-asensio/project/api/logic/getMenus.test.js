import 'dotenv/config'
import { data } from '../data/index.js'
import { getMenus } from './getMenus.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getMenus')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let menus
            return getMenus()
                .then(menu => menus = menu)
                .finally(() => console.assert(menus instanceof Array, 'menus is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())