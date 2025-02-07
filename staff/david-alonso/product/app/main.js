console.clear()
console.log('Hello, App!')

// ****  LANDING
var landing = {
    mount: function () {

        var container = document.createElement('div')
        landing.container = container
        document.body.appendChild(container)

        var logo = document.createElement('h1')
        logo.textContent = 'Landing'
        container.appendChild(logo)


        // Login
        var loginAnchor = document.createElement('a')
        loginAnchor.textContent = 'Login'
        loginAnchor.style.textDecoration = 'underline'
        loginAnchor.style.fontWeight = 'bold'
        loginAnchor.style.color = 'white'
        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        container.appendChild(loginAnchor)



        // Or
        var OrText = document.createTextNode(' or ')
        container.appendChild(OrText)

        // Register
        var registerAnchor = document.createElement('a')
        registerAnchor.textContent = 'Register'
        registerAnchor.style.textDecoration = 'underline'
        registerAnchor.style.fontWeight = 'bold'
        registerAnchor.style.color = 'white'
        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })
        container.appendChild(registerAnchor)


    }
}


// ****  REGISTER
var register = {
    mount: function () {

        var container = document.createElement('div')
        register.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Register'
        container.appendChild(logo)

        // Form
        var form = document.createElement('form')
        container.appendChild(form)

        var nameLabel = document.createElement('label')
        nameLabel.textContent = 'Name'
        form.appendChild(nameLabel)

        form.appendChild(document.createElement('br'))
        // Formulario 
        var nameInput = document.createElement('input')
        form.appendChild(nameInput)
        // Espacio
        form.appendChild(document.createElement('br'))

        // Email 
        var emailLabel = document.createElement('label')
        emailLabel.textContent = 'E-mail'
        form.appendChild(emailLabel)

        form.appendChild(document.createElement('br'))

        var emailInput = document.createElement('input')
        form.appendChild(emailInput)

        form.appendChild(document.createElement('br'))

        // Username 
        var usernameLabel = document.createElement('label')
        usernameLabel.textContent = 'Username'
        form.appendChild(usernameLabel)

        form.appendChild(document.createElement('br'))

        var usernameInput = document.createElement('input')
        form.appendChild(usernameInput)

        form.appendChild(document.createElement('br'))

        // Password
        var passwordLabel = document.createElement('label')
        passwordLabel.textContent = 'Password'
        form.appendChild(passwordLabel)

        form.appendChild(document.createElement('br'))

        var passwordInput = document.createElement('input')
        form.appendChild(passwordInput)

        form.appendChild(document.createElement('br'))
        form.appendChild(document.createElement('br'))

        // Login
        var loginAnchor = document.createElement('a')
        loginAnchor.textContent = 'Login'
        loginAnchor.style.textDecoration = 'underline'
        loginAnchor.style.fontWeight = 'bold'
        loginAnchor.style.color = 'white'
        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(login.container)
        })
        form.appendChild(loginAnchor)



        // Button - Register
        var submitButton = document.createElement('button')
        submitButton.textContent = 'Register'
        submitButton.style.marginLeft = '70px'
        submitButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(home.container)
        })
        form.appendChild(submitButton)

        // ------------

    }
}

// ****  LOGIN
var login = {
    mount: function () {

        var container = document.createElement('div')
        login.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Login'
        container.appendChild(logo)

        // Form
        var form = document.createElement('form')
        container.appendChild(form)

        // Username 
        var usernameLabel = document.createElement('label')
        usernameLabel.textContent = 'Username'
        form.appendChild(usernameLabel)

        form.appendChild(document.createElement('br'))

        var usernameInput = document.createElement('input')
        form.appendChild(usernameInput)

        form.appendChild(document.createElement('br'))

        // Password
        var passwordLabel = document.createElement('label')
        passwordLabel.textContent = 'Password'
        form.appendChild(passwordLabel)

        form.appendChild(document.createElement('br'))

        var passwordInput = document.createElement('input')
        form.appendChild(passwordInput)

        form.appendChild(document.createElement('br'))
        form.appendChild(document.createElement('br'))

        // Button Login
        var submitButton = document.createElement('button')
        submitButton.textContent = 'Login'
        submitButton.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(home.container)
        })
        form.appendChild(submitButton)

        // // Register
        var loginAnchor = document.createElement('a')
        loginAnchor.textContent = 'Register'
        loginAnchor.style.textDecoration = 'underline'
        loginAnchor.style.fontWeight = 'bold'
        loginAnchor.style.color = 'white'
        loginAnchor.style.marginLeft = '70px'
        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(container)
            document.body.appendChild(register.container)
        })
        form.appendChild(loginAnchor)
    }
}

// ****  HOME 
var home = {
    mount: function () {
        var container = document.createElement('div')
        home.container = container

        var logo = document.createElement('h1')
        logo.textContent = 'Home'
        container.appendChild(logo)

        // Form
        var form = document.createElement('form')

        container.appendChild(form)

        // Imagenes
        var news1 = document.createElement('img')
        news1.src = 'https://i.pinimg.com/236x/ff/a1/22/ffa122f36bffb392661c0de948475635.jpg'
        news1.style.width = '90%'
        news1.style.height = 'auto'
        news1.style.margin = 'auto'
        news1.style.marginBlock = '20px'
        news1.style.borderRadius = '10%'
        news1.style.border = '5px solid'
        container.appendChild(news1)

        var news2 = document.createElement('img')
        news2.src = 'https://i.pinimg.com/564x/bd/68/af/bd68af256a4c6fd0ada2f60183e88f39.jpg'
        news2.style.width = '90%'
        news2.style.height = 'auto'
        news2.style.margin = 'auto'
        news2.style.marginBlock = '20px'
        news2.style.borderRadius = '10%'
        news2.style.border = '5px solid'
        container.appendChild(news2)

        var news3 = document.createElement('img')
        news3.src = 'https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D179581354W8333H10000/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/programador-informatico-codificadores-software-burger-lovers.jpg'
        news3.style.width = '90%'
        news3.style.height = 'auto'
        news3.style.margin = 'auto'
        news3.style.marginBlock = '20px'
        news3.style.borderRadius = '10%'
        news3.style.border = '5px solid'
        container.appendChild(news3)
    }
}

landing.mount()
register.mount()
login.mount()
home.mount()

// // ... 