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

        console.log('register submit')

        var name = inputName.container.value
        var email = inputEmail.container.value
        var username = inputUsername.container.value
        var password = inputPassword.container.value

        console.log(name, email, username, password)

        this.registerSubmitListener()
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
    form.add(inputEmail)

    var labelUsername = new Label()
    labelUsername.setText('Username')
    form.add(labelUsername)

    var inputUsername = new Input()
    form.add(inputUsername)

    var labelPassword = new Label()
    labelPassword.setText('Password')
    form.add(labelPassword)

    var inputPassword = new Input()
    form.add(inputPassword)

    var submitButton = new Button()
    submitButton.setType('submit')
    submitButton.setText('Submit')
    form.add(submitButton)



    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    this.loginAnchor = loginAnchor
    this.add(loginAnchor)

}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

Register.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener
}