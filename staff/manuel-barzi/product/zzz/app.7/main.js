console.clear()
console.log('Hello, App!')

// component

function Component(tagName) {
    this.container = document.createElement(tagName)
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}

function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

Label.prototype.setText = function (text) {
    this.container.textContent = text
}

function Input() {
    Component.call(this, 'input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setType = function (type) {
    this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder) {
    this.container.placeholder = placeholder
}

Input.prototype.getValue = function () {
    return this.container.value
}

function Button() {
    Component.call(this, 'button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function (type) {
    this.container.type = type
}

Button.prototype.setText = function (text) {
    this.container.textContent = text
}

function Heading(level) {
    Component.call(this, 'h' + level)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setText = function (text) {
    this.container.textContent = text
}

function Anchor() {
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}

function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

// body

const body = new Body()
document.body = body.container

// landing

function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.add(registerAnchor)


    var orText = document.createTextNode('or')
    this.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)

/* register */

function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    // form

    var form = new Form()
    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('register submit')

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(name, email, username, password)
    })
    this.add(form)

    // name

    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel)

    var nameInput = new Input()
    form.add(nameInput)

    // email

    var emailLabel = new Label()
    emailLabel.setText('E-mail')
    form.add(emailLabel)


    var emailInput = new Input()
    emailInput.setType('email')
    form.add(emailInput)

    // username

    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)


    var usernameInput = new Input()
    usernameInput.setType('text')
    form.add(usernameInput)

    // password

    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)


    var passwordInput = new Input()
    passwordInput.setType('password')
    form.add(passwordInput)

    // submit

    var submitButton = new Button()
    submitButton.setText('Register')
    submitButton.setType('submit')
    form.add(submitButton)

    // anchor

    var loginAnchor = new Anchor('a')
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginAnchor)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register()

/* login */

var login = new Component('div')
login.mount = function () {
    var logo = document.createElement('h1')
    logo.textContent = 'Logo'
    this.container.appendChild(logo)

    // form

    var form = document.createElement('form')
    this.container.appendChild(form)

    // username

    var usernameLabel = document.createElement('label')
    usernameLabel.textContent = 'Username'
    form.appendChild(usernameLabel)


    var usernameInput = document.createElement('input')
    form.appendChild(usernameInput)

    // password

    var passwordLabel = document.createElement('label')
    passwordLabel.textContent = 'Password'
    form.appendChild(passwordLabel)


    var passwordInput = document.createElement('input')
    form.appendChild(passwordInput)

    // submit

    var submitButton = document.createElement('button')
    submitButton.textContent = 'Login'
    form.appendChild(submitButton)

    // anchor

    var registerAnchor = document.createElement('a')
    registerAnchor.textContent = 'Register'
    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.container.appendChild(registerAnchor)
}

/* home */

var home = new Component('div')
home.mount = function () {
    var logo = document.createElement('h1')
    logo.textContent = 'Logo'
    this.container.appendChild(logo)
}

login.mount()
home.mount()