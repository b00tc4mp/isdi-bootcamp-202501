// ****  LOGIN

function Login() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Login')
    this.add(logo)

    // Form
    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.width = '50%'
    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('login submit')

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
    this.add(form)

    // Username 
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    form.add(usernameInput)

    // Password
    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    form.add(passwordInput)

    // Button Login
    var submitButton = new Button()
    submitButton.setText('Login')
    submitButton.setType('submit')
    form.add(submitButton)

    // // Register
    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline'
    registerAnchor.addClickListener(function () {

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