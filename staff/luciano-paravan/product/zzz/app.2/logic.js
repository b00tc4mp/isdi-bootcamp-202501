var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    validate: {
        string: function (string, explain) {
            if (typeof string !== 'string') throw new TypeError (`invalid ${explain} type`)
        },
        text: function (text, value, explain) {
            this.string(text, explain)
            if (logic.constant.EMPTY_OR_BLANK_REGEX.test(this.text)) throw new SyntaxError (`invalid ${string} syntax`)
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
        
        this.validate.text(name, explain)
        this.validate.maxLength(name, explain)

        this.validate.text(surname, explain)
        this.validate.maxLength(surname, explain)

        this.validate.email(email, explain)
        this.validate.maxLength(email, explain)

        this.validate.username(username, explain)
        this.validate.password(password, explain)
    }
}
