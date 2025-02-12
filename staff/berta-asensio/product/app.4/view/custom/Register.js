function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    var title = new Heading(2)
    title.setText('Create account')
    this.add(title)

    //Form

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var email = emailInput.getValue()

        console.log(name, username, password, email)

    })
    this.add(form)

    //name

    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel)

    var br = new Br()
    form.add(br)

    var nameInput = new Input()
    form.add(nameInput)

    var br = new Br()
    form.add(br)

    //username

    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var br = new Br()
    form.add(br)

    var usernameInput = new Input()
    form.add(usernameInput)

    var br = new Br()
    form.add(br)

    //password

    var passwordLabel = new Label
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var br = new Br()
    form.add(br)

    var passwordInput = new Input()
    form.add(passwordInput)

    var br = new Br()
    form.add(br)

    //email

    var emailLabel = new Label()
    emailLabel.setText('Email')
    form.add(emailLabel)

    var br = new Br()
    form.add(br)

    var emailInput = new Input()
    emailInput.setType('email')  // este setType solo aceptara emails
    form.add(emailInput)

    var br = new Br()
    form.add(br)

    //return anchor 

    var returnAnchor = new Anchor()
    returnAnchor.setText('Return')
    returnAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))
    form.add(returnAnchor)

    var spaceBetweenButton = document.createTextNode(' ')
    this.container.appendChild(spaceBetweenButton)

    //register button

    var button = new Button()
    button.setType('submit')
    button.setText('Register')
    form.add(button)

    var spaceBetweenButton = document.createTextNode(' ')
    this.container.appendChild(spaceBetweenButton)

    //login button

    var loginButton = new Button()
    loginButton.setType('button')
    loginButton.setText('Login')
    loginButton.addClickListener(function() {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginButton)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register


