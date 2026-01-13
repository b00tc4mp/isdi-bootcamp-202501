var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },

    validate: {
        string: function (string, explain) {
            if (typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
        },
        text: function (text, explain) { // string no vacio
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        maxLength: function (value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError(`invalid ${explain} maximum length`)
        },
        minLength: function (value, minLength, explain) {
            if (value.length < minLength) throw new RangeError(`invalid ${explain} minimum length`)
        },
        name: function (name, explain) {
            this.text(name, explain)
            this.maxLength(name, 15, explain)
            this.minLength(name, 3, explain)
        },
        email: function (email, explain) {
            this.text(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
            this.maxLength(email, 30, explain)
        },
        username: function (username, explain) {
            this.text(username, explain)
            this.maxLength(username, 15, explain)
            this.minLength(username, 3, explain)
        },
        password: function (password, explain) {
            this.text(password, explain)
            this.maxLength(password, 25, explain)
            this.minLength(password, 6, explain)
        },
    },

    registerUser: function (name, email, username, password) {
        this.validate.name(name, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]
            if (user.username === username || user.email === email)
                found = user
        }

        if (found) throw new Error('user already exists')

        var user = {
            id: data.uuid('00'),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date() //TODO modified at?
        }

        data.users[data.users.length] = user
    },

    loginUser: function (username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]
            if (user.username === username)
                found = user
        }

        if (!found) throw new Error('wrong credentials')
        if (found.password !== password) throw new Error('wrong password')

        data.userId = found.id
    },

    logoutUser: function () {
        data.userId = null
    },

    getUserId: function () {
        return data.userId
    },

    getUserUsername: function (userId) {
        var found
        for (var i = 0; i < data.users.length; i++) {
            var user = data.users[i]
            if (user.id === userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.username
    },

    getPosts: function () {
        return data.posts
    },

    createPost: function () {

    }
}