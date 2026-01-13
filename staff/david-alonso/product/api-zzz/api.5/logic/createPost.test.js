import { data } from '../data/index.js'
import { createPost } from './createPost.js'

console.info('TEST createPost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return createPost('67dfffb4c9ac469c16209dbf', 'https://img.pixers.pics/pho_wat(s3:700/FO/55/51/95/89/700_FO55519589_b74f9891feacf0ca445fb13b05f3128e.jpg,700,467,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,417,jpg)/fotomurales-motocross-en-la-puesta-de-sol.jpg.jpg', 'Atardecer')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())