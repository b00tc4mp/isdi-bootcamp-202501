console.clear()
console.log('Hello,App!')

// constuctors

function Component(container) {
    this.container = container
}





//////// Landing
var landing = new Component(document.createElement('div'))
landing.mount = function() {
    document.body.appendChild(this.container)
    
    var logo = document.createElement('h1')
    logo.innerText = 'Logo'
    this.container.appendChild(logo)
    
    // container register or login
    
    var registerOrLogin = document.createElement('div')
    this.container.appendChild(registerOrLogin)
    
    var registerAnchor = document.createElement('a')
    registerAnchor.innerText = 'Register'
    registerAnchor.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    registerOrLogin.appendChild(registerAnchor)
    
    var orText = document.createTextNode(' or ')
    registerOrLogin.appendChild(orText)
    
    var loginAnchor = document.createElement('a')
    loginAnchor.innerText = 'Login'
    loginAnchor.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    registerOrLogin.appendChild(loginAnchor)
}

//////// Register

var register = new Component(document.createElement('div'))
register.mount = function() {
    var logo = document.createElement('h1') // logo de register
    logo.innerText = 'Logo'
    this.container.appendChild(logo)
    
    var inputForm = document.createElement('form') // div form de los inputs de register
    inputForm.id = 'register-form'
    inputForm.style.display = 'flex'
    inputForm.style.flexDirection = 'column'
    inputForm.addEventListener('submit', function(event) {
        event.preventDefault()
        
        var name = nameInput.value
        var email = emailInput.value
        var username = usernameInput.value
        var password = passwordInput.value
    
        alert(name + email + username + password)
        console.log(name, email, username, password)

        document.body.removeChild(this.container)
        document.body.appendChild(home.container)
    }.bind(this))
    this.container.appendChild(inputForm)
    
    // name input
    var nameLabel = document.createElement('label')
    nameLabel.htmlFor = 'register-name'
    nameLabel.innerText = 'Name'
    inputForm.appendChild(nameLabel)
    
    var nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.id = 'register-name'
    nameInput.style.width = '300px'
    inputForm.appendChild(nameInput)
    
    // e-mail input
    var emailLabel = document.createElement('label')
    emailLabel.htmlFor = 'register-email'
    emailLabel.innerText = 'E-mail'
    inputForm.appendChild(emailLabel)
    
    var emailInput = document.createElement('input')
    emailInput.type = 'text'
    emailInput.id = 'register-email'
    emailInput.style.width = '300px'
    inputForm.appendChild(emailInput)
    
    // username input
    var usernameLabel = document.createElement('label')
    usernameLabel.htmlFor = 'register-username'
    usernameLabel.innerText = 'Username'
    inputForm.appendChild(usernameLabel)
    
    var usernameInput = document.createElement('input')
    usernameInput.type = 'text'
    usernameInput.id = 'register-username'
    usernameInput.style.width = '300px'
    inputForm.appendChild(usernameInput)
    
    // password input
    var passwordLabel = document.createElement('label')
    passwordLabel.htmlFor = 'register-password'
    passwordLabel.innerText = 'Password'
    inputForm.appendChild(passwordLabel)
    
    var passwordInput = document.createElement('input')
    passwordInput.type = 'password'
    passwordInput.id = 'register-password'
    passwordInput.style.width = '300px'
    inputForm.appendChild(passwordInput)

    // div del login y del register
    var loginAndRegister = document.createElement('div') // div login register
    loginAndRegister.style.width = '310px'
    loginAndRegister.style.marginTop = '15px'
    loginAndRegister.style.display = 'flex'
    loginAndRegister.style.justifyContent = 'space-between'
    inputForm.appendChild(loginAndRegister)

    // BOTONES
    
    var loginAnchor = document.createElement('a') // anchor login
    loginAnchor.innerText = 'Login'
    loginAnchor.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    loginAndRegister.appendChild(loginAnchor)
    
    var registerButton = document.createElement('button') // boton register
    registerButton.type = 'submit'
    registerButton.form = 'register-form'
    registerButton.innerText = 'Register'
    loginAndRegister.appendChild(registerButton)
}

//////// Login

var login = new Component(document.createElement('div'))
login.mount = function() {
    var logo = document.createElement('h1') // logo de login
    logo.innerText = 'Logo'
    this.container.appendChild(logo)
    
    var inputForm = document.createElement('form') // div form de los inputs de login
    inputForm.id = 'login-form'
    inputForm.style.display = 'flex'
    inputForm.style.flexDirection = 'column'
    inputForm.addEventListener('submit', function(event) {
        event.preventDefault()

        var username = usernameInput.value
        var password = passwordInput.value

        alert(username + password)
        console.log(username, password)

        document.body.removeChild(this.container)
        document.body.appendChild(home.container)
    }.bind(this))
    this.container.appendChild(inputForm)
    
    /// username input
    var usernameLabel = document.createElement('label')
    usernameLabel.htmlFor = 'login-username'
    usernameLabel.innerText = 'Username'
    inputForm.appendChild(usernameLabel)
    
    var usernameInput = document.createElement('input')
    usernameInput.type = 'text'
    usernameInput.id = 'login-username'
    usernameInput.style.width = '300px'
    inputForm.appendChild(usernameInput)
    
    // password input
    var passwordLabel = document.createElement('label')
    passwordLabel.htmlFor = 'login-password'
    passwordLabel.innerText = 'Password'
    inputForm.appendChild(passwordLabel)
    
    var passwordInput = document.createElement('input')
    passwordInput.type = 'password'
    passwordInput.id = 'login-password'
    passwordInput.style.width = '300px'
    inputForm.appendChild(passwordInput)

    // div del register y del login
    
    var registerAndLogin = document.createElement('div') // div register login
    registerAndLogin.style.width = '310px'
    registerAndLogin.style.marginTop = '15px'
    registerAndLogin.style.display = 'flex'
    registerAndLogin.style.justifyContent = 'space-between'
    inputForm.appendChild(registerAndLogin)
    
    // BOTONES
    
    var registerAnchor = document.createElement('a') // anchor register
    registerAnchor.innerText = 'Register'
    registerAnchor.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    registerAndLogin.appendChild(registerAnchor)

    var loginButton = document.createElement('button') // boton login
    loginButton.type = 'submit'
    loginButton.form = 'login-form'
    loginButton.innerText = 'Login'
    registerAndLogin.appendChild(loginButton)
}

//////// Home

var home = new Component(document.createElement('div'))
home.mount = function() {
    document.body.appendChild(this.container) // provisional!!!!!!!!!!!!!!!!!!!!!!!

    var logo = document.createElement('h1') // logo de login
    logo.innerText = 'Logo'
    this.container.appendChild(logo)
    
    var postArticleContainer = document.createElement('article')
    postArticleContainer.style.display = 'flex'
    postArticleContainer.style.flexDirection = 'column'
    postArticleContainer.style.width = '500px'
    postArticleContainer.style.textAlign = 'justify'
    this.container.appendChild(postArticleContainer)
    
    // post 1
    
    var article = document.createElement('article')
    postArticleContainer.appendChild(article)
    
    var header = document.createElement('header')
    article.appendChild(header)
    
    var title = document.createElement('h2')
    title.innerText = 'Post 1 Title'
    header.appendChild(title)
    
    var figure = document.createElement('figure')
    article.appendChild(figure)
    
    var image = document.createElement('img')
    image.src = '1.jpg'
    figure.appendChild(image)
    image.style.width = '300px'
    
    var footer = document.createElement('footer')
    article.appendChild(footer)
    
    var footerSection = document.createElement('section')
    footer.appendChild(footerSection)
    
    var footerSectionButton = document.createElement('button')
    footerSectionButton.innerText = '♥'
    footerSectionButton.style.fontSize = '200%'

    footerSectionButton.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))

    footerSection.appendChild(footerSectionButton)
    
    var descriptionText = document.createElement('p')
    descriptionText.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime quibusdam officia adipisci dolor ducimus inventore numquam expedita reprehenderit, quaerat sit quam tempore laboriosam fuga eaque, eius consectetur totam eligendi rerum ad in praesentium excepturi. Non velit perferendis blanditiis dignissimos.'
    footer.appendChild(descriptionText)
    
     
}

/*
var img2 = document.createElement('img')
img2.src = '2.jpg'
postArticleDiv.appendChild(img2)
img2.style.width = '300px'

var img3 = document.createElement('img')
img3.src = '3.jpg'
postArticleDiv.appendChild(img3)
img3.style.width = '300px'

var img4 = document.createElement('img')
img4.src = '4.jpg'
postArticleDiv.appendChild(img4)
img4.style.width = '300px'

*/

landing.mount()
login.mount()
register.mount()
home.mount()