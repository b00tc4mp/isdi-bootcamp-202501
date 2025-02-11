function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var intructions = new Heading(4)
    this.add(intructions)
    intructions.setText('To create a new account enter the following information. ')

    // from

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('register submit')

        var name = formNameInput.getValue()
        var email = formEmailInput.getValue()
        var username = formUsernameInput.getValue()
        var password = formPasswordInput.getValue()

        try {
            this.submitVerification(name, email)

            console.log(name, email, username, password)

            this.registerSubmitListener()

        } catch (error) {
            alert("Error: " + error.message)
        }

    }.bind(this))
    this.add(form)

    //name
    var formNameLabel = new Label()
    form.add(formNameLabel)
    formNameLabel.setText('Name')

    var formNameInput = new Input()
    form.add(formNameInput)
    formNameInput.setPlaceholder('Anna')
    formNameInput.setType('Name')

    // email
    var formEmailLabel = new Label()
    form.add(formEmailLabel)
    formEmailLabel.setText('E-mail')

    var formEmailInput = new Input()
    formEmailInput.setPlaceholder('abc@gmail.com')
    formEmailInput.setType('E-mail')
    form.add(formEmailInput)

    // username

    var formUsernameLabel = new Label()
    form.add(formUsernameLabel)

    formUsernameLabel.setText('Username')

    var formUsernameInput = new Input()
    formUsernameInput.setPlaceholder('Anna10')
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
    formSubmitButton.setType('submit')

    // anchor 

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

Register.prototype.submitVerification = function (name, email) {
    if (typeof name != 'string') {
        throw new Error('Invalid answer')
    }

    var isEmail = false
    for (var i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            isEmail = true
        }
    }
    if (!isEmail) {
        throw new Error('Invalid answer')
    }
}