console.clear()

// LANDING

var Component = function (container) {
    this.container = container
}

var landing = new Component(document.createElement('div'))
landing.mount = function () {
    document.body.appendChild(this.container)

    var logo = document.createElement('h1')
    logo.innerText = 'Logo'
    this.container.appendChild(logo)

    var registerAnchor = document.createElement('a')
    registerAnchor.innerText = 'Register'
    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.container.appendChild(registerAnchor)

    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    var loginAnchor = document.createElement('a')
    loginAnchor.innerText = 'Login'
    loginAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.container.appendChild(loginAnchor)
}

// REGISTER

var register = new Component(document.createElement('div'))
register.mount = function () {
    // document.body.appendChild(this.container)

    var logo = document.createElement('h1')
    logo.innerText = 'Logo'
    this.container.appendChild(logo)

    var form = document.createElement('form')
    form.style.display = 'flex'
    form.style.flexDirection = 'column'
    form.style.gap = '0.2rem'
    form.style.width = '200px'
    this.container.appendChild(form)

    form.addEventListener('submit', function (event) {
        event.preventDefault()
        console.log('register submit')

        var name = nameInput.value
        var email = emailInput.value
        var username = usernameInput.value
        var password = passwordInput.value

        console.log(name, email, username, password)
    }.bind(this))

    var nameLabel = document.createElement('label')
    nameLabel.innerText = 'Name'
    form.appendChild(nameLabel)

    var nameInput = document.createElement('input')
    form.appendChild(nameInput)

    var emailLabel = document.createElement('label')
    emailLabel.innerText = 'E-mail'
    form.appendChild(emailLabel)

    var emailInput = document.createElement('input')
    form.appendChild(emailInput)

    var usernameLabel = document.createElement('label')
    usernameLabel.innerText = 'Username'
    form.appendChild(usernameLabel)

    var usernameInput = document.createElement('input')
    form.appendChild(usernameInput)

    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'Password'
    form.appendChild(passwordLabel)

    var passwordInput = document.createElement('input')
    form.appendChild(passwordInput)

    var registerButton = document.createElement('button')
    registerButton.type = 'submit'
    registerButton.innerText = 'Register'
    registerButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    form.appendChild(registerButton)

    var loginAnchor = document.createElement('a')
    loginAnchor.innerText = 'Login'
    loginAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.container.appendChild(loginAnchor)
}

// LOGIN

var login = new Component(document.createElement('div'))
login.mount = function () {

    var logo = document.createElement('h1')
    logo.innerText = 'Logo'
    this.container.appendChild(logo)

    var form = document.createElement('form')
    form.style.display = 'flex'
    form.style.flexDirection = 'column'
    form.style.width = '200px'
    form.style.gap = '0.2rem'
    this.container.appendChild(form)

    var usernameLabel = document.createElement('label')
    usernameLabel.innerText = 'Username'
    form.appendChild(usernameLabel)

    var usernameInput = document.createElement('input')
    form.appendChild(usernameInput)

    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'Password'
    form.appendChild(passwordLabel)

    var passwordInput = document.createElement('input')
    form.appendChild(passwordInput)

    var loginButton = document.createElement('button')
    loginButton.innerText = 'Login'
    loginButton.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(home.container)
    }.bind(this))
    form.appendChild(loginButton)

    var registerAnchor = document.createElement('a')
    registerAnchor.innerText = 'Register'
    registerAnchor.addEventListener('click', function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.container.appendChild(registerAnchor)
}

// HOME

var home = new Component(document.createElement('div'))
home.mount = function () {
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'column'
    this.container.style.gap = '0.5rem'

    var logo = document.createElement('h1')
    logo.innerText = 'Logo'
    this.container.appendChild(logo)

    // ARTICLE 1

    var article1 = document.createElement('article')
    article1.style.display = 'flex'
    article1.style.flexDirection = 'column'
    article1.style.width = '200px'
    article1.style.gap = '0.3rem'
    this.container.appendChild(article1)

    var article1Username = document.createElement('h3')
    article1Username.innerText = 'username1'
    article1.appendChild(article1Username)

    var article1Picture = document.createElement('img')
    article1Picture.src = 'https://t4.ftcdn.net/jpg/09/02/37/89/240_F_902378980_u4sL7oSE5RB3fTlgJnCyscPoH6lrF4uy.jpg'
    article1Picture.width = '200'
    article1.appendChild(article1Picture)

    var article1Caption = document.createElement('span')
    article1Caption.style.display = 'flex'
    article1Caption.style.width = '200px'
    article1Caption.style.justifyContent = 'space-between'
    article1Caption.textContent = 'Caption'
    article1.appendChild(article1Caption)

    var article1LikeButton = document.createElement('button')
    article1LikeButton.innerText = '🤍'
    var article1buttonStatus = false
    article1LikeButton.addEventListener('click', function () {
        if (!article1buttonStatus) {
            article1buttonStatus = true
            article1LikeButton.innerText = '❤️'
        } else {
            article1buttonStatus = false
            article1LikeButton.innerText = '🤍'
        }
    }.bind(this))
    article1Caption.appendChild(article1LikeButton)

    var article1Date = document.createTextNode('3 weeks ago')
    article1.appendChild(article1Date)

    // ARTICLE 2

    var article2 = document.createElement('article')
    article2.style.display = 'flex'
    article2.style.flexDirection = 'column'
    article2.style.gap = '0.3rem'
    article2.style.width = '200px'
    this.container.appendChild(article2)

    var article2Username = document.createElement('h3')
    article2Username.innerText = 'username2'
    article2.appendChild(article2Username)

    var article2Picture = document.createElement('img')
    article2Picture.src = 'https://imgs.search.brave.com/sZjKUhOvtfY9crCnDhxXV0l62Y1j-6MOfn3qjktlfr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0Lzk4LzM0/LzM2MF9GXzI5NDk4/MzQ4NF9uZEx2eDZa/bkRManJQckFGSjJy/NDNlSVVUNk5HZkxu/SS5qcGc'
    article2Picture.width = '200'
    article2.appendChild(article2Picture)

    // SPAN CAPTION & BUTTON

    var article2Caption = document.createElement('span')
    article2Caption.style.display = 'flex'
    article2Caption.style.justifyContent = 'space-between'
    article2Caption.style.width = '200px'
    article2Caption.textContent = 'Caption'
    article2.appendChild(article2Caption)

    var article2CaptionLikeButton = document.createElement('button')
    article2CaptionLikeButton.innerText = '🤍'
    var article2buttonStatus = false
    article2CaptionLikeButton.addEventListener('click', function () {
        if (!article2buttonStatus) {
            article2buttonStatus = true
            article2CaptionLikeButton.innerText = '❤️'
        } else {
            article2buttonStatus = false
            article2CaptionLikeButton.innerText = '🤍'
        }
    }.bind(this))
    article2Caption.appendChild(article2CaptionLikeButton)

    var article2Date = document.createTextNode('3 weeks ago')
    article2.appendChild(article2Date)

    // ARTICLE 3

    var article3 = document.createElement('article')
    article3.style.display = 'flex'
    article3.style.flexDirection = 'column'
    article3.style.gap = '0.3rem'
    article3.style.width = '200px'
    this.container.appendChild(article3)

    var article3Username = document.createElement('h3')
    article3Username.innerText = 'username3'
    article3.appendChild(article3Username)

    var article3Picture = document.createElement('img')
    article3Picture.src = 'https://t4.ftcdn.net/jpg/10/28/90/93/240_F_1028909330_gJNTy01sKzbYo0umWlGa1e5oiWHkJxB9.jpg'
    article3Picture.width = '200'
    article3.appendChild(article3Picture)

    var article3Caption = document.createElement('span')
    article3Caption.style.display = 'flex'
    article3Caption.style.width = '200px'
    article3Caption.style.justifyContent = 'space-between'
    article3Caption.textContent = 'Caption'
    article3.appendChild(article3Caption)

    var article3CaptionLikeButton = document.createElement('button')
    article3CaptionLikeButton.innerText = '🤍'
    var article3buttonStatus = false
    article3CaptionLikeButton.addEventListener('click', function () {
        if (!article3buttonStatus) {
            article3buttonStatus = true
            article3CaptionLikeButton.innerText = '❤️'
        } else {
            article3buttonStatus = false
            article3CaptionLikeButton.innerText = '🤍'
        }
    }.bind(this))
    article3Caption.appendChild(article3CaptionLikeButton)

    var article3Date = document.createTextNode('4 weeks ago')
    article3.appendChild(article3Date)

    // ARTICLE 4

    var article4 = document.createElement('article')
    article4.style.display = 'flex'
    article4.style.flexDirection = 'column'
    article4.style.width = '200px'
    article4.style.gap = '0.3rem'
    this.container.appendChild(article4)

    var article4Username = document.createElement('h3')
    article4Username.innerText = 'username4'
    article4.appendChild(article4Username)

    var article4Picture = document.createElement('img')
    article4Picture.src = 'https://t3.ftcdn.net/jpg/08/69/02/92/240_F_869029213_2y0i0t5Y6nZmb62r2pMp6vGfObRkcTVR.jpg'
    article4Picture.width = '200'
    article4.appendChild(article4Picture)

    var article4Caption = document.createElement('span')
    article4Caption.style.display = 'flex'
    article4Caption.style.width = '200px'
    article4Caption.style.justifyContent = 'space-between'
    article4Caption.textContent = 'Caption'
    article4.appendChild(article4Caption)

    var article4CaptionLikeButton = document.createElement('button')
    article4CaptionLikeButton.innerText = '🤍'
    var article4buttonStatus = false
    article4CaptionLikeButton.addEventListener('click', function () {
        if (!article4buttonStatus) {
            article4buttonStatus = true
            article4CaptionLikeButton.innerText = '❤️'
        } else {
            article4buttonStatus = false
            article4CaptionLikeButton.innerText = '🤍'
        }
    }.bind(this))
    article4Caption.appendChild(article4CaptionLikeButton)

    var article4Date = document.createTextNode('4 weeks ago')
    article4.appendChild(article4Date)
}

landing.mount()
register.mount()
login.mount()
home.mount()
