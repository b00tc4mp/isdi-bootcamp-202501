function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.3rem'
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

    form.addSubmitListener(function (event) {
        event.preventDefault()
        body.remove(this)
        body.add(login)

        console.log('register submit')

        var name = inputName.value
        var email = inputEmail.value
        var username = inputUsername.value
        var password = inputPassword.value

        console.log(name, email, username, password)
    }.bind(this))

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)

}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register