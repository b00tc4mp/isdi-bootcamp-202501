function Login() {
    Component.call(this, 'div')

    this.container.style.width = '400px'

    var title = new Heading(2)
    title.setText('Login')
    this.add(title)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.justifyContent = 'left'
    form.container.style.gap = '5px'
    this.form = form
    this.add(form)

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


    form.addSubmitListener(function (event) {
        event.preventDefault()


        var username = usernameInput.getValue()
        var password = passwordInput.getValue()


        try {
            logic.loginUser(username, password)

            form.clear()

            this.loginSubmitListener()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }.bind(this))

    var lowerSpan = new Span()
    lowerSpan.container.style.margin = '10px'
    lowerSpan.container.style.marginRight = '60px'
    lowerSpan.container.style.display = 'flex'
    lowerSpan.container.style.justifyContent = 'space-between'
    this.add(lowerSpan)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline'
    registerAnchor.container.style.cursor = 'pointer'
    registerAnchor.addClickListener(function () {
        form.clear()

        this.registerClickListener()
    }.bind(this))
    lowerSpan.add(registerAnchor)

    var loginButton = new Button()
    loginButton.setText('Login')
    loginButton.setType('submit')
    loginButton.container.style.width = '80px'
    loginButton.setType8
    lowerSpan.add(loginButton)

    form.add(lowerSpan)
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

Login.prototype.addRegisterClickListener = function (listener) {
    this.registerClickListener = listener
}

Login.prototype.addLoginSubmitListener = function (listener) {
    this.loginSubmitListener = listener
}