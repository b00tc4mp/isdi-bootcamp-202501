import { toggleLikePost } from './toggleLikePost.js'
//no ponemos console.log porque no devuelve nada, debemos ver nosotros mismos en la base de datos que se ha puesto el like.
//si volvemos a llamarlo en la terminal, se quitará el like
try {
    toggleLikePost('m7w139zujl', 'm88zmzrlwjn')
} catch (error) {
    console.error(error)
}
//node logic/toggleLikePost.test.js