var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },

    validate: {
        string: function (string, explain) {
            if (typeof string !== 'string') throw new TypeError('invalid ' + explain + ' type')
        },
        text: function (text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError('invalid ' + explain + ' syntax')
        },
        email: function (email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError('invalid ' + explain + ' syntax')
            this.maxLength(email, 30, explain)
        },
        maxLength: function (value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError('invalid ' + explain + ' maxLength')
        },
        minLength: function (value, minLength, explain) {
            if (value.length < minLength) throw new RangeError('invalid ' + explain + ' minLength')
        },
        username: function (username, explain) {
            this.text(username, explain)
            this.minLength(username, 3, explain)
            this.maxLength(username, 20, explain)
        },
        password: function (password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        },
        url: function (url, explain) {
            this.string(url, explain)
            if (!logic.constant.URL_REGEX.test(url)) throw new SyntaxError('invalid ' + explain + ' syntax')
        }
    },

    registerUser: function (name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.email === email || user.username === username)
                found = user
        }

        if (found) throw new Error('user already exists')

        var user = {
            id: data.uuid(),
            name: name,
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

            if (user.username === username)
                found = user
        }

        if (!found || found.password !== password) throw new Error('wrong credentials')

        data.userId = found.id
    },

    logoutUser: function () {
        data.userId = null
    },

    getUserName: function () {
        var found

        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if (user.id === data.userId)
                found = user
        }

        if (!found) throw new Error('user not found')

        return found.name
    },

    getPosts: function () {
        return data.posts
    },

    createPost: function (image, text) {
        this.validate.url(image)
        this.validate.text(text)

        var post = {
            id: data.uuid(),
            author: data.userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        data.posts[data.posts.length] = post
    },

    toggleLikePost: function () {
        // TODO add userId in post.likes or remove it
    }
}