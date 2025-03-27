import 'dotenv/config'
import { data } from '../data/index.js'
import { createPost } from './createPost.js'

console.info('TEST CREATE_POST')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .catch(error => console.log(error))
    .then(() => {
        try {
            let result2 = null

            return createPost('67e56b76aca435b739796a5c', 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3c2OHl2MTRvYXloZ2F1ZWRjanFkNnlhZXB3NmQ1bjMxNzZhcjFqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YeRz5g1sHuCGEGvdNs/giphy.gif', 'ready bitch')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))

                // return Promise.all([
                //     createPost('67dad4ed3e909e877bb71239', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGFtMDNnYmRnY3QxeHlvaWZlenFzc3QyeGJjb2FvZGE1bDU2NXVlbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Dg4TxjYikCpiGd7tYs/giphy.gif', 'pedropedropedropedrope'),
                //     createPost('67dad4ed3e909e877bb71239', 'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif?cid=790b7611hn36rqvyhf86t9i73wkbbq2ey8oqv8j4y34h3i37&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'FUUUUUUUUUUUCK'),
                //     createPost('67dc2db36a68ef2c2fd5cf1e', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG4zNnJxdnloZjg2dDlpNzN3a2JicTJleThvcXY4ajR5MzRoM2kzNyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/sTczweWUTxLqg/giphy.gif', 'ITS FRIDAAAAYY GAAAAAIN')
                // ])
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    // .catch(error => console.error(error)) => can be breakpointed on debugger
    .catch(console.error)           // cant be breakpointed on debugger

    // .finally(() => data.disconnect()) => can be breakpointed on debugger
    .finally(data.disconnect)       // cant be breakpointed on debugger
