var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    validate: {
        string: function (string, explain) {
            if(typeof string !== 'string') throw new TypeError('invalid ' + explain + ' type')
        },
        text: function (text, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError('invalid ' + explain + ' syntax')
        },
        maxLength: function (value, maxLength, explain) {
            if (value.length > maxLength) throw new RangeError ('invalid ' + explain +' maxLength')
        },
        minLength: function (value, minLength, explain) {
            if(value.length < minLength) throw new RangeError ('invalid ' + explain + ' minLength')
        },
        name: function (name, explain) {
            this.text(name, explain)
            this.minLength(name, 2, explain)
            this.maxLength(name, 20, explain)
        },
        username: function (username, explain) {
            this.text(username, explain)
            this.minLength(username, 3, explain)
            this.maxLength(username, 20, explain)
        },
        password: function (password, explain) {
            this.text(password, explain)
            this.maxLength(password, 30, explain)
            this.minLength(password, 4, explain)
        },
        email: function (email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError('invalid ' + explain + ' syntax')
            this.maxLength(email, 50, explain)  //recibimos aqui el length de email
        }
    },
    registerUser: function (name, username, password, email) {
    
        this.validate.name(name, 'name')
  
        this.validate.username(username, 'username')

        this.validate.password(password, 'password')

        this.validate.email(email, 'email')

        // Buscamos en la base de datos si el usuario que intentamos crear ya existe 

        var found 
            
        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if(user.email === email || user.username === username)
                found = user
        }

        if(found) throw new Error('user already exists')
        
        var user = {
            id: data.uuid(),
            name: name, 
            username: username, 
            password: password, 
            email: email,
            createdAt: new Date(), 
            modifiedAt: null
        }

        data.users[data.users.length] = user // introducimos el nuevo usuario al final del array de data users
    },

    loginUser: function (username, password) {
        this.validate.username(username, 'username')

        this.validate.password(password, 'password')

        var found 
            
        for (var i = 0; i < data.users.length && !found; i++) {
            var user = data.users[i]

            if(user.username === username)
                found = user
        }
        if(!found || found.password !== password) throw new Error('wrong credentials')

        data.userId = found.id
    },

    logoutUser: function() {
        data.userId = null
    }
}