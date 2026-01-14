const logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },
    validate: {
        string (string, explain) {
            if (typeof string !== 'string') throw new TypeError (`invalid ${explain} type`)
        },
        text (text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(this.text)) throw new SyntaxError (`invalid ${explain} syntax`)
        },
        email (email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError (`invalid ${explain} syntax`)
            this.maxLength(email, 30, explain)
        },
        maxLength (value, maxLength , explain) {
            if (value.length > maxLength) throw new RangeError (`invalid ${explain} max length`)
        },
        minLength (value, minLength, explain) {
            if (value.length < minLength) throw new RangeError (`invalid ${explain} min length`)
        },
        username (username, explain) {
            this.text(username, explain)
            this.minLength(username, 2, explain)
            this.maxLength(username, 20, explain)
        },
        password (password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        },
        url (url, explain) {
            this.string(url, explain)
            if(!logic.constant.URL_REGEX.test(url)) throw new SyntaxError(`invalid ${explain}  syntax`)
        }
    },
    registerUser (name, surname, email, username, password) { 
        
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 20, 'name')

        this.validate.text(surname, 'surname')
        this.validate.maxLength(surname, 20,'surname')

        this.validate.email(email, 'email')

        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (user.username === username || user.email === email) {
                found = user
            }
        }

        if (found) throw new DuplicityError ('user already exists')

            const user = {
                id: data.uuid(),
                name: name,
                surname: surname,
                email: email,
                username: username,
                password: password,
                createdAt: new Date(),
                modifiedAt: null  
            }

        data.users[data.users.length] = user
    },

    loginUser (username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (username === user.username) {
                found = user
            }
        }

        if (!found || password !== found.password) throw new CredentialsError('wrong credentials')

        data.userId = found.id
    },  

    logoutUser () {
        data.userId = null
    },

    getUserName () {
        let found

        for (let i = 0; i < data.users.length && !found; i++) {
            const user = data.users[i]

            if (user.id === data.userId) {
                found = user
            }
        }
        if (!found) throw new NotFoundError ('user not found')

        return found.name
    },

    getPosts () {
        return data.posts
    },

    createPost (image, text) {
        this.validate.url(image)
        this.validate.text(text)
        
        const post = {
            id: data.uuid(),
            author: data.userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: ''
        }

        data.posts[data.posts.length] = post
    },

    toggleLikePost () {
        
    }
}
