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

        const { users } = data

        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (user.email === email || user.username === username) {
                found = user
            }
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

        const { users, userId } = data

        let found
        for (let i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if (user.id === userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.name
    },
    getCommentCreator() {
        const { users, userId } = data

        let found
        for (let i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if (user.id === userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.username
    },
    isUserLoggedIn() {
        return !!data.userId
    },

    getAuthorUsername(post) {
        const { users } = data

        let found
        for (let i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if (user.id === post.author)
                found = user
        }

        if (!found) throw new Error('invalid author')

        return found.username
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
                likesCount: post.likes.length,
                comments: post.comments,
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

        const { uuid, userId, posts } = data

        var post = {
            id: uuid(),
            author: userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: [],
            comments: []
        }

        posts[posts.length] = post

        data.posts = posts


    },

    toggleLikePost(postId) {
        const { posts, userId } = data
        let foundPost

        for (let i = 0; i < posts.length && !foundPost; i++) {
            const post = posts[i]

            if (post.id === postId)
                foundPost = post
        }

        if (!foundPost) throw new NotFoundError('post not found')

        let userIdFound = false

        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const id = foundPost.likes[i]

            if (id === userId)
                userIdFound = true
        }

        if (!userIdFound) {
            foundPost.likes[foundPost.likes.length] = userId

        }
        else {
            const likes = []

            for (let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i]

                if (id != userId)
                    likes[likes.length] = id
            }

            foundPost.likes = likes

        }

        data.posts = posts

    },

    addComment(post, author, text) {
        post.comments[post.comments.length] = author + ': ' + text
    }

}