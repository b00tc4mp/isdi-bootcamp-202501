import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const createPost = (userId, image, text) => { //pasamos userId de la app a la api por aqui, por lo que hay que validarlo:
        validate.id(userId, 'userId')
        validate.url(image, 'image')
        validate.maxLength(image, 800, 'image')
        validate.text(text, 'text')
        validate.maxLength(text, 500, 'text')

        //Debemos comprobar que el usuario exista.
        const user = data.users.getById(userId)

        if(!user) throw new NotFoundError ('user not found')

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