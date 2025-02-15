function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo) //this.container.appendChild(logo)

    var registerText = new Heading(3)
    registerText.setText('Register')
    this.add(registerText)

    // - FORM -

    var form = new Form()
    form.addSubmitListener(function (event) {
        event.preventDefault()
        
        var name = nameInput.getValue()
        var surname = surnameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        try{
            logic.registerUser(name, surname, email, username, password)

            form.clear()

            this.registerSubmitListener()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        

    }.bind(this)) //Debo poner este bind para que tome el this de afuera, del register y no del form  
    

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
    
    form.add(registerSubmit)

    var loginRegister = new Anchor()
    loginRegister.setText('Login')
    form.add(loginRegister)

    loginRegister.addClickListener(function() {
        form.clear()

        this.loginClickListener()
    }.bind(this))

    //this.loginRegister = loginRegister //Esto lo hago para crear la proiedad loginRegister y luego poder usarlo en la funcion del prototipe addLoginClickListener, porque login register si existe dentro de la funcion constructura Register pero debo guardarlo como propiedad asi puedo usarlo en el Componente Register

}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

Register.prototype.addLoginClickListener = function (listener) {
    thise.loginClickListener = listener
    //this.loginRegister.addClickListener(listener)
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener //LE DICES GUARDATE ESTE LISTENER PARA CUANDO TERMINES EL REGISTER. Guardo el comportamiento de lo que hay que hacer luego de hacer login en una funcion.
}



// ---- ESTILOS

//form.container.style.display = 'flex'
//form.container.style.flexDirection = 'column'
//form.container.style.gap = '0.5rem'
//form.container.style.alignItems = 'center'

//registerSubmit.container.style.backgroundColor = '#428A82'
//registerSubmit.container.style.color = '#FFFFFF'

//loginRegister.container.style.fontWeight = 'bold'
//loginRegister.container.style.textDecoration = 'underline'
//loginRegister.container.style.marginTop = '50px'
//loginRegister.container.style.textAlign = 'center'