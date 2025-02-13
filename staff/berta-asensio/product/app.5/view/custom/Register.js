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


        /* La logica registra al usuario al sistema y se encarga de procesarlo.
        Y recordemos que la logica se llama con un try/catch.
        Dentro del try, está todo lo happy. En el catch se captura el error.
        */

        try {
            logic.registerUser(name, username, password, email) 
            
            form.clear() //aquí llamo a clear

            this.registerSubmitListener()
        } catch(error) {
            console.error(error)

            alert(error.message)
        }
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

    //register Button

    var registerButton = new Button()
    registerButton.setType('submit')
    registerButton.setText('Register') // Este botón ahora es el botón de "submit"
    form.add(registerButton) 

}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register


Register.prototype.addRegisterSubmitListener = function(listener) {
    this.registerSubmitListener = listener
}

Register.prototype.addReturnClickListener = function(listener) {
    this.returnAnchor.addClickListener(listener)
}

//Con los cambios hechos, aquí ya no hay ninguna referencia a main (ni body, ni login ni landing)
