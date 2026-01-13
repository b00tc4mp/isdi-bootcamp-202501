console.clear()

// Component

function Component(container) {
    this.container = container
}

// ****  LANDING

var landing = new Component(document.createElement('div'))
landing.mount = function () {
    document.body.appendChild(this.container)

    var logo = document.createElement('h1')
    logo.textContent = 'Landing'
    logo.style.color = 'white'
    logo.style.textShadow = '0.1em 0.1em #333'
    this.container.appendChild(logo)

    // Login
    var loginAnchor = document.createElement('a')
    loginAnchor.textContent = 'Login'
    loginAnchor.style.textDecoration = 'underline'
    loginAnchor.style.fontWeight = 'bold'
    loginAnchor.style.color = 'white'
    loginAnchor.style.marginInlineEnd = '10px'
    loginAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.container.appendChild(loginAnchor)

    // Or
    var OrText = document.createTextNode(' or ')
    this.container.appendChild(OrText)

    // Register
    var registerAnchor = document.createElement('a')
    registerAnchor.textContent = 'Register'
    registerAnchor.style.textDecoration = 'underline'
    registerAnchor.style.fontWeight = 'bold'
    registerAnchor.style.color = 'white'
    registerAnchor.style.marginInlineStart = '40px'
    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.container.appendChild(registerAnchor)
}


// ****  REGISTER

var register = new Component(document.createElement('div'))
register.mount = function () {

    var logo = document.createElement('h1')
    logo.textContent = 'Register'
    logo.style.color = 'white'
    logo.style.textShadow = '0.1em 0.1em #333'
    this.container.appendChild(logo)

    // Form
    var form = document.createElement('form')
    this.container.appendChild(form)

    // Name 
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
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    form.appendChild(loginAnchor)

    // Button - Register
    var submitButton = document.createElement('button')
    submitButton.textContent = 'Register'
    submitButton.style.marginLeft = '70px'
    submitButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    form.appendChild(submitButton)
}

// ****  LOGIN

var login = new Component(document.createElement('div'))
login.mount = function () {

    var logo = document.createElement('h1')
    logo.textContent = 'Login'
    logo.style.color = 'white'
    logo.style.textShadow = '0.1em 0.1em #333'
    this.container.appendChild(logo)

    // Form
    var form = document.createElement('form')
    // form.style.color = 'white'
    this.container.appendChild(form)

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
        document.body.removeChild(this.container)
        document.body.appendChild(home.container)
    }.bind(this))
    form.appendChild(submitButton)

    // // Register
    var registerAnchor = document.createElement('a')
    registerAnchor.textContent = 'Register'
    registerAnchor.style.textDecoration = 'underline'
    registerAnchor.style.fontWeight = 'bold'
    registerAnchor.style.color = 'white'
    registerAnchor.style.marginLeft = '70px'
    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    form.appendChild(registerAnchor)
}

// ****  HOME 

var home = new Component(document.createElement('div'))
home.mount = function () {

    var logo = document.createElement('h1')
    logo.textContent = 'Home'
    logo.style.color = 'white'
    logo.style.textShadow = '0.1em 0.1em #333'
    this.container.appendChild(logo)

    // Form
    var form = document.createElement('form')
    this.container.appendChild(form)

    // Imagenes
    var coment = document.createElement('h3')
    coment.textContent = 'Winnie the Pooh Junior vs Senior'
    coment.style.textDecoration = 'underline'
    this.container.appendChild(coment)

    var news1 = document.createElement('img')
    news1.src = 'https://i.pinimg.com/236x/ff/a1/22/ffa122f36bffb392661c0de948475635.jpg'
    news1.style.width = '70%'
    news1.style.height = 'auto'
    news1.style.margin = 'auto'
    news1.style.marginBlock = '20px'
    news1.style.borderRadius = '10%'
    news1.style.border = '5px solid'
    this.container.appendChild(news1)

    var coment = document.createElement('h3')
    coment.textContent = 'SpongeBob in his first programming class'
    coment.style.textDecoration = 'underline'
    this.container.appendChild(coment)

    var news2 = document.createElement('img')
    news2.src = 'https://i.pinimg.com/564x/bd/68/af/bd68af256a4c6fd0ada2f60183e88f39.jpg'
    news2.style.width = '70%'
    news2.style.height = 'auto'
    news2.style.margin = 'auto'
    news2.style.marginBlock = '20px'
    news2.style.borderRadius = '10%'
    news2.style.border = '5px solid'
    this.container.appendChild(news2)

    var coment = document.createElement('h3')
    coment.textContent = 'The Full-Stack hamburger'
    coment.style.textDecoration = 'underline'
    this.container.appendChild(coment)

    var news3 = document.createElement('img')
    news3.src = 'https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D179581354W8333H10000/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/programador-informatico-codificadores-software-burger-lovers.jpg'
    news3.style.width = '70%'
    news3.style.height = 'auto'
    news3.style.margin = 'auto'
    news3.style.marginBlock = '20px'
    news3.style.borderRadius = '10%'
    news3.style.border = '5px solid'
    this.container.appendChild(news3)
}

landing.mount()
register.mount()
login.mount()
home.mount()
