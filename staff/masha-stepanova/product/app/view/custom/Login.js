function Login() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var form = new Form()
    this.add(form)

    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.3rem'

    var labelUsername = new Label()
    labelUsername.setText('Username')
    form.add(labelUsername)

    var inputUsername = new Input()
    form.add(inputUsername)

    var labelPassword = new Label()
    labelPassword.setText('Password')
    form.add(labelPassword)

    var inputPassword = new Input()
    form.add(inputPassword)

    var loginButton = new Button()
    loginButton.setText('Login')
    loginButton.setType('submit')
    form.add(loginButton)

    form.addSubmitListener(function (event) {
        event.preventDefault()
        body.remove(this)
        body.add(home)
    }.bind(this))

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.addClickListener(function () {
        body.remove(this)
        body.add(register)
    }.bind(this))
    this.add(registerAnchor)

}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login