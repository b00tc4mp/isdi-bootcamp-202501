// ****  REGISTER

function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Register')
    this.add(logo)

    // Form
    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.width = '50%'
    form.addSubmitListener(function (event) {
        event.preventDefault()

        // Valores de datos del usuario
        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        //  Llamamos a estas funciones y si falla alguna lanza un error con el Catch.
        try {
            // Comprobamos los datos de usuario
            logic.registerUser(name, email, username, password)
            // Limpiamos el formulario de datos
            form.clear()
            // Hacemos el listener para que cambie la pantalla
            this.registerSubmitListener()
        } catch (error) {
            // Muestra el fallo por consola
            console.error(error)
            // Muestra un fallo al usuario
            alert(error.message)
        }
    }.bind(this))  // 
    this.add(form)

    // PARAMETROS DEL FORMULARIO
    // Name 
    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel)

    // Formulario 
    var nameInput = new Input()
    form.add(nameInput)

    // Email 
    var emailLabel = new Label()
    emailLabel.setText('E-mail')
    form.add(emailLabel)

    var emailInput = new Input()
    emailInput.setType('email')
    form.add(emailInput)

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

    // Login Anchor
    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.style.textDecoration = 'underline'
    loginAnchor.addClickListener(function () {
        form.clear()

        this.loginClickListener()
    }.bind(this))
    this.add(loginAnchor)

    // Register Button
    var submitButton = new Button()
    submitButton.setText('Register')
    submitButton.setType('submit')
    form.add(submitButton)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

Register.prototype.addLoginClickListener = function (listener) {
    this.loginClickListener = listener
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener
}


