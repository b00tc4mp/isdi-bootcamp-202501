function Login () {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)
    
    var loginText = new Heading(3)
    loginText.setText('Login')
    this.add(loginText)
    
    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.5rem'
    this.add(form)
    
    var usernameLabel = new Label()
    usernameLabel.setText('Username: ')
    form.add(usernameLabel)
    
    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.name = 'login-name'
    form.add(usernameInput)
    
    var passwordLabel = new Label()
    passwordLabel.setText('Password: ')
    form.add(passwordLabel)
    
    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.name = 'password-input'
    form.add(passwordInput)
    
    var loginSubmit = new Button()
    loginSubmit.setText('Login')
    loginSubmit.setType('submit')
    loginSubmit.container.style.backgroundColor = '#428A82'
    loginSubmit.container.style.color = '#FFFFFF'
    form.add(loginSubmit)
    
    var registerLogin = new Anchor()
    registerLogin.setText('Register')
    registerLogin.container.style.fontWeight = 'bold'
    registerLogin.container.style.textDecoration = 'underline'
    registerLogin.container.style.marginTop = '50px'
    registerLogin.container.style.textAlign = 'center'
    form.add(registerLogin)
    
    registerLogin.addClickListener(function () {
        body.remove(this)
        body.add(register)
    }.bind(this))
    
    form.addSubmitListener(function(event) {
        event.preventDefault()

        console.log('login submit')

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(username, password)

        body.remove(this)
        body.add(home)
    }.bind(this))
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login