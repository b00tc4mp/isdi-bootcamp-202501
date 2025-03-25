import { data } from '../data/index.js'
import { createPost } from './createPost.js'

console.info('TEST createPost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return createPost('67dc479bdc839d93c260b103', 'https://media.giphy.com/media/KEh5kliRTSVJm/giphy.gif?cid=82a1493b3690xbfoarr9921bdk2x24sd2k68qp7ytz4n592m&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'holaquetal')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())