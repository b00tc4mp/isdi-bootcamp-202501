var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
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
            this.maxLength(username, 10, explain)
        },
        password: function (password, explain) {
            this.text(password, explain)
            this.minLength(password, 8, explain)
            this.maxLength(password, 20, explain)
        }
    },
    registerUser: function (name, email, username, password) {
        this.validate.text(name, 'name')
        this.validate.maxLength(name, 20, 'name')
        this.validate.email(email, 'email')
        this.validate.username(username, 'username')
        this.validate.password(password, 'password')

        // TODO business logic
    }
}