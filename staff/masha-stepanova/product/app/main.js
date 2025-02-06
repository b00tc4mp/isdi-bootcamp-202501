console.clear()

// LANDING

var Component = function (container) {
    this.container = container
}

var helper = {
    createLogo: function () {
        var logito = document.createElement('h1')
        logito.innerText = 'Logo'
        return logito
    },
    createLikeButton: function () {
        var likeButton = document.createElement('button')
        likeButton.innerText = '🤍'
        likeButtonStatus = false
        likeButton.addEventListener('click', function () {
            likeButton.innerText = likeButton.innerText === '🤍' ? '❤️' : '🤍'
        })

        return likeButton
    },
    createArticle: function () {
        var article = document.createElement('article')
        article.style.display = 'flex'
        article.style.flexDirection = 'column'
        article.style.width = '500px'
        article.style.gap = '0.3rem'

        return article
    },
    createSpan: function () {
        var span = document.createElement('span')
        span.style.display = 'flex'
        span.style.width = '500px'
        span.style.justifyContent = 'space-between'

        return span
    },
    createForm: function () {
        var form = document.createElement('form')
        form.style.display = 'flex'
        form.style.flexDirection = 'column'
        form.style.gap = '0.2rem'
        form.style.width = '500px'

        return form
    },
    createDirectionAnchor: function (innerText, currentDirection, nextDirection) {
        var anchor = document.createElement('a')
        anchor.innerText = innerText
        anchor.style.textDecoration = 'underline'
        anchor.addEventListener('click', function () {
            document.body.removeChild(currentDirection)
            document.body.appendChild(nextDirection)
        }.bind(this))

        return anchor
    },
    createLabel: function (innerText) {
        var label = document.createElement('label')
        label.innerText = innerText
        return label
    },
    createPicture: function (source) {
        var picture = document.createElement('img')
        picture.src = source
        picture.width = '500'

        return picture
    }
}

var landing = new Component(document.createElement('div'))
landing.mount = function () {
    document.body.appendChild(this.container)

    this.container.appendChild(helper.createLogo())

    var registerAnchor = helper.createDirectionAnchor('Register', this.container, register.container)
    this.container.appendChild(registerAnchor)

    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    var loginAnchor = helper.createDirectionAnchor('Login', this.container, login.container)
    this.container.appendChild(loginAnchor)
}

// REGISTER

var register = new Component(document.createElement('div'))
register.mount = function () {
    this.container.appendChild(helper.createLogo())

    var form = helper.createForm()
    this.container.appendChild(form)

    form.addEventListener('submit', function (event) {
        event.preventDefault()
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)

        console.log('register submit')

        var name = nameInput.value
        var email = emailInput.value
        var username = usernameInput.value
        var password = passwordInput.value

        console.log(name, email, username, password)
    }.bind(this))

    var nameLabel = helper.createLabel('Name')
    form.appendChild(nameLabel)

    var nameInput = document.createElement('input')
    form.appendChild(nameInput)

    var emailLabel = helper.createLabel('E-mail')
    form.appendChild(emailLabel)

    var emailInput = document.createElement('input')
    form.appendChild(emailInput)

    var usernameLabel = helper.createLabel('Username')
    form.appendChild(usernameLabel)

    var usernameInput = document.createElement('input')
    form.appendChild(usernameInput)

    var passwordLabel = helper.createLabel('Password')
    form.appendChild(passwordLabel)

    var passwordInput = document.createElement('input')
    form.appendChild(passwordInput)

    var registerButton = document.createElement('button')
    registerButton.type = 'submit'
    registerButton.innerText = 'Register'
    form.appendChild(registerButton)

    var loginAnchor = helper.createDirectionAnchor('Login', this.container, login.container)
    this.container.appendChild(loginAnchor)
}

// LOGIN

var login = new Component(document.createElement('div'))
login.mount = function () {
    this.container.appendChild(helper.createLogo())

    var form = helper.createForm()
    this.container.appendChild(form)

    var usernameLabel = helper.createLabel('Username')
    form.appendChild(usernameLabel)

    var usernameInput = document.createElement('input')
    form.appendChild(usernameInput)

    var passwordLabel = helper.createLabel('Password')
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

    var registerAnchor = helper.createDirectionAnchor('Register', this.container, register.container)
    this.container.appendChild(registerAnchor)
}

// HOME

var home = new Component(document.createElement('div'))
home.mount = function () {
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'column'
    this.container.style.gap = '0.5rem'
    this.container.appendChild(helper.createLogo())

    // ARTICLE 1

    var article1 = helper.createArticle()
    this.container.appendChild(article1)

    var article1Username = document.createElement('h3')
    article1Username.innerText = 'username1'
    article1.appendChild(article1Username)

    var article1Picture = helper.createPicture('https://t4.ftcdn.net/jpg/09/02/37/89/240_F_902378980_u4sL7oSE5RB3fTlgJnCyscPoH6lrF4uy.jpg')
    article1.appendChild(article1Picture)

    var article1Caption = helper.createSpan()
    article1Caption.textContent = 'Caption'
    article1.appendChild(article1Caption)

    article1Caption.appendChild(helper.createLikeButton())

    var article1Date = document.createTextNode('3 weeks ago')
    article1.appendChild(article1Date)

    // ARTICLE 2

    var article2 = helper.createArticle()
    this.container.appendChild(article2)

    var article2Username = document.createElement('h3')
    article2Username.innerText = 'username2'
    article2.appendChild(article2Username)

    var article2Picture = helper.createPicture('https://imgs.search.brave.com/sZjKUhOvtfY9crCnDhxXV0l62Y1j-6MOfn3qjktlfr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0Lzk4LzM0/LzM2MF9GXzI5NDk4/MzQ4NF9uZEx2eDZa/bkRManJQckFGSjJy/NDNlSVVUNk5HZkxu/SS5qcGc')
    article2.appendChild(article2Picture)

    // SPAN CAPTION & BUTTON

    var article2Caption = helper.createSpan()
    article2Caption.textContent = 'Caption'
    article2.appendChild(article2Caption)

    article2Caption.appendChild(helper.createLikeButton())

    var article2Date = document.createTextNode('3 weeks ago')
    article2.appendChild(article2Date)

    // ARTICLE 3

    var article3 = helper.createArticle()
    this.container.appendChild(article3)

    var article3Username = document.createElement('h3')
    article3Username.innerText = 'username3'
    article3.appendChild(article3Username)

    var article3Picture = helper.createPicture('https://t4.ftcdn.net/jpg/10/28/90/93/240_F_1028909330_gJNTy01sKzbYo0umWlGa1e5oiWHkJxB9.jpg')
    article3.appendChild(article3Picture)

    var article3Caption = helper.createSpan()
    article3Caption.textContent = 'Caption'
    article3.appendChild(article3Caption)

    article3Caption.appendChild(helper.createLikeButton())

    var article3Date = document.createTextNode('4 weeks ago')
    article3.appendChild(article3Date)

    // ARTICLE 4

    var article4 = helper.createArticle()
    this.container.appendChild(article4)

    var article4Username = document.createElement('h3')
    article4Username.innerText = 'username4'
    article4.appendChild(article4Username)

    var article4Picture = helper.createPicture('https://t3.ftcdn.net/jpg/08/69/02/92/240_F_869029213_2y0i0t5Y6nZmb62r2pMp6vGfObRkcTVR.jpg')
    article4.appendChild(article4Picture)

    var article4Caption = helper.createSpan()
    article4Caption.textContent = 'Caption'
    article4.appendChild(article4Caption)

    article4Caption.appendChild(helper.createLikeButton())

    var article4Date = document.createTextNode('4 weeks ago')
    article4.appendChild(article4Date)
}

landing.mount()
register.mount()
login.mount()
home.mount()