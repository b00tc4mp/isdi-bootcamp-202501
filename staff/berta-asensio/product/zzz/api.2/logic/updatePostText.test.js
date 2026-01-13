import { updatePostText } from './updatePostText.js'

//le pasamos tres parámetros: el userId, el postId, y el texto que queremos modificar
//esta función no devuelve nada, cuando la llamemos en el terminal veremos en posts.json el cambio
try {
    updatePostText('m806ubra03', 'm806w102e98', 'dancing together')
} catch (error) {
    console.error(error)
}

//node logic.updatePostText.test.js