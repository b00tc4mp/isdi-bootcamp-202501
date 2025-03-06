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
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (var i = 0; i < data.users.length && !found; i++) {
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

        data.users.push(user)
        localStorage.users = JSON.stringify(data.users)
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (var i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (user.username === username)
                found = user
        }

        if (!found || found.password !== password) throw new Error('wrong credentials')

        data.userId = found.id
    },

    logoutUser() {
        data.userId = null
    },

    getUserName() {
        let found

        for (let i = 0; i < data.users.length; i++) {
            const user = data.users[i]

            if (user.id === data.userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.name
    },

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

            const aggregatedPost = {
                id: post.id,
                author: post.author,
                image: post.image,
                text: post.text,
                ceatedAt: post.createdAt,
                modifiedAt: post.modifiedAt,
                liked: liked,
                likesCount: post.likes.length,
                comments: post.comments
            }

            aggregatedPosts.push(aggregatedPost)
        }
        return aggregatedPosts.reverse()
    },

    addPost(link, text, comments) {
        const newPost = {
            id: data.uuid(),
            author: data.userId,
            image: link,
            text: text,
            createdAt: new Date().toLocaleDateString(),
            modifiedAt: null,
            likes: [],
            comments: []
            // commentUserId: comments.commentUserId,
            // commentText: comments.commentText
        }

        data.posts.push(newPost)
    },

    likePost(postId) {
        let postToLike
        for (let i = 0; i < data.posts.length && !postToLike; i++) {
            let post = data.posts[i]

            if (postId === post.id)
                postToLike = post
        }

        for (var i = 0; i < postToLike.likes.length; i++) {
            if (postToLike.likes[i] === data.userId) {
                postToLike.likes.splice(i, 1)
                return
            }
        }
        postToLike.likes[postToLike.likes.length] = data.userId
    },

    isPostLikedByUser(postId) {
        let postToLike
        for (let i = 0; i < data.posts.length && !postToLike; i++) {
            let post = data.posts[i]

            if (postId === post.id)
                postToLike = post
        }

        for (var i = 0; i < postToLike.likes.length; i++) {
            if (post.likes[i] === data.userId) {
                return true
            }
        }
        return false
    },

    commentPost(postId) {

    }

}
