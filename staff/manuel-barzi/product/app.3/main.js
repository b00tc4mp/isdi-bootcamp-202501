console.clear()
console.log('Hello, App!')

// landing

var landing = {
    mount: function () {
        var container = document.createElement('div')
        landing.container = container
        document.body.appendChild(container)

        var logo = document.createElement('h1')
        logo.textContent = 'Logo'
        container.appendChild(logo)


        var registerAnchor = document.createElement('a')
        registerAnchor.textContent = 'Register'
        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })
        container.appendChild(registerAnchor)


        var orText = document.createTextNode('or')
        container.appendChild(orText)

        var loginAnchor = document.createElement('a')
        loginAnchor.textContent = 'Login'
        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        container.appendChild(loginAnchor)

    }
}

/* register */

var register = {
    mount: function () {
        var container = document.createElement('div')
        register.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Logo'
        container.appendChild(logo)

        // form

        var form = document.createElement('form')
        container.appendChild(form)

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
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        container.appendChild(loginAnchor)
    }
}

/* login */

var login = {
    mount: function () {
        var container = document.createElement('div')
        login.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Logo'
        container.appendChild(logo)

        // form

        var form = document.createElement('form')
        container.appendChild(form)

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
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })
        container.appendChild(registerAnchor)
    }
}

/* home */

var home = {
    mount: function () {
        var container = document.createElement('div')
        home.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Logo'
        container.appendChild(logo)
    }
}

landing.mount()
register.mount()
login.mount()
home.mount()