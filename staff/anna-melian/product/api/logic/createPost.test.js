import { createPost } from './createPost.js'

try {
    createPost('m7t6td0y48', 'https://media.giphy.com/media/Mylaa4mpiWCUE/giphy.gif?cid=790b7611cm3b41jb3l9qbixjcdb5qxga7nifvz1mkn68gam9&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Beware of the Nargles!')
} catch (error) {
    console.error(error)
}