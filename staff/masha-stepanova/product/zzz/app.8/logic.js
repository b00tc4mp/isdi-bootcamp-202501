import data from './data.js'

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

        data.users.insertOne(user)
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const found = data.users.findOne(user => user.username === username)

        if (!found || found.password !== password) throw new CredentialsError('wrong credentials')

        data.userId = found.id
    },

    logoutUser() {
        data.userId = null
    },

    getUserName() {
        const users = data.users.getAll()

        const { userId } = data

        const found = data.users.getById(userId)

        if (!found) throw new Error('user not found')

        return found.name
    },

    isUserLoggedIn() {
        return !!data.userId
    },

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

            const aggregatedPost = {
                id: post.id,
                author: { id: post.author, username: user.username },
                image: post.image,
                text: post.text,
                createdAt: post.createdAt,
                modifiedAt: post.modifiedAt,
                liked: liked,
                likesCount: post.likes.length,
                // comments: post.comments
            }

            aggregatedPosts.push(aggregatedPost)
        }

        return aggregatedPosts.reverse()
    },

    addPost(link, text, comments) {
        //this.validate.url(link)
        this.validate.maxLength(1000)
        this.validate.text(text)
        this.validate.maxLength(500)

        const { userId } = data

        const newPost = {
            author: userId,
            image: link,
            text: text,
            createdAt: new Date().toLocaleDateString(),
            modifiedAt: null,
            likes: []
            // comments: []
            // commentUserId: comments.commentUserId,
            // commentText: comments.commentText
        }

        data.posts.insertOne(newPost)
    },

    likePost(postId) {
        const { userId } = data

        let postToLike = data.posts.findOne(post => post.id === postId)

        if (!postToLike) throw new NotFoundError('post not found')

        for (var i = 0; i < postToLike.likes.length; i++) {
            if (postToLike.likes[i] === userId) {
                postToLike.likes.splice(i, 1)
                data.posts.updateOne(postToLike)
                return
            }
        }
        postToLike.likes[postToLike.likes.length] = userId

        data.posts.updateOne(postToLike)
    },

    isPostLikedByUser(postId) {
        const posts = data.posts.getAll()

        const { userId } = data

        let postToLike = posts.findOne(post => post.id === postId)

        for (var i = 0; i < postToLike.likes.length; i++) {
            if (postToLike.likes[i] === userId) {
                return true
            }
        }
        return false
    },

    commentPost(postId) {

    },

    getUserPosts() {
        const posts = data.posts.getAll()

        const { userId } = data

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

                const user = data.users.getById(post.author)

                const aggregatedPost = {
                    id: post.id,
                    author: { id: post.author, username: user.username },
                    image: post.image,
                    text: post.text,
                    createdAt: post.createdAt,
                    // createdAt: new Date(post.createdAt),
                    modifiedAt: post.modifiedAt,
                    //modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                    liked: liked,
                    likesCount: post.likes.length,
                    // comments: post.comments
                }

                aggregatedPosts.push(aggregatedPost)
            }
        }
        return aggregatedPosts.reverse()
    },

    deletePost(postId) {
        const posts = data.users.getAll()

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

export default logic