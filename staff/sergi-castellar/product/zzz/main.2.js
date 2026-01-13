console.clear()
console.log('Hello,App!')

// component constuctor

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
    inputForm.style.display = 'flex'
    inputForm.style.flexDirection = 'column'
    this.container.appendChild(inputForm)
    
    // name input
    var nameLabel = document.createElement('label')
    nameLabel.htmlFor = 'register-name'
    nameLabel.innerText = 'Name'
    inputForm.appendChild(nameLabel)
    
    var nameInput = document.createElement('input')
    nameInput.id = 'register-name'
    nameInput.style.width = '300px'
    inputForm.appendChild(nameInput)
    
    // e-mail input
    var emailLabel = document.createElement('label')
    emailLabel.htmlFor = 'register-email'
    emailLabel.innerText = 'E-mail'
    inputForm.appendChild(emailLabel)
    
    var emailInput = document.createElement('input')
    emailInput.id = 'register-email'
    emailInput.style.width = '300px'
    inputForm.appendChild(emailInput)
    
    // username input
    var usernameLabel = document.createElement('label')
    usernameLabel.htmlFor = 'register-username'
    usernameLabel.innerText = 'Username'
    inputForm.appendChild(usernameLabel)
    
    var usernameInput = document.createElement('input')
    usernameInput.id = 'register-username'
    usernameInput.style.width = '300px'
    inputForm.appendChild(usernameInput)
    
    // password input
    var passwordLabel = document.createElement('label')
    passwordLabel.htmlFor = 'register-password'
    passwordLabel.innerText = 'Password'
    inputForm.appendChild(passwordLabel)
    
    var passwordInput = document.createElement('input')
    passwordInput.id = 'register-password'
    passwordInput.style.width = '300px'
    inputForm.appendChild(passwordInput)
    
    // div del login y del register
    var loginAndRegister = document.createElement('div') // div login register
    loginAndRegister.style.width = '310px'
    loginAndRegister.style.marginTop = '15px'
    loginAndRegister.style.display = 'flex'
    loginAndRegister.style.justifyContent = 'space-between'
    this.container.appendChild(loginAndRegister)
    
    var loginAnchor = document.createElement('a') // anchor login
    loginAnchor.innerText = 'Login'
    loginAnchor.addEventListener('click', function() {
            document.body.removeChild(this.container)
            document.body.appendChild(login.container)
    }.bind(this))
    loginAndRegister.appendChild(loginAnchor)
    
    var registerButton = document.createElement('button') // boton register
    registerButton.innerText = 'Register'
    registerButton.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(home.container)
    }.bind(this))
    loginAndRegister.appendChild(registerButton)
}

//////// Login

var login = new Component(document.createElement('div'))
login.mount = function() {
    var logo = document.createElement('h1') // logo de login
    logo.innerText = 'Logo'
    this.container.appendChild(logo)
    
    var inputForm = document.createElement('form') // div form de los inputs de login
    inputForm.style.display = 'flex'
    inputForm.style.flexDirection = 'column'
    this.container.appendChild(inputForm)
    
    /// username input
    var usernameLabel = document.createElement('label')
    usernameLabel.htmlFor = 'login-username'
    usernameLabel.innerText = 'Username'
    inputForm.appendChild(usernameLabel)
    
    var usernameInput = document.createElement('input')
    usernameInput.id = 'login-username'
    usernameInput.style.width = '300px'
    inputForm.appendChild(usernameInput)
    
    // password input
    var passwordLabel = document.createElement('label')
    passwordLabel.htmlFor = 'login-password'
    passwordLabel.innerText = 'Password'
    inputForm.appendChild(passwordLabel)
    
    var passwordInput = document.createElement('input')
    passwordInput.id = 'login-password'
    passwordInput.style.width = '300px'
    inputForm.appendChild(passwordInput)
    
    // div del register y del login
    
    var registerAndLogin = document.createElement('div') // div register login
    registerAndLogin.style.width = '310px'
    registerAndLogin.style.marginTop = '15px'
    registerAndLogin.style.display = 'flex'
    registerAndLogin.style.justifyContent = 'space-between'
    this.container.appendChild(registerAndLogin)
    
    var registerAnchor = document.createElement('a') // anchor register
    registerAnchor.innerText = 'Register'
    registerAnchor.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    registerAndLogin.appendChild(registerAnchor)
    
    
    var loginButton = document.createElement('button') // boton login
    loginButton.innerText = 'Login'
    loginButton.addEventListener('click', function() {
        document.body.removeChild(this.container)
        document.body.appendChild(home.container)
    }.bind(this))
    registerAndLogin.appendChild(loginButton)
}



//////// Home

var home = new Component(document.createElement('div'))
home.mount = function() {
    document.body.appendChild(this.container) // provisional!!!!!!!!!!!!!!!!!!!!!!!

    // estilos css
    home.container.style.width = '500px'
    home.container.style.textAlign = 'justify'
    //

    var logo = document.createElement('h1') // logo de login
    logo.innerText = 'Logo'
    this.container.appendChild(logo)
    
    var postArticleDiv = document.createElement('article')
    postArticleDiv.style.display = 'flex'
    postArticleDiv.style.flexDirection = 'column'
    this.container.appendChild(postArticleDiv)
    
    // post 1
    
    var firstPostDiv = document.createElement('article')
    postArticleDiv.appendChild(firstPostDiv)
    
    var firstPostHeader = document.createElement('header')
    firstPostDiv.appendChild(firstPostHeader)
    
    var firstPostTitle = document.createElement('h2')
    firstPostTitle.innerText = 'Post 1 Title'
    firstPostHeader.appendChild(firstPostTitle)
    
    var firstPostFigure = document.createElement('figure')
    firstPostDiv.appendChild(firstPostFigure)
    
    var firstPostImage = document.createElement('img')
    firstPostImage.src = '1.jpg'
    firstPostFigure.appendChild(firstPostImage)
    firstPostImage.style.width = '300px'
    
    var firstPostFooter = document.createElement('footer')
    firstPostDiv.appendChild(firstPostFooter)
    
    var firstPostFooterSection = document.createElement('section')
    firstPostFooter.appendChild(firstPostFooterSection)
    
    var firstPostFooterSectionFirstA = document.createElement('a')
    firstPostFooterSectionFirstA.innerText = '♥'
    firstPostFooterSectionFirstA.style.fontSize = '200%'
    firstPostFooterSection.appendChild(firstPostFooterSectionFirstA)
    
    var firstPostDescriptionText = document.createElement('p')
    firstPostDescriptionText.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime quibusdam officia adipisci dolor ducimus inventore numquam expedita reprehenderit, quaerat sit quam tempore laboriosam fuga eaque, eius consectetur totam eligendi rerum ad in praesentium excepturi. Non velit perferendis blanditiis dignissimos.'
    firstPostFooter.appendChild(firstPostDescriptionText)
    
    // post 2
    
    var secondPostDiv = document.createElement('article')
    postArticleDiv.appendChild(secondPostDiv)
    
    var secondPostHeader = document.createElement('header')
    secondPostDiv.appendChild(secondPostHeader)
    
    var secondPostTitle = document.createElement('h2')
    secondPostTitle.innerText = 'Post 2 Title'
    secondPostHeader.appendChild(secondPostTitle)
    
    var secondPostFigure = document.createElement('figure')
    secondPostDiv.appendChild(secondPostFigure)
    
    var secondPostImage = document.createElement('img')
    secondPostImage.src = '2.jpg'
    secondPostFigure.appendChild(secondPostImage)
    secondPostImage.style.width = '300px'
    
    var secondPostFooter = document.createElement('footer')
    secondPostDiv.appendChild(secondPostFooter)
    
    var secondPostFooterSection = document.createElement('section')
    secondPostFooter.appendChild(secondPostFooterSection)
    
    var secondPostFooterSectionFirstA = document.createElement('a')
    secondPostFooterSectionFirstA.innerText = '♥'
    secondPostFooterSectionFirstA.style.fontSize = '200%'
    secondPostFooterSection.appendChild(secondPostFooterSectionFirstA)
    
    var secondPostDescriptionText = document.createElement('p')
    secondPostDescriptionText.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime quibusdam officia adipisci dolor ducimus inventore numquam expedita reprehenderit, quaerat sit quam tempore laboriosam fuga eaque, eius consectetur totam eligendi rerum ad in praesentium excepturi. Non velit perferendis blanditiis dignissimos.'
    secondPostFooter.appendChild(secondPostDescriptionText)   
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