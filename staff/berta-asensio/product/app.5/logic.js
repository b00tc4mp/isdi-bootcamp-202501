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
        email: function (email, explain) {
            this.string(email, explain)
            if (!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError('invalid ' + explain + ' syntax')
            this.length(email, 50, explain)  //recibimos aqui el length de email
        },
        length: function (value, length, explain) {
            if (value.length > length) throw new RangeError ('invalid ' + explain +' length')
        }
    },
    registerUser: function (name, username, password, email) {
    
        this.validate.text(name, 'name')
        this.validate.length(name, 20, 'name')
  
        this.validate.text(username, 'username')
        this.validate.length(username, 20, 'username')

        this.validate.text(password, 'password')
        this.validate.length(password, 30, 'password')
  
        this.validate.email(email, 'email')
    }       
}