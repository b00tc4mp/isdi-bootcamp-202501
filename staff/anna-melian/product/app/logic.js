import { DuplicityError, NotFoundError, CredentialsError } from './errors.js'

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


    registerUser(name, email, username, house, password) {
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
            house: house,
            password: password,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.users.insertOne(user)

    },

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        const users = data.users.getAll()

        const found = data.users.findOne(user => user.username === username)

        if (!found || found.password !== password)
            throw new CredentialsError('wrong credentails')

        data.userId = found.id


    },

    logoutUser() {
        data.userId = null
    },

    getUserName() {
        const users = data.users.getAll()

        const { userId } = data

        const found = data.users.getById(userId)

        if (!found) throw new NotFoundError('user not found')

        return found.name
    },

    getUserHouse() {
        const users = data.users.getAll()

        const { userId } = data

        const found = data.users.getById(userId)

        if (!found) throw new NotFoundError('user not found')

        return found.house

    },

    getUsers() {
        const users = data.users.getAll()
        return users
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


            const aggregatedPost = {
                id: post.id,
                author: post.author,
                image: post.image,
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                liked: liked,
                likesCount: post.likes.length,
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

        const { userId } = data
        const user = data.users.getById(userId)

        var post = {
            author: { id: userId, username: user.username },
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: [],
        }

        data.posts.insertOne(post)

    },

    toggleLikePost(postId) {
        const { userId } = data

        const foundPost = data.posts.findOne(post => post.id === postId)

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

        data.posts.updateOne(foundPost)
    },

    getOwnPosts() {
        const { userId } = data

        const posts = logic.getPosts()
        let ownPosts = []

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]
            if (post.author.id === userId)
                ownPosts.push(post)
        }

        return ownPosts

    },


    updateUserProfile(name, username, email) {
        this.validate.text(name, 'name')
        this.validate.username(username, 'username')
        this.validate.email(email, 'email')

        const { userId } = data

        const users = data.users.getAll()

        const user = data.users.getById(userId)

        if (!user) throw new Error('User not found')

        if (user.name === name && user.username === username && user.email === email) {
            return false
        }

        user.name = name
        user.username = username
        user.email = email
        user.modifiedAt = new Date()

        data.users.updateOne(user)

        return true

    },

    changePassword(actualPassword, newPassword) {
        this.validate.password(actualPassword)
        this.validate.password(newPassword)

        const { userId } = data

        const users = data.users.getAll()

        const user = data.users.getById(userId)

        if (!user) throw new Error('User not found')

        const correctActualPassword = (user.password === actualPassword ? true : false)

        if (!correctActualPassword) throw new Error('Wrong password')

        const equalPasswords = (actualPassword === newPassword ? true : false)

        if (equalPasswords) throw new Error('Equal passwords')

        user.password = newPassword
        user.modifiedAt = new Date()

        data.users.updateOne(user)

    },


    deleteProfile() {
        const { userId } = data

        const posts = data.posts.getAll()
        const users = data.users.getAll()

        const user = data.users.getById(userId)

        if (!user) throw new Error('user not found')

        data.users.deleteOne(user => user.id === userId)


        const remainingPosts = posts.filter(post => post.author.id !== userId)




        const newPosts = remainingPosts.map(post => {
            const updatedLikes = post.likes.filter(id => id !== userId)
            return { ...post, likes: updatedLikes }

        })
        data.posts.setAll(newPosts)
        data.userId = null

    },


}

export default logic