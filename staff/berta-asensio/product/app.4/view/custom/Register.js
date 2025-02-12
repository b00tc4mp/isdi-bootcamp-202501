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

        this.registerSubmitListener()

    }.bind(this))
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

    this.add(returnAnchor)
    this.returnAnchor = returnAnchor

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

    this.add(loginButton)
    this.loginButton = loginButton

}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

//Creamos aquí el método de addLoginClickListener en el prototipo
//El listener lo recibimos de fuera, porque main es el que hará la accion 
Register.prototype.addLoginClickListener = function(listener) {
    this.loginButton.addClickListener(listener)
}

Register.prototype.addRegisterSubmitListener = function(listener) {
    this.registerSubmitListener = listener
}

Register.prototype.addReturnClickListener = function(listener) {
    this.returnAnchor.addClickListener(listener)
}

//Con los cambios hechos, aquí ya no hay ninguna referencia a main (ni body, ni login ni landing)
