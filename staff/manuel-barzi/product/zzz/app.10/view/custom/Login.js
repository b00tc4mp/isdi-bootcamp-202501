function Login() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    // form

    var form = new Form()
    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('login submit')

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(username, password)

        this.loginSubmitListener()
    }.bind(this))
    this.add(form)

    // username

    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)


    var usernameInput = new Input()
    usernameInput.setType('text')
    form.add(usernameInput)

    // password

    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)


    var passwordInput = new Input()
    passwordInput.setType('password')
    form.add(passwordInput)

    // submit

    var submitButton = new Button()
    submitButton.setText('Login')
    submitButton.setType('submit')
    form.add(submitButton)

    // anchor

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    this.registerAnchor = registerAnchor
    this.add(registerAnchor)
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

Login.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}

Login.prototype.addLoginSubmitListener = function (listener) {
    this.loginSubmitListener = listener
}