 // Register constructor (Formulario de registro)

 function Register() {
    Component.call(this, 'div')

   var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    // Creamos el formulario

    var form = new Form()
    form.addSubmitListener(function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        
     try {
      logic.registerUser(name, email, username, password)
      
       form.clear()

       this.registerSubmitListener()
     } catch (error) {
       console.error(error)

       alert(error.mesage)
     }
    }.bind(this))
    this.add(form)

     // Nombre
    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel);

    var nameInput = new Input()
    form.add(nameInput)
    
     //Email

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

    //Submit

    var submitButton = new Button()
    submitButton.setText('Register')
    submitButton.setType('submit')
    form.add(submitButton)

    // Anchor
    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
   loginAnchor.addClickListener(function () {
    form.clear()
   
    this.loginClickListener()
 }.bind(this))
 this.add(loginAnchor)

}   
    Register.prototype = Object.create(Component.prototype)
    Register.prototype.constructor = Register

    Register.prototype.addLoginClickListener = function (listener) {
        this.loginClickListener = listener
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener
}
