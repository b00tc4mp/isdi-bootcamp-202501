import { data } from '../data/index.js'
import { validate } from './validate.js'

export const createPost = (image, text) => {
        validate.url(image, 'image')
        validate.maxLength(1000)
        validate.text(text, 'text')
        validate.maxLength(500)

        const { userId } = data //llamamos a los getters

        const post = {
            author: userId, //buscamos en data al author
            image: image, //la imagen que hemos puesto y validado
            text: text, //lo mismo que la imagen pero con el texto
            createdAt: new Date(), //fecha actual
            modifiedAt: null,
            likes: []
        }

        data.posts.insertOne(post)
}