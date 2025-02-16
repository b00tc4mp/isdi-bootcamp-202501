const logic = {
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
        }
    },

    registerUser(name, email, username, password) {
        this.validate.name(name, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            let user = data.users[i]
            if (user.username === username || user.email === email)
                found = user
        }

        if (found) throw new DuplicityError('user already exists')

        const user = {
            id: data.uuid('00'),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date() //TODO modified at?
        }

        data.users[data.users.length] = user
    },

    loginUser(username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            let user = data.users[i]
            if (user.username === username)
                found = user
        }

        if (!found) throw new CredentialsError('wrong credentials')
        if (found.password !== password) throw new CredentialsError('wrong password')

        data.userId = found.id
    },

    logoutUser() {
        data.userId = null
    },

    getUserId() {
        return data.userId
    },

    getUserProperty(userId, property) {
        let found
        for (let i = 0; i < data.users.length; i++) {
            let user = data.users[i]
            if (user.id === userId) {
                found = user
                break
            }
        }

        if (!found) throw new NotFoundError('user not found')
        if (!found.hasOwnProperty(property)) throw new NotFoundError('property not found')

        return found[property]
    },

    getPosts() {
        return data.posts
    },

    createNewPost(imageSrc, textDescription) {
        this.validate.url(imageSrc, 'url')
        this.validate.description(textDescription, 'description')

        const newPost = {
            id: data.uuid('01'),
            authorId: data.userId,
            imageSrc: imageSrc,
            textDescription: textDescription,
            createdAt: new Date(),
            modifiedAt: null
        }

        data.posts.push(newPost)
    }
}