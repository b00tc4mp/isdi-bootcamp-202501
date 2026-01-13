console.clear()
console.log('Hello, App!')

// landing

var landing = {
    mount: function () {
        var container = document.createElement('div')
        document.body.appendChild(container)

        var logo = document.createElement('h1')
        container.appendChild(logo)

        //var logoText = document.createTextNode('Logo')
        //logo.appendChild(logoText)
        // logo.innerText = 'Logo'
        logo.textContent = 'Logo'

        var registerAnchor = document.createElement('a')
        container.appendChild(registerAnchor)

        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register)
        })

        // var registerAnchorText = document.createTextNode('Register')
        // registerAnchor.appendChild(registerAnchorText)
        registerAnchor.textContent = 'Register'

        var orText = document.createTextNode('or')
        container.appendChild(orText)

        var loginAnchor = document.createElement('a')
        container.appendChild(loginAnchor)

        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login)
        })

        // var loginAnchorText = document.createTextNode('Login')
        // loginAnchor.appendChild(loginAnchorText)
        loginAnchor.textContent = 'Login'
    }
}

/* register */

var register = {
    mount: function () {
        var container = document.createElement('div')
        // document.body.appendChild(container)

        var logo = document.createElement('h1')
        container.appendChild(logo)

        // var logoText = document.createTextNode('Logo')
        // logo.appendChild(logoText)
        logo.textContent = 'Logo'

        // form

        var form = document.createElement('form')
        container.appendChild(form)

        // name

        var formNameLabel = document.createElement('label')
        form.appendChild(formNameLabel)

        // var formNameLabelText = document.createTextNode('Name')
        // formNameLabel.appendChild(formNameLabelText)
        formNameLabel.textContent = 'Name'

        var formNameInput = document.createElement('input')
        form.appendChild(formNameInput)

        // email

        var formEmailLabel = document.createElement('label')
        form.appendChild(formEmailLabel)

        // var formEmailLabelText = document.createTextNode('E-mail')
        // formEmailLabel.appendChild(formEmailLabelText)
        formEmailLabel.textContent = 'E-mail'

        var formEmailInput = document.createElement('input')
        form.appendChild(formEmailInput)

        // username

        var formUsernameLabel = document.createElement('label')
        form.appendChild(formUsernameLabel)

        // var formUsernameLabelText = document.createTextNode('Username')
        // formUsernameLabel.appendChild(formUsernameLabelText)
        formUsernameLabel.textContent = 'Username'

        var formUsernameInput = document.createElement('input')
        form.appendChild(formUsernameInput)

        // password

        var formPasswordLabel = document.createElement('label')
        form.appendChild(formPasswordLabel)

        // var formPasswordLabelText = document.createTextNode('Password')
        // formPasswordLabel.appendChild(formPasswordLabelText)
        formPasswordLabel.textContent = 'Password'

        var formPasswordInput = document.createElement('input')
        form.appendChild(formPasswordInput)

        // submit

        var formSubmitButton = document.createElement('button')
        form.appendChild(formSubmitButton)

        // var formSubmitButtonText = document.createTextNode('Register')
        // formSubmitButton.appendChild(formSubmitButtonText)
        formSubmitButton.textContent = 'Register'

        // anchor

        var loginAnchor = document.createElement('a')
        container.appendChild(loginAnchor)

        // var loginAnchorText = document.createTextNode('Login')
        // loginAnchor.appendChild(loginAnchorText)
        loginAnchor.textContent = 'Login'
    }
}

/* login */

var login = {
    mount: function () {
        var container = document.createElement('div')
        // document.body.appendChild(container)

        var logo = document.createElement('h1')
        container.appendChild(logo)

        // var logoText = document.createTextNode('Logo')
        // logo.appendChild(logoText)
        logo.textContent = 'Logo'

        // form

        var form = document.createElement('form')
        container.appendChild(form)

        // username

        var formUsernameLabel = document.createElement('label')
        form.appendChild(formUsernameLabel)

        // var formUsernameLabelText = document.createTextNode('Username')
        // formUsernameLabel.appendChild(formUsernameLabelText)
        formUsernameLabel.textContent = 'Username'

        var formUsernameInput = document.createElement('input')
        form.appendChild(formUsernameInput)

        // password

        var formPasswordLabel = document.createElement('label')
        form.appendChild(formPasswordLabel)

        // var formPasswordLabelText = document.createTextNode('Password')
        // formPasswordLabel.appendChild(formPasswordLabelText)
        formPasswordLabel.textContent = 'Password'

        var formPasswordInput = document.createElement('input')
        form.appendChild(formPasswordInput)

        // submit

        var formSubmitButton = document.createElement('button')
        form.appendChild(formSubmitButton)

        // var formSubmitButtonText = document.createTextNode('Login')
        // formSubmitButton.appendChild(formSubmitButtonText)
        formSubmitButton.textContent = 'Login'

        // anchor

        var registerAnchor = document.createElement('a')
        container.appendChild(registerAnchor)

        // var registerAnchorText = document.createTextNode('Register')
        // registerAnchor.appendChild(registerAnchorText)
        registerAnchor.textContent = 'Register'
    }
}



/* home */

var home = {
    mount: function () {
        var container = document.createElement('div')
        // document.body.appendChild(container)

        var logo = document.createElement('h1')
        container.appendChild(logo)

        //var logoText = new Text('Logo')
        // var logoText = document.createTextNode('Logo')
        // logo.appendChild(logoText)
        logo.textContent = 'Logo'
    }
}