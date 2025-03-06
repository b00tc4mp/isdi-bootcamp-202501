const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },

    validate: {
        string(string, explain) {
            if (typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
        },
        text(text, explain) {
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        email(email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
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
    },

    registerUser(name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.minLength(name, 1, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const { users, uuid } = data

        let found

        for (var i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if (user.email === email || user.username === username)
                found = user
        }

        if (found) throw new DuplicityError('user already exists')

        const user = {
            id: uuid(),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        users.push(user)

        data.users = users
        // localStorage.users = JSON.stringify(users)
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const { users } = data

        let found

        for (var i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if (user.username === username)
                found = user
        }

        if (!found || found.password !== password) throw new CredentialsError('wrong credentials')

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

    isUserLoggedIn() {
        return !!data.userId
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
                createdAt: post.createdAt,
                modifiedAt: post.modifiedAt,
                liked: liked,
                likesCount: post.likes.length,
                comments: post.comments
            }

            aggregatedPosts.push(aggregatedPost)
        }
        // posts = aggregatedPosts
        return aggregatedPosts.reverse()
    },

    addPost(link, text, comments) {
        const { uuid, userId, posts } = data

        const newPost = {
            id: uuid(),
            author: userId,
            image: link,
            text: text,
            createdAt: new Date().toLocaleDateString(),
            modifiedAt: null,
            likes: [],
            comments: []
            // commentUserId: comments.commentUserId,
            // commentText: comments.commentText
        }

        posts.push(newPost)

        data.posts = posts
    },

    likePost(postId) {
        const { posts, userId } = data

        let postToLike

        for (let i = 0; i < posts.length && !postToLike; i++) {
            let post = posts[i]

            if (postId === post.id)
                postToLike = post
        }

        for (var i = 0; i < postToLike.likes.length; i++) {
            if (postToLike.likes[i] === userId) {
                postToLike.likes.splice(i, 1)
                data.posts = posts
                return
            }
        }
        postToLike.likes[postToLike.likes.length] = userId

        data.posts = posts
    },

    isPostLikedByUser(postId) {
        const { posts, userId } = data

        let postToLike

        for (let i = 0; i < posts.length && !postToLike; i++) {
            let post = posts[i]

            if (postId === post.id)
                postToLike = post
        }

        for (var i = 0; i < postToLike.likes.length; i++) {
            if (post.likes[i] === userId) {
                return true
            }
        }
        return false
    },

    commentPost(postId) {

    },

    getUserPosts() {
        const { userId, posts } = data

        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]

            if (post.author === userId) {

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
                    createdAt: post.createdAt,
                    modifiedAt: post.modifiedAt,
                    liked: liked,
                    likesCount: post.likes.length,
                    comments: post.comments
                }

                aggregatedPosts.push(aggregatedPost)
            }
        }
        return aggregatedPosts.reverse()
    },

    deletePost(postId) {
        const { posts } = data

        let found

        for (let i = 0; i < posts.length && !found; i++) {
            const post = posts[i]

            if (postId === post.id) {
                posts.splice(i, 1)
                found = true
            }

        }
        data.posts = posts
        return data.posts
    }
}
