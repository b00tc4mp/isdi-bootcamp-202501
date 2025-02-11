function Register() {
    Component.call(this, 'div')

    this.container.style.width = '400px'

    var title = new Heading(1)
    title.setText('Register')
    this.add(title)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.justifyContent = 'left'
    form.container.style.gap = '5px'
    this.form = form
    this.add(form)

    //NAME
    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel)

    var nameInput = new Input()
    nameInput.setType('text')
    nameInput.container.style.width = '350px'
    form.add(nameInput)

    //EMAIL
    var emailLabel = new Label()
    emailLabel.setText('E-mail')
    form.add(emailLabel)

    var emailInput = new Input()
    emailInput.setType('email')
    emailInput.container.style.width = '350px'
    form.add(emailInput)

    //USERNAME
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.container.style.width = '350px'
    form.add(usernameInput)

    //PASSWORD
    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.container.style.width = '350px'
    form.add(passwordInput)


    var lowerSpan = new Span()
    lowerSpan.container.style.margin = '10px'
    lowerSpan.container.style.marginRight = '55px'
    lowerSpan.container.style.display = 'flex'
    lowerSpan.container.style.justifyContent = 'space-between'
    lowerSpan.container.style.alignItems = 'center'
    lowerSpan.width = '100%'

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.style.textDecoration = 'underline'
    loginAnchor.container.style.cursor = 'pointer'
    this.loginAnchor = loginAnchor
    lowerSpan.add(loginAnchor)

    var registerButton = new Button()
    registerButton.setText('Register')
    registerButton.setType('submit')
    registerButton.container.style.width = '80px'
    lowerSpan.add(registerButton)

    form.add(lowerSpan)

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var userRegistered = {
            name: nameInput.getValue(),
            email: emailInput.getValue(),
            username: usernameInput.getValue(),
            password: passwordInput.getValue()
        }

        console.log(userRegistered)

        form.container.reset()
        this.registerSubmitListener()
    }.bind(this))
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

Register.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener
}
