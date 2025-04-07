//  ****  LOGIC

// *****
import { DuplicityError, NotFoundError, CredentialsError }
    from '.errors.js'

import data from './data.js'
// *****

const logic = {

    // Variable que quenera los Regex para comprobar datos 
    constant: {
        // Regex espacios en blanco
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        // Regex comprueba que sea email
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },

    validate: {
        // Comprobamos que sea un Sting
        string(string, explain) {
            if (typeof string !== 'string') throw new TypeError('invalid ' + explain + ' type')
        },
        // Comprobamos que sea tipo Texto
        text(text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError('invalid ' + explain + ' syntax')
        },
        // Comprueba que sea tipo Email
        email(email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError('invalid ' + explain + ' syntax')
            this.maxLength(email, 30, explain)
        },
        // Comprueba que la longitod Maxima
        maxLength(value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError('invalid ' + explain + ' maxLength')
        },
        // Comprueba que la longitod Minima
        minLength(value, minLength, explain) {
            if (value.length < minLength) throw new RangeError('invalid ' + explain + ' minLength')
        },
        // Comprueba que el parametro Usuario
        username(username, explain) {
            this.text(username, explain)
            this.minLength(username, 3, explain)
            this.maxLength(username, 20, explain)
        },
        // Comprueba que el parametro Passwor
        password(password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        },
        url(url, explain) {
            this.string(url, explain)
            if (!logic.constant.URL_REGEX.test(url)) throw new SyntaxError('invalid ' + explain + ' syntax')
        }
    },

    // Funcion para Registrar al usuario
    registerUser(name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 30, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        // ****
        const found = data.users.findOne(user => user.email === email || user.username === username)

        if (found) throw new DuplicityError('user already exists')

        const user = {
            id: data.uuid(),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date().toLocaleString(),
            modifiedAt: null
        }

        // ****
        data.users.insertOne(user)
    },

    // Funcion para Iniciar sesion
    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        // Buscamos un único elemento en la Colección
        // Buscamos que coincida el UserName
        const found = data.users.findOne(user => user.username === username)

        if (!found || found.password !== password) throw new CredentialsError('wrong credentials')

        data.userId = found.id
    },

    // Funcion para Cerrar sesion
    logoutUser() {
        data.userId = null
    },

    // Funcion para Obtener nombre de usuario
    getUserName() {

        const users = data.users.getAll()

        const { userId } = data

        const found = data.users.getById(userId)

        if (!found) throw new NotFoundError('user not found')

        return found.username  //**** */
    },

    // ****
    isUserLoggedIn() {
        return !!data.userId
    },

    // Funcion para Obtener los Posts
    getPosts() {
        const posts = data.posts.getAll()

        const { userId } = data

        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const id = post.likes[i]

                if (id === userId)
                    liked = true
            }

            const user = data.users.getById(post.author)

            // Publicacion agregada
            const aggregatedPost = {

                id: post.id,
                author: { id: post.author, username: user.username },
                userName: post.userName,
                image: post.image,
                text: post.text,
                createdAt: new Date(post.createdAt), //*****
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                liked: liked,
                likesCount: post.likes.length
            }

            // Agrega "aggregatedPost" al final del array "aggregatedPosts"
            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
        }

        return aggregatedPosts.reverse()
    },

    // Funcion para añadir un Posts nuevo
    createPost(image, text) {
        this.validate.url(image)
        this.validate.text(text)

        const { userId, uuid } = data  //***** 

        // Datos que usara
        const post = {
            id: uuid(),
            author: userId,
            userName: this.getUserName(),
            image: image,
            text: text,
            createdAt: new Date().toLocaleString(),
            modifiedAt: null,
            likes: []
        }

        data.posts.insertOne(post)
    },

    // Agrega o elimina el Like de los Posts
    toggleLikePost(postId) {
        const { userId } = data
        // Variable Encontrar el Post
        const foundPost = data.posts.findOne(post => post.id === postId)

        // Si foundPost es undefined o null, lanza un error NotFoundError y detiene la ejecución
        if (!foundPost) throw new NotFoundError('post not found')

        // Comprueba si el usuario ya ha dado "like"
        // Se incicia UserIdFound como false
        let userIdFound = false

        // Bucle que recorre la lista de Likes de "foundPost.likes"
        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const Id = foundPost.likes[i]

            // Si el usuario ya está en la lista (userId === data.userId), se cambia userIdFound a true y se detiene el bucle.
            if (Id === userId)
                userIdFound = true
        }

        // Si el usuario NO ha dado "like" se lo añade
        if (!userIdFound)
            // Si userIdFound es false, se añade "data.userId" al final de foundPost.likes
            foundPost.likes[foundPost.likes.length] = userId

        else { // Si el usuario Si ha dado "like" se lo elimina
            const likes = []  // Se crea un nuevo array vacío likes

            // Bucle que recorre la lista de "likes" del Post
            for (let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i]

                // // Se copian todos los userId, excepto data.userId, al nuevo array
                if (id !== data.userId)
                    likes[likes.length] = id
            }

            // Se actualiza foundPost.likes con este nuevo array, eliminando así el "like" del usuario
            foundPost.likes = likes
        }

        data.posts.updateOne(foundPost)

    }

}

export default logic