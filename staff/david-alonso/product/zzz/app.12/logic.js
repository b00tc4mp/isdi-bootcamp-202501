//  ****  LOGIC

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
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (user.email === email || user.username === username)
                found = user
        }

        if (found) throw new Error('user already exists')

        const user = {
            id: data.uuid(),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.users[data.users.length] = user
    },

    // Funcion para Iniciar sesion
    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (user.username === username)
                found = user
        }

        if (!found || found.password !== password) throw new credentialsError('wrong credentials')

        data.userId = found.id
    },

    // Funcion para Cerrar sesion
    logoutUser() {
        data.userId = null
    },

    // Funcion para Obtener nombre de usuario
    getUserName() {
        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (user.id === data.userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.username
    },

    // Funcion para Obtener los Posts
    getPosts() {
        const aggregatedPosts = []

        for (let i = 0; i < data.posts.length; i++) {
            const post = data.posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const userId = post.likes[i]

                if (userId === data.userId)
                    liked = true
            }

            // Publicacion agregada
            const aggregatedPost = {

                id: post.id,
                author: post.author,
                userName: post.userName,
                image: post.image,
                text: post.text,
                createdAt: post.createdAt,
                modifiedAt: post.modifiedAt,
                liked: liked,
                likesCount: post.likes.length
            }

            // Agrega "aggregatedPost" al final del array "aggregatedPosts"
            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
        }

        return aggregatedPosts
    },

    // Funcion para añadir un Posts nuevo
    createPost(image, text) {
        this.validate.url(image)
        this.validate.text(text)

        // Datos que usara
        const post = {
            id: data.uuid(),
            author: data.userId,
            userName: this.getUserName(),
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        // "data.posts.length" devuelve la cantidad de elementos en el array
        // "data.posts[data.posts.length]" accede al índice justo después del último elemento del array
        // Se asigna Post a ese índice, agregándolo al final del array
        data.posts[data.posts.length] = post
    },
    // Agrega o elimina el Like de los Posts
    toggleLikePost(postId) {
        // Variable Encontrar el Post
        let foundPost

        // Bucle que recorre los Post de Data
        // Si la Id del Post coincide con PostId se guarda en FoundPost y se detiene porque se ejecuta " && !foundPost "", si no es Undefined
        for (let i = 0; i < data.posts.length && !foundPost; i++) {
            const post = data.posts[i]

            if (post.id === postId)
                foundPost = post
        }

        // Si foundPost es undefined o null, lanza un error NotFoundError y detiene la ejecución
        if (!foundPost) throw new NotFoundError('post not found')

        // Comprueba si el usuario ya ha dado "like"
        // Se incicia UserIdFound como false
        let userIdFound = false

        // Bucle que recorre la lista de Likes de "foundPost.likes"
        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const userId = foundPost.likes[i]

            // Si el usuario ya está en la lista (userId === data.userId), se cambia userIdFound a true y se detiene el bucle.
            if (userId === data.userId)
                userIdFound = true
        }

        // Si el usuario NO ha dado "like" se lo añade
        if (!userIdFound)
            // Si userIdFound es false, se añade "data.userId" al final de foundPost.likes
            foundPost.likes[foundPost.likes.length] = data.userId

        else { // Si el usuario Si ha dado "like" se lo elimina
            const likes = []  // Se crea un nuevo array vacío likes

            // Bucle que recorre la lista de "likes" del Post
            for (let i = 0; i < foundPost.likes.length; i++) {
                const userId = foundPost.likes[i]

                // // Se copian todos los userId, excepto data.userId, al nuevo array
                if (userId !== data.userId)
                    likes[likes.length] = userId
            }

            // Se actualiza foundPost.likes con este nuevo array, eliminando así el "like" del usuario
            foundPost.likes = likes
        }

    }

}