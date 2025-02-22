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

        // Buscamos en la base de datos si el usuario que intentamos crear ya existe 

        let found 
            
        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

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

        data.users[data.users.length] = user // introducimos el nuevo usuario al final del array de data users
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')

        this.validate.password(password, 'password')

        let found 
            
        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

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
        let found 
            
        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if(user.id === data.userId)
                found = user
        }

        if(!found) throw new NotFoundError ('user not found')

        return found.name
    },

    getPosts() {
        const agregatedPosts = []

        for (let i = 0; i < data.posts .length; i++)  {
            const post = data.posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const userId = post.likes[i]

                if( userId === data.userId)
                    liked = true
            }

            const agregatedPost = {
                id: post.id, 
                author: post.author, 
                image: post.image, 
                text: post.text,
                createdAt: post.createdAt,
                modifiedAt: post.modifiedAt,
                liked: liked,
                totalLikes: post.likes.length

            }

            agregatedPosts[agregatedPosts.length] = agregatedPost
        }

        return agregatedPosts
    },

    createPost(image, text) {
        this.validate.url(image)
        this.validate.maxLength(1000)
        this.validate.text(text)
        this.validate.maxLength(500)

        const post = {
            id: data.uuid(), //crear id para post
            author: data.userId, //buscamos en data al author
            image: image, //la imagen que hemos puesto y validado
            text: text, //lo mismo que la imagen pero con el texto
            createdAt: new Date(), //fecha actual
            modifiedAt: null,
            likes: []
        }

        data.posts[data.posts.length] = post
    },

    toggleLikePost(postId) {
        
        let foundPost
        
        for (let i = 0; i < data.posts.length && !foundPost; i++) {
            const post = data.posts[i]

            if(post.id === postId)
                foundPost = post
        }

        if (!foundPost) throw new NotFoundError ('post not found') 

        let userIdFound = false

        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const userId = foundPost.likes[i] 

            if (userId === data.userId)
                userIdFound = true
        }

        if (!userIdFound)
            foundPost.likes[foundPost.likes.length] = data.userId
        else {
            const likes = []

            for(let i = 0; i < foundPost.likes.length; i++) {
                const userId = foundPost.likes[i]

                if(userId !== data.userId)
                    likes[likes.length] = userId
            }

            foundPost.likes = likes
        }
    }
}