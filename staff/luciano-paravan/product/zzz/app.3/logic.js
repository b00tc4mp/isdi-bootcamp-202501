var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    validate: {
        string: function (string, explain) {
            if (typeof string !== 'string') throw new TypeError (`invalid ${explain} type`)
        },
        text: function (text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(this.text)) throw new SyntaxError (`invalid ${explain} syntax`)
        },
        email: function (email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError (`invalid ${explain} syntax`)
            this.maxLength(email, 30, explain)
        },
        maxLength: function (value, maxLength , explain) {
            if (value.length > maxLength) throw new RangeError (`invalid ${explain} max length `)
        },
        minLength: function (value, minLength, explain) {
            if (value.length < minLength) throw new RangeError (`invalid ${explain} min length`)
        },
        username: function (username, explain) {
            this.text(username, explain)
            this.minLength(username, 2, explain)
            this.maxLength(username, 20, explain)
        },
        password: function (password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        }
    },
    registerUser: function (name, surname, email, username, password) { 
        
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 20, 'name')

        this.validate.text(surname, 'surname')
        this.validate.maxLength(surname, 20,'surname')

        this.validate.email(email, 'email')

        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.username === username || user.email === email) {
                found = user
            }
        }

        if (found) throw new Error ('user already exists')

            var user = {
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

    loginUser: function (username, password) {
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (username === user.username) {
                found = user
            }
        }

        if (!found || password !== found.password) throw new Error ('wrong credentials')

        data.userId = found.id
    },

    logoutUser: function () {
        data.userId = null
    }
}
