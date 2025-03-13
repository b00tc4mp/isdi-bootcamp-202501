import { createPost } from './createPost.js'

try {
    createPost('m7ypqlzdwy', 'https://media.giphy.com/media/dRvEZLV0ORAmHT1L5u/giphy.gif?cid=790b7611nqne3dbklbr37t219hz6ek2jksnenib0dq4klpos&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Good morning!')

    //console.log(posts.json)
} catch (error) {
    console.error(error)
}