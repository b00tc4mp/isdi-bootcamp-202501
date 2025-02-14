function Login() {
    Component.call(this, 'div')
    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var intructions = new Heading(4)
    this.add(intructions)
    intructions.setText('To login enter your credentials.')

    // form

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('login submit')

        var username = formUsernameInput.getValue()
        var password = formPasswordInput.getValue()

        try {
            logic.loginUser(username, password)

            form.clear()

            this.loginSubmitListener()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }.bind(this))
    this.add(form)

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

    // submit button

    var formSubmitButton = new Button()
    form.add(formSubmitButton)
    formSubmitButton.setText('Login')
    formSubmitButton.setType('submit')

    // anchor

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.addClickListener(function () {
        form.clear()

        this.registerClickListener()
    }.bind(this))
    this.add(registerAnchor)
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

Login.prototype.addRegisterClickListener = function (listener) {
    this.registerClickListener = listener
}

Login.prototype.addLoginSubmitListener = function (listener) {
    this.loginSubmitListener = listener
}