import { deletePost } from './deletePost.js'

//llamamos a la función y le pasamos el userId del post y el postId que queremos eliminar.
//No devuelve nada, al llamarlo en la terminal, veremos en posts.json que se elimina el post.
try {
    deletePost('m7w30juebf', 'm88zmzrlwjn')
} catch (error) {
    console.error(error)
}

// node logic/deletePost.test.js