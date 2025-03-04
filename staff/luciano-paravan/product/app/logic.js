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
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(this.text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        email(email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
            this.maxLength(email, 30, explain)
        },
        maxLength(value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError(`invalid ${explain} max length`)
        },
        minLength(value, minLength, explain) {
            if (value.length < minLength) throw new RangeError(`invalid ${explain} min length`)
        },
        username(username, explain) {
            this.text(username, explain)
            this.minLength(username, 2, explain)
            this.maxLength(username, 20, explain)
        },
        password(password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        },
        url(url, explain) {
            this.string(url, explain)
            if (!logic.constant.URL_REGEX.test(url)) throw new SyntaxError(`invalid ${explain}  syntax`)
        }
    },
    registerUser(name, surname, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.minLength(name, 1, 'name')
        this.validate.text(surname, 'surname')
        this.validate.maxLength(surname, 20, 'surname')
        this.validate.minLength(surname, 1, 'surname')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const { users } = data

        let found

        for (let i = 0; i < users.length && !found; i++) {
            const user = users[i]

            if (user.username === username || user.email === email) {
                found = user
            }
        }

        if (found) throw new DuplicityError('user already exists')

        const user = {
            id: data.uuid(),
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            modifiedAt: null,
            savedPosts: []
        }

        //data.users[data.users.length] = user

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

            if (username === user.username) {
                found = user
            }
        }

        if (!found || password !== found.password) throw new CredentialsError('wrong credentials')

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

            if (user.id === userId) {
                found = user
            }
        }
        if (!found) throw new NotFoundError('user not found')

        return found.name
    },

    getPosts() {
        const { posts, userId } = data

        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const userId = post.likes[i]

                if (userId === userId) {
                    liked = true
                }
            }

            const aggregatedPost = {
                id: post.id,
                author: post.author,
                image: post.image,
                text: post.text,
                createdAt: post.createdAt,
                modifiedAt: post.modifiedAt,
                liked: liked,
                likesCount: post.likes.length
            }

            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
        }

        return aggregatedPosts.reverse()
    },

    createPost(image, text) {
        const { uuid, userId, posts } = data

        this.validate.url(image)
        this.validate.maxLength(1000)
        this.validate.text(text)
        this.validate.maxLength(500)

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

    toggleLikePost(postId) {
        const { posts, userId } = data
        let foundPost

        for (let i = 0; i < posts.length && !foundPost; i++) {
            const post = posts[i]

            if (post.id === postId) {
                foundPost = post
            }
        }
        if (!foundPost) throw new NotFoundError('post not found')

        let userIdFound = false

        for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
            const id = foundPost.likes[i]

            if (id === userId) {
                userIdFound = true
            }
        }

        if (!userIdFound) {
            foundPost.likes[foundPost.likes.length] = userId
        } else {
            const likes = []

            for (let i = 0; i < foundPost.likes.length; i++) {
                const id = foundPost.likes[i]

                if (id !== userId) {
                    likes[likes.length] = id
                }
            }

            foundPost.likes = likes
        }

        data.posts = posts
    },
    toggleSavePost(postId) {
        const { users, userId } = data
        let foundUser

        for (let i = 0; i < data.users.length && !foundUser; i++) {
            const user = data.users[i]

            if (data.userId === user.id) {
                foundUser = user
            }
        }
        if (!foundUser) throw new NotFoundError('user not found')

        let savedPostFound = false
        for (let i = 0; i < foundUser.savedPosts.length && !savedPostFound; i++) {
            const savedPost = foundUser.savedPosts[i]

            if (savedPost === postId) {
                savedPostFound = true
            }
        }

        let newSavedPosts = []
        if (!savedPostFound) {
            data.foundUser.savedPosts.push(postId)
        } else {
            for (let i = 0; i < foundUser.savedPosts.length; i++) {
                const post = foundUser.savedPosts[i]

                if (post !== postId) {
                    newSavedPosts[newSavedPosts.length] = post
                }
            }
            //foundUser.savedPosts = newSavedPosts
            data.foundUser.savedPost = newSavedPosts
        }
    }
}
