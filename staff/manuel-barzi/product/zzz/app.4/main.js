console.clear()
console.log('Hello, App!')

// component

function Component(container) {
    this.container = container
}

// landing

var landing = new Component(document.createElement('div'))
landing.mount = function () {
    document.body.appendChild(this.container)

    var logo = document.createElement('h1')
    logo.textContent = 'Logo'
    this.container.appendChild(logo)

    var registerAnchor = document.createElement('a')
    registerAnchor.textContent = 'Register'
    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.container.appendChild(registerAnchor)


    var orText = document.createTextNode('or')
    this.container.appendChild(orText)

    var loginAnchor = document.createElement('a')
    loginAnchor.textContent = 'Login'
    loginAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.container.appendChild(loginAnchor)
}

/* register */

var register = new Component(document.createElement('div'))
register.mount = function () {
    var logo = document.createElement('h1')
    logo.textContent = 'Logo'
    this.container.appendChild(logo)

    // form

    var form = document.createElement('form')
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

var login = new Component(document.createElement('div'))
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

var home = new Component(document.createElement('div'))
home.mount = function () {
    var logo = document.createElement('h1')
    logo.textContent = 'Logo'
    this.container.appendChild(logo)
}

landing.mount()
register.mount()
login.mount()
home.mount()