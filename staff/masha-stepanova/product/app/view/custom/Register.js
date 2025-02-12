function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.3rem'
    form.addSubmitListener(function (event) {
        event.preventDefault()

        var name = inputName.getValue()
        var email = inputEmail.getValue()
        var username = inputUsername.getValue()
        var password = inputPassword.getValue()

        try {
            logic.registerUser(name, email, username, password)

            form.clear()

            this.registerSubmitListener()
        } catch (error) {
            console.log(error)

            alert(error.message)
        }
    }.bind(this))
    this.add(form)

    var labelName = new Label()
    labelName.setText('Name')
    form.add(labelName)

    var inputName = new Input()
    form.add(inputName)

    var labelEmail = new Label()
    labelEmail.setText('E-mail')
    form.add(labelEmail)

    var inputEmail = new Input()
    inputEmail.setType('email')
    form.add(inputEmail)

    var labelUsername = new Label()
    labelUsername.setText('Username')
    form.add(labelUsername)

    var inputUsername = new Input()
    inputUsername.setType('text')
    form.add(inputUsername)

    var labelPassword = new Label()
    labelPassword.setText('Password')
    form.add(labelPassword)

    var inputPassword = new Input()
    inputPassword.setType('password')
    form.add(inputPassword)

    var submitButton = new Button()
    submitButton.setType('submit')
    submitButton.setText('Submit')
    form.add(submitButton)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function () {
        form.clear()

        this.loginClickListener()
    }.bind(this))
    this.add(loginAnchor)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

Register.prototype.addLoginClickListener = function (listener) {
    this.loginClickListener = listener
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener
}