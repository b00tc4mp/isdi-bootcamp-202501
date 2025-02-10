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

var register = new Component('div')
register.mount = function () {
    var logo = document.createElement('h1')
    logo.textContent = 'Logo'
    this.container.appendChild(logo)

    // form

    var form = document.createElement('form')
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        console.log('register submit')

        var name = nameInput.value
        var email = emailInput.value
        var username = usernameInput.value
        var password = passwordInput.value

        console.log(name, email, username, password)
    })
    this.container.appendChild(form)

    // name

    var nameLabel = document.createElement('label')
    nameLabel.textContent = 'Name'
    form.appendChild(nameLabel)


    var nameInput = document.createElement('input')
    form.appendChild(nameInput)

    // email

    var emailLabel = document.createElement('label')
    emailLabel.textContent = 'E-mail'
    form.appendChild(emailLabel)


    var emailInput = document.createElement('input')
    form.appendChild(emailInput)

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
    submitButton.textContent = 'Register'
    form.appendChild(submitButton)

    // anchor

    var loginAnchor = document.createElement('a')
    loginAnchor.textContent = 'Login'
    loginAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.container.appendChild(loginAnchor)
}

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

register.mount()
login.mount()
home.mount()