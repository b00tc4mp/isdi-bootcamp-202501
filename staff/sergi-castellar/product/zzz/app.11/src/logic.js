import { DuplicityError, NotFoundError, CredentialsError, OwnershipError } from './errors.js'

import { data } from './data.js'

export const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },

    helper: {
        handleError(error) {
            console.error(error)
            alert(error.message)
        }
    },

    validate: {
        string(string, explain) {
            if (typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
        },
        text(text, explain) { // string no vacio
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        maxLength(value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError(`invalid ${explain} maximum length`)
        },
        minLength(value, minLength, explain) {
            if (value.length < minLength) throw new RangeError(`invalid ${explain} minimum length`)
        },
        exactLength(value, exactLength, explain) {
            if (value.length !== exactLength) throw new RangeError(`invalid ${explain} length`)
        },
        name(name, explain) {
            this.text(name, explain)
            this.maxLength(name, 15, explain)
            this.minLength(name, 3, explain)
        },
        email(email, explain) {
            this.text(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
            this.maxLength(email, 30, explain)
        },
        username(username, explain) {
            this.text(username, explain)
            this.maxLength(username, 15, explain)
            this.minLength(username, 3, explain)
        },
        password(password, explain) {
            this.text(password, explain)
            this.maxLength(password, 25, explain)
            this.minLength(password, 6, explain)
        },
        url(imageSrc, explain) {
            this.text(imageSrc, explain)
            if (!logic.constant.URL_REGEX.test(imageSrc)) throw new SyntaxError(`invalid ${explain} syntax`)
            this.maxLength(imageSrc, 5000, explain)
        },
        description(textDescription, explain) {
            this.text(textDescription, explain)
            this.maxLength(textDescription, 750, explain)
        },
        id(id, explain) {
            this.text(id, explain)
            this.exactLength(id, 34, explain)
        }
    },

    registerUser(name, email, username, password) {
        this.validate.name(name, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const found = data.users.findOne(user => user.username === username || user.email === email)

        if (found) throw new DuplicityError('user already exists')

        const user = {
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.users.insertOne(user, '00')
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const userFound = data.users.findOne(user => user.username === username)

        if (!userFound) throw new CredentialsError('wrong credentials')
        if (userFound.password !== password) throw new CredentialsError('wrong password')

        data.userId = userFound.id
    },

    logoutUser() {
        data.userId = null
    },

    isUserLoggedIn() {
        return !!data.userId
    },

    getPosts() {
        const posts = data.posts.getAll()

        const { userId } = data

        const aggregatedPosts = []

        posts.forEach(post => {
            let liked
            post.likes.includes(userId) ? liked = true : liked = false

            const author = data.users.getById(post.authorId)

            const { id, imageSrc, textDescription, createdAt, modifiedAt, likes } = post

            const aggregatedPost = {
                id: id,
                author: { ...author },
                imageSrc: imageSrc,
                textDescription: textDescription,
                createdAt: createdAt && new Date(createdAt),
                modifiedAt: modifiedAt && new Date(modifiedAt),
                likes: likes,
                liked: liked,
                own: post.authorId === userId
            }

            aggregatedPosts.push(aggregatedPost)
        })

        return aggregatedPosts
    },

    createNewPost(imageSrc, textDescription) {
        this.validate.url(imageSrc, 'url')
        this.validate.description(textDescription, 'description')

        const { userId } = data

        const newPost = {
            authorId: userId,
            imageSrc: imageSrc,
            textDescription: textDescription,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        data.posts.insertOne(newPost, '01')
    },

    deletePost(postId) {
        this.validate.id(postId, 'id')

        const { posts } = data

        const findPost = posts.findOne(post => post.id === postId)

        if (!findPost) throw new NotFoundError('post not found')
        if (data.userId !== findPost.authorId) throw new OwnershipError('user is not the post author')

        data.posts.deleteOne(post => post.id === postId)
    },

    editPost(postId, text) {
        this.validate.id(postId, 'id')

        const { posts } = data

        const findPost = posts.findOne(post => post.id === postId)

        if (!findPost) throw new NotFoundError('post not found')
        if (data.userId !== findPost.authorId) throw new OwnershipError('user is not the post author')

        findPost.textDescription = text
        findPost.modifiedAt = new Date

        data.posts.updateOne(findPost)
    },

    toggleLike(currentPostId) {
        this.validate.id(currentPostId, 'id')

        const { userId } = data

        const currentPost = data.posts.findOne(post => post.id === currentPostId)

        if (!currentPost) throw new NotFoundError('post not found')

        const likePosition = currentPost.likes.indexOf(userId)
        const isAlreadyLiked = likePosition !== -1

        if (!isAlreadyLiked) {
            currentPost.likes.push(userId)
        } else {
            currentPost.likes.splice(likePosition, 1)
        }

        data.posts.updateOne(currentPost)
    },

    getLikesUsernames(likeIds) {
        return likeIds.map(likeId => {
            const user = data.users.findOne(user => user.id === likeId)
            return user.username
        })
    },

    getCurrentUser() {
        const userFound = data.users.findOne(user => user.id === data.userId)
        let result
        userFound ? result = userFound : result = null
        return result
    }
}