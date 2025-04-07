import { DuplicityError, NotFoundError, CredentialsError, OwnershipError } from "./errors.js"

import data from './data.js'

const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },

    // creamos las validaciones para los inputs
    validate: {
        string(string, explain) {
            if(typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)

        },
        text(text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text))
            throw new SyntaxError(`invalid ${explain} syntax`)
        },
        email(email, explain) {
            this.string(email, explain)
            if(!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
            this.maxLength(email, 30, explain)
        },
        maxLength(value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError(`invalid ${explain} maxLength`)
        },
        minLength(value, minLength, explain) {
            if (value.length < minLength) throw new RangeError(`invalid ${explain} minLength`)
        },
        username(username, explain) {
            this.text(username, explain)
            this.minLength(username, 3, explain)
            this.maxLength(username, 20, explain)
        },
        password(password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        },
        url(url, explain) {
            this.string(url, explain)
            if (!logic.constant.URL_REGEX.test(url)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        id(id, explain) {
            this.text(id, explain)
            if (id.length < 10 || id.length > 11) throw new RangeError(`invalid ${explain} length`)
        }
    },

    // traemos los inputs y los validamos
    registerUser(name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.minLength(name, 1, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        // nos aseguramos de que no se haya insertado un email o username igual
        const found = data.users.findOne(user => user.email === email || user.username === username)

        if (found) throw new DuplicityError('user already exists')

        const user = {
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        // lo insertamos en data.users
        data.users.insertOne(user)   
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const found = data.users.findOne(user => user.username === username)

        if(!found || found.password !== password)
        throw new CredentialsError('wrong credentials')

        data.userId = found.id
    },

    logoutUser() {
        data.userId = null
    },

    getUserName() {
        const users = data.users.getAll()
        // const users = data.users
        // const userId = data.userId, refactorizamos en la linea de abajo
        const {userId} = data

        const found = data.users.getById(userId)

        if(!found) throw new NotFoundError('user not found')

        return found.name
    },

    isUserLoggedIn() {
        return !!data.userId
    },

    getPosts() {
        // insertamos los posts de data a la variable posts 
        const posts = data.posts.getAll()

        // creamos un objeto llamado userId, y le insertamos data.userId
        const {userId} = data

        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]

            let liked = false // inicializamos liked en false

            for (let i = 0; i < post.likes.length && !liked; i++){
                const id = post.likes[i]

                if (id === userId)
                    liked = true
            }

            const user = data.users.getById(post.author)

            const aggregatedPost = {
                id: post.id,
                author: {id: post.author, username: user.username},
                image: post.image,
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                liked: liked,
                likesCount: post.likes.length,
                own: post.author === userId
            }

            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
        }

        return aggregatedPosts.reverse()
    },

    createPost(image, text) {
        this.validate.url(image)
        this.validate.maxLength(1000)
        this.validate.text(text)
        this.validate.maxLength(500)

        const {userId} = data

        const post = {
            author: userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        data.posts.insertOne(post)
    },

    toggleLikePost(postId) {
        this.validate.id(postId, 'postId')

        const {userId} = data

        // llamamos a la funcion para encontrar post
        const foundPost = data.posts.findOne(post => post.id === postId)

        // si no encontramos el post, lanzamos error
        if (!foundPost) throw new NotFoundError('post not found')

        let userIdFound = false

        // recorremos los likes del foundPost para ver si esta nuestro id
        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const id = foundPost.likes[i]

            if (id === userId)
                userIdFound = true
        }

        // si no encontramos nuestro id en el array de likes, lo ponemos al final
        if (!userIdFound)
            foundPost.likes[foundPost.likes.length] = userId

        // si encontramos nuestro id en el array id's de likes, recorremos el array y insertamos todos los id menos el nuestro en un nuevo array creado de 0, lo machacamos y lo subimos con el .updateOne
        else {
            const likes = []

            for (let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i]

                if (id !== userId)
                    likes[likes.length] = id
            }

            foundPost.likes = likes
        }

        data.posts.updateOne(foundPost)
    },
    
    deletePost(postId) {
        this.validate.id(postId, 'postId') // validamos el id

        const {userId} = data

        const foundPost = data.posts.findOne(post => post.id === postId) // buscamos si hay algun post con nuestro id

        if (!foundPost) throw new NotFoundError('post not found')

        if (foundPost.author !== userId) throw new OwnershipError('user is not author of post') // si el id del post no coincide con el nuestro, salta un error

        data.posts.deleteOne(post => post.id === postId)
    }
}

export default logic