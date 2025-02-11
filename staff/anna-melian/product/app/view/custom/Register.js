function Register() {
    Component.call(this, 'div')
    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var intructions = new Heading(4)
    this.add(intructions)
    intructions.setText('To register, enter the following information. ')

    // from

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('register submit')

        var name = formNameInput.container.value
        var email = formEmailInput.container.value
        var username = formUsernameInput.container.value
        var password = formPasswordInput.container.value

        console.log(name, email, username, password)

        body.remove(register)
        body.add(login)

    })

    this.add(form)

    //name
    var formNameLabel = new Label()
    form.add(formNameLabel)
    formNameLabel.setText('Name')

    var formNameInput = new Input()
    form.add(formNameInput)
    formNameInput.setType('Name')

    // email
    var formEmailLabel = new Label()
    form.add(formEmailLabel)
    formEmailLabel.setText('E-mail')

    var formEmailInput = new Input()
    formEmailInput.setType('E-mail')
    form.add(formEmailInput)

    // username

    var formUsernameLabel = new Label()
    form.add(formUsernameLabel)

    formUsernameLabel.setText('Username')

    var formUsernameInput = new Input()
    formUsernameInput.setType('Username')
    form.add(formUsernameInput)

    // password

    var formPasswordLabel = new Label()
    form.add(formPasswordLabel)
    formPasswordLabel.setText('Password')

    var formPasswordInput = new Input()
    formPasswordInput.setType('Password')
    form.add(formPasswordInput)

    // submit botton
    var formSubmitButton = new Button()
    form.add(formSubmitButton)
    formSubmitButton.setText('Create new account')

    // anchor 

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
