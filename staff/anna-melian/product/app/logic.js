var logic = {
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
            this.minLength(username, 3, explain)
            this.maxLength(username, 25, explain)
        },
        password(password, explain) {
            this.text(password, explain)
            this.minLength(password, 6, explain)
            this.maxLength(password, 25, explain)
        },
        url(url, explain) {
            this.string(url, explain)
            if (!logic.constant.URL_REGEX.test(url))
                throw new SyntaxError('invalid' + explain + 'syntax')
        }

    },


    registerUser(name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.minLength(name, 1, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')


        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.email === email || user.username === username) {
                found = user
            }
        }

        if (found) throw new Error('user already exists')

        var user = {
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

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.username === username) {
                found = user
            }
        }

        if (!found || found.password !== password)
            throw new Error('wrong credentails')

        data.userId = found.id


    },

    logoutUser() {
        data.userId = null
    },

    getUserName() {
        var found
        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.id === data.userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.name
    },

    getAuthorUsername(post) {

        var found
        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.id === post.author)
                found = user
        }

        if (!found) throw new Error('invalid author')

        return found.username
    },

    getPosts() {
        return data.posts
    },

    createPost(image, text) {
        this.validate.url(image)
        this.validate.maxLength(1000)
        this.validate.text(text)
        this.validate.maxLength(500)

        var post = {
            id: data.uuid(),
            author: data.userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        data.posts[data.posts.length] = post


    },

    toggleLikePost(postId) {
        let foundPost

        for (let i = 0; i < data.posts.length && !foundPost; i++) {
            const post = data.posts[i]

            if (post.id === postId)
                foundPost = post
        }

        if (!foundPost) throw new NotFoundError('post not found')

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

            for (let i = 0; i < foundPost.likes.length; i++) {
                const userId = foundPost.likes[i]

                if (userId != data.userId)
                    likes[likes.length] = userId
            }

            foundPost.likes = likes
        }

    }

}