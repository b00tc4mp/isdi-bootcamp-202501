const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    },

    validate: {
        string(string, explain) {
            if (typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
        },
        text(text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        email(email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
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
            this.minLength(username, 2, explain)
            this.maxLength(username, 16, explain)
        },
        password(password, explain) {
            this.text(password, explain)
            this.minLength(password, 5, explain)
            this.maxLength(password, 16, explain)
        },
        url(url, explain) {
            this.string(url, explain)
            if (!logic.constant.URL_REGEX.test(url)) throw new SyntaxError(`invalid ${explain} syntax`)
        }
    },

    registerUser(name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const { users } = data

        let found

        for (let i = 0; i < users.length && !found; i++) {
            var user = users[i]

            if (user.email === email || user.username === username)
                found = user
        }

        if (found) throw new Error('User already exists')

        var user = {
            id: data.uuid(),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            role: username === 'god' ? 'admin' : 'user', //TEST -> ROLE
            state: null,  // TEST -> status
            modifiedAt: null,
        }

        users.push(user)

        data.users = users
    },

    loginUser(username, password) {
        this.validate.username(username, 'name')
        this.validate.password(password, 'name')

        let found = data.users.find(user => user.username === username)

        if (!found || found.password !== password) throw new Error('Wrong credentials')

        data.currentUser = found
        found.state = 'Online'

        data.userId = found.id
    },

    isUserLoggedIn() {
        return !!data.userId
    },

    //TEST -> ONLINE USER
    getCurrentUser() {
        var foundUser = data.users.find(user => user.state === 'Online')

        if (!foundUser)
            throw new Error('Any user online')
        else
            return foundUser
    },

    getUsername() {
        const { users, userId } = data

        let found

        for (i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if (user.id === userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.name
    },

    getAuthorName(id) {
        const { users } = data

        let targetUser

        for (let i = 0; i < users.length; i++) {
            const current = users[i]

            if (current.id === id)
                targetUser = current
        }

        return targetUser.username
    },

    getPosts() {
        const { userId, posts } = data

        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const id = post.likes[i]

                if (id === userId)
                    liked = true
            }

            const aggregatedPost = {
                id: post.id,
                author: post.author,
                image: post.image,
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                liked: liked,
                likesCount: post.likes.length
            }

            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
        }

        return aggregatedPosts.reverse()
    },

    createPost(image, text) {
        this.validate.url(image)
        this.validate.maxLength(1000)
        this.validate.text(text)
        this.validate.minLength(500)

        const { uuid, userId, posts } = data

        const post = {
            id: uuid(),
            author: userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        posts[posts.length] = post

        data.posts = posts
    },

    logoutUser() {
        data.userId = null
        // data.currentUser.state = 'Offline'
        // data.currentUser = null
    },

    toggleLikePost(postId) {
        //paso el post Id por parametro desde loadPosts y lo busco
        const { posts, userId } = data

        let foundPost

        for (let i = 0; i < posts.length && !foundPost; i++) {
            const post = posts[i]

            if (post.id === postId)
                foundPost = post
        }

        if (!foundPost) throw new NotFoundError('post not found')

        let userIdFound = false

        //en este caso lo encuentro y voy a buscar el like en concreto
        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const id = foundPost.likes[i]

            if (id === userId)
                userIdFound = true
        }

        //si no encuentro el like de ese usuario le doy like 
        if (!userIdFound) {
            foundPost.likes[foundPost.likes.length] = userId
        }
        else {
            //en caso de tener like lo solapo con otro array para quitarlo
            const likes = []

            for (let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i]

                if (id !== userId)
                    likes[likes.length] = id
            }

            foundPost.likes = likes
        }

        data.posts = posts
    },

    isCurrentAuthor(author) {
        const { userId } = data

        if (author === userId)
            return true
        else
            return false
    },

    deletePost(postId) {
        const { posts } = data

        let found

        for (let i = 0; i < posts.length && !found; i++) {
            const post = posts[i]

            if (postId === post.id) {
                posts.splice(i, 1)
                found = post
            }
        }

        return data.posts = posts
    }
}