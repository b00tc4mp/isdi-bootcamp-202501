var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/,
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    registerUser: function (name, email, username, password) {
        if (typeof name !== 'string') throw new TypeError('invalid name type')
        if (this.constant.EMPTY_OR_BLANK_REGEX.test(name)) throw new SyntaxError('invalid name syntax')
        if (name.length > 20) throw new RangeError('invalid name length')
        if (typeof email !== 'string') throw new TypeError('invalid email type')
        if (!this.constant.EMAIL_REGEX.test(email)) throw new SyntaxError('invalid email syntax')
        if (email.length > 30) throw new RangeError('invalid email length')
        if (typeof username !== 'string') throw new TypeError('invalid username type')
        if (this.constant.EMPTY_OR_BLANK_REGEX.test(username)) throw new SyntaxError('invalid username syntax')
        if (username.length > 20) throw new RangeError('invalid username length')
        if (typeof password !== 'string') throw new TypeError('invalid password type')
        if (this.constant.EMPTY_OR_BLANK_REGEX.test(password)) throw new SyntaxError('invalid password syntax')
        if (password.length > 20) throw new RangeError('invalid password length')

        // TODO business logic
    }
}