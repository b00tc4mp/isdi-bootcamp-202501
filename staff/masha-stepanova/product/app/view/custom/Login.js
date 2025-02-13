function Login() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var form = new Form()
    this.add(form)

    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.3rem'

    var labelUsername = new Label()
    labelUsername.setText('Username')
    form.add(labelUsername)

    var inputUsername = new Input()
    form.add(inputUsername)

    var labelPassword = new Label()
    labelPassword.setText('Password')
    form.add(labelPassword)

    var inputPassword = new Input()
    inputPassword.setType('password')
    form.add(inputPassword)

    var loginButton = new Button()
    loginButton.setText('Login')
    loginButton.setType('submit')
    form.add(loginButton)

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var username = inputUsername.getValue()
        var password = inputPassword.getValue()

        try {
            logic.loginUser(username, password)

            form.clear()

            this.loginSubmitButton()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }.bind(this))

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
    this.loginSubmitButton = listener
}