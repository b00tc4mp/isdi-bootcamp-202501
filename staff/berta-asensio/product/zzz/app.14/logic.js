const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },
    validate: {
        //podemos quitar la palabra function en ES6, ya no será string: function(), sino que sera string()
        string(string, explain) {
            if(typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
        },
        text(text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        maxLength(value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError (`invalid ${explain} maxLength`)
        },
        minLength(value, minLength, explain) {
            if(value.length < minLength) throw new RangeError (`invalid ${explain} minLength`)
        },
        name(name, explain) {
            this.text(name, explain)
            this.minLength(name, 2, explain)
            this.maxLength(name, 20, explain)
        },
        username(username, explain) {
            this.text(username, explain)
            this.minLength(username, 3, explain)
            this.maxLength(username, 20, explain)
        },
        password(password, explain) {
            this.text(password, explain)
            this.maxLength(password, 30, explain)
            this.minLength(password, 4, explain)
        },
        email(email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
            this.maxLength(email, 50, explain)  //recibimos aqui el length de email
        },
        url(url, explain) {
            this.string(url, explain)
            if(!logic.constant.URL_REGEX.test(url)) throw new SyntaxError (`invalid ${explain} syntax`)
        }
    },
    registerUser(name, username, password, email) {
    
        this.validate.name(name, 'name')
  
        this.validate.username(username, 'username')

        this.validate.password(password, 'password')

        this.validate.email(email, 'email')

        const { users } = data

        let found 
            
        for (let i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if(user.email === email || user.username === username)
                found = user
        }

        if(found) throw new DuplicityError('user already exists')
        
        const user = {
            id: data.uuid(),
            name: name, 
            username: username, 
            password: password, 
            email: email,
            createdAt: new Date(), 
            modifiedAt: null
        }

        users[users.length] = user

        data.users = users
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')

        this.validate.password(password, 'password')

        const { users } = data

        let found 
            
        for (let i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if(user.username === username)
                found = user
        }
        if(!found || found.password !== password) throw new CredentialsError('wrong credentials')

        data.userId = found.id
    },

    logoutUser() {
        data.userId = null
    },

    getUserName() {

        const { users, userId } = data  //esto esta llamando a los dos getters a la vez

        let found 
            
        for (let i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if(user.id === userId)
                found = user
        }

        if(!found) throw new NotFoundError ('user not found')

        return found.name
    },

    isUserLoggedIn() {
        return !!data.userId
    },

    getPosts() {

        const { userId, posts } = data //destructuramos el usuario para no tener que poner todo el rato data. Estamos llamando a los getters aqui.
        
        const agregatedPosts = []

        for (let i = 0; i < posts .length; i++)  {
            const post = posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const id = post.likes[i]

                if( id === userId)
                    liked = true
            }

            const agregatedPost = {
                id: post.id, 
                author: post.author, 
                image: post.image, 
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt), // si viene el dato, lo convierto en date si no lo mantengo en null
                liked: liked,
                totalLikes: post.likes.length

            }

            agregatedPosts[agregatedPosts.length] = agregatedPost
        }

        return agregatedPosts.reverse()
    },

    createPost(image, text) {
        this.validate.url(image)
        this.validate.maxLength(1000)
        this.validate.text(text)
        this.validate.maxLength(500)

        const { uuid, userId, posts } = data //llamamos a los getters

        const post = {
            id: uuid(), //crear id para post
            author: userId, //buscamos en data al author
            image: image, //la imagen que hemos puesto y validado
            text: text, //lo mismo que la imagen pero con el texto
            createdAt: new Date(), //fecha actual
            modifiedAt: null,
            likes: []
        }

        posts[posts.length] = post

        data.posts = posts // ejecutamos los setters
    },

    toggleLikePost(postId) {

        const { posts, userId } = data
        
        let foundPost
        
        for (let i = 0; i < posts.length && !foundPost; i++) {
            const post = posts[i]

            if(post.id === postId)
                foundPost = post
        }

        if (!foundPost) throw new NotFoundError ('post not found') 

        let userIdFound = false

        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const id = foundPost.likes[i] 

            if (id === userId)
                userIdFound = true
        }

        if (!userIdFound)
            foundPost.likes[foundPost.likes.length] = userId
        else {
            const likes = []

            for(let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i]

                if(id !== userId)
                    likes[likes.length] = id
            }

            foundPost.likes = likes
        }

        data.posts = posts
    }
}