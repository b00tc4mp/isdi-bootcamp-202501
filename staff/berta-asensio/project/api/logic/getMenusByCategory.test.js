import 'dotenv/config'
import { data } from '../data/index.js'
import { getMenus } from './getMenus.js'
import { getMenusByCategory } from './getMenusByCategory.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getMenusByCategory')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let menus
            const categories = ['regular', 'vegetariano', 'vegano', 'halal']

            return getMenusByCategory(categories)
                .then(menu => menus = menu)
                .finally(() => console.assert(Array.isArray(menus), 'menus is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())