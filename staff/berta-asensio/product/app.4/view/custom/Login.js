function Login() {
    Component.call(this, 'div')

    //logo

    var logo = new Heading(1)
    logo.setText('Bee You')
    this.add(logo)

    //title

    var title = new Heading(2)
    title.setText('Login')
    this.add(title)

    // form

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(username, password)

        body.remove(this)
        body.add(home)
    }.bind(this))
    this.add(form)

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

    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var br = new Br()
    form.add(br)

    var passwordInput = new Input()
    form.add(passwordInput)

    var br = new Br()
    form.add(br)

    //return button

    var returnButton = new Button()
    returnButton.setText('Return')
    returnButton.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))
    form.add(returnButton)

   // var spaceBetweenButton = document.createTextNode(' ')
    //form.appendChild(spaceBetweenButton)

    //login button

    var button = new Button()
    button.setType('submit')
    button.setText('Login')
    form.add(button)

}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

