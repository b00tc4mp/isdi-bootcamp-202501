var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },

    validate: {
        string: function (string, explain) {
            if (typeof string !== 'string') throw new TypeError(`invalid ${explain} type`)
        },
        text: function (text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError(`invalid ${explain} syntax`)
        },
        email: function (email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError(`invalid ${explain} syntax`)
            this.maxLength(email, 30, explain)
        },
        maxLength: function (value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError(`invalid ${explain} maxLength`)
        },
        minLength: function (value, minLength, explain) {
            if (value.length < minLength) throw new RangeError(`invalid ${explain} minLength`)
        },
        username: function (username, explain) {
            this.text(username, explain)
            this.minLength(username, 2, explain)
            this.maxLength(username, 16, explain)
        },
        password: function (password, explain) {
            this.text(password, explain)
            this.minLength(password, 6, explain)
            this.maxLength(password, 16, explain)
        }
    },

    registerUser: function (name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'name')
        this.validate.username(username, 'name')
        this.validate.password(password, 'name')

        var found
        for (let i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.email === email || user.username === username)
                found = user
        }

        if (found) throw new Error('User already exists')

        var user = {
            id: data.uuid(),
            name: name,
            email: email,
            username: username,
            password: password,
            createdAt: new Date(),
            role: username === 'god' ? 'admin' : 'user', //TEST -> ROLE
            status: null,  // TEST -> status
            modifiedAt: null,
        }

        data.users[data.users.length] = user
    },

    loginUser: function (username, password) {
        this.validate.username(username, 'name')
        this.validate.password(password, 'name')

        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.username === username)
                found = user
        }

        if (!found || found.password !== password) throw new Error('Wrong credentials')

        data.userId = found.id
        data.currentUser = found
        found.status = 'Online'
    },

    //TEST -> ONLINE USER
    getCurrentUser: function () {
        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.status === 'Online') {
                found = user
                return found
            }
        }

        if (!found) throw new Error('Any user online')
    },

    logoutUser: function () {
        data.userId = null
        data.currentUser.status = 'Offline'
        data.currentUser = null
    }
}