function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText = 'Logo'
    this.add(logo) //this.container.appendChild(logo)

    // - FORM -

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.5rem'
    form.container.style.alignItems = 'center'
    this.add(form) //this.container.appendChild(form)

    var nameLabel = new Label()
    nameLabel.setText('Name: ')
    form.add(nameLabel)

    var nameInput = new Input()
    nameInput.setType('text')
    nameInput.name = 'name'
    form.add(nameInput)

    var surnameLabel = new Label()
    surnameLabel.setText('Surname: ')
    form.add(surnameLabel)

    var surnameInput = new Input()
    surnameInput.setType('text')
    surnameInput.name = 'surname'
    form.add(surnameInput)

    var emailLabel = new Label()
    emailLabel.setText('E-mail: ')
    form.add(emailLabel)

    var emailInput = new Input()
    emailInput.setType('text')
    emailInput.name = 'email'
    form.add(emailInput)

    var usernameLabel = new Label()
    usernameLabel.setText('Username: ')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.name = 'username'
    form.add(usernameInput)

    var passwordLabel = new Label()
    passwordLabel.setText('Password: ')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.name = 'password'
    form.add(passwordInput)

    var registerSubmit = new Button()
    registerSubmit.setText('Register')
    registerSubmit.setType('submit')
    registerSubmit.container.style.backgroundColor = '#428A82'
    registerSubmit.container.style.color = '#FFFFFF'
    form.add(registerSubmit)

    var loginRegister = new Anchor()
    loginRegister.setText('Login')
    loginRegister.container.style.fontWeight = 'bold'
    loginRegister.container.style.textDecoration = 'underline'
    loginRegister.container.style.marginTop = '50px'
    loginRegister.container.style.textAlign = 'center'
    form.add(loginRegister)

    loginRegister.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))

    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('Register submit')
        
        var name = nameInput.getValue()
        var surname = surnameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(name, surname, email, username, password)

        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register