//  ****  LOGIC

var logic = {

    // Variable que quenera los Regex para comprobar datos 
    constant: {
        // Regex espacios en blanco
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        // Regex comprueba que sea email
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },

    validate: {
        // Comprobamos que sea un Sting
        string: function (string, explain) {
            if (typeof string !== 'string') throw new TypeError('invalid ' + explain + ' type')
        },
        // Comprobamos que sea tipo Texto
        text: function (text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError('invalid ' + explain + ' syntax')
        },
        // Comprueba que sea tipo Email
        email: function (email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError('invalid ' + explain + ' syntax')
            this.maxLength(email, 30, explain)
        },
        // Comprueba que la longitod Maxima
        maxLength: function (value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError('invalid ' + explain + ' maxLength')
        },
        // Comprueba que la longitod Minima
        minLength: function (value, minLength, explain) {
            if (value.length < minLength) throw new RangeError('invalid ' + explain + ' minLength')
        },
        // Comprueba que el parametro Usuario
        username: function (username, explain) {
            this.text(username, explain)
            this.minLength(username, 3, explain)
            this.maxLength(username, 20, explain)
        },
        // Comprueba que el parametro Passwor
        password: function (password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        }
    },

    // Funcion para Registrar al usuario
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

    // Funcion para Iniciar sesion
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

    // Funcion para Cerrar sesion
    logoutUser: function () {
        data.userId = null
    },

    // Funcion para Obtener nombre de usuario
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

    // Funcion para Obtener los Posts
    getPosts: function () {
        return data.posts
    }

}