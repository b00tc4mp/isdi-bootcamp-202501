console.clear()

// TODO crear elementos a través del constructor 

// create component container to add this.property(container) in every page
var Component = function (tagName) {
    this.container = document.createElement(tagName)
}

// create helper object with all helper functions to create elements
var helper = {
    // create header1 element with 'Logo' text inside
    createLogo: function () {
        var logo = document.createElement('h1')
        logo.innerText = 'Logo'
        return logo
    },
    // create button element that appears to be heart emoji and chanches its colour with a click
    createLikeButton: function () {
        var likeButton = document.createElement('button')
        likeButton.innerText = '🤍'
        likeButton.addEventListener('click', function () {
            likeButton.innerText = likeButton.innerText === '🤍' ? '❤️' : '🤍'
        })

        return likeButton
    },
    // creates article element with predeterminate style
    createArticle: function () {
        var article = document.createElement('article')
        article.style.display = 'flex'
        article.style.flexDirection = 'column'
        article.style.width = '500px'
        article.style.gap = '0.3rem'

        return article
    },
    // creates span element with predeterminate style
    createSpan: function () {
        var span = document.createElement('span')
        span.style.display = 'flex'
        span.style.width = '500px'
        span.style.justifyContent = 'space-between'

        return span
    },
    // creates form emelemt with predeterminate style, it appends as many (label + input) elements as arguments the function has 
    createForm: function () {
        var form = document.createElement('form')
        form.style.display = 'flex'
        form.style.flexDirection = 'column'
        form.style.gap = '0.2rem'
        form.style.width = '500px'

        for (let i = 0; i < arguments.length; i++) {
            form.appendChild(helper.createLabel(arguments[i]))
            form.appendChild(document.createElement('input'))
        }

        return form
    },
    // creates anchor element that has a function to remove current page element and append new page element
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
    // creates labes with inner text
    createLabel: function (innerText) {
        var label = document.createElement('label')
        label.innerText = innerText
        return label
    },
    // creates 
    createPicture: function (source) {
        var picture = document.createElement('img')
        picture.src = source
        picture.width = '500'

        return picture
    }
}

var createPost = function (userName, pictureSource, captionText, postDate) {
    var article = helper.createArticle()

    var username = document.createElement('h3')
    username.innerText = userName
    article.appendChild(username)

    article.appendChild(helper.createPicture(pictureSource))

    var caption = helper.createSpan()
    caption.textContent = captionText
    caption.appendChild(helper.createLikeButton())
    article.appendChild(caption)

    article.appendChild(document.createTextNode(postDate))

    return article
}

// LANDING

var landing = new Component('div')
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

var register = new Component('div')
register.mount = function () {
    this.container.appendChild(helper.createLogo())

    var form = helper.createForm('Name', 'E-mail', 'Username', 'Password')
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

    var registerButton = document.createElement('button')
    registerButton.type = 'submit'
    registerButton.innerText = 'Register'
    form.appendChild(registerButton)

    var loginAnchor = helper.createDirectionAnchor('Login', this.container, login.container)
    this.container.appendChild(loginAnchor)
}

// LOGIN

var login = new Component('div')
login.mount = function () {
    this.container.appendChild(helper.createLogo())

    var form = helper.createForm('Username', 'Password')
    this.container.appendChild(form)

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

var home = new Component('div')
home.mount = function () {
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'column'
    this.container.style.gap = '0.5rem'
    this.container.appendChild(helper.createLogo())

    var article1 = createPost('username1', 'https://t4.ftcdn.net/jpg/09/02/37/89/240_F_902378980_u4sL7oSE5RB3fTlgJnCyscPoH6lrF4uy.jpg', 'Caption', '2 weeks ago')
    this.container.appendChild(article1)

    var article2 = createPost('username2', 'https://imgs.search.brave.com/sZjKUhOvtfY9crCnDhxXV0l62Y1j-6MOfn3qjktlfr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0Lzk4LzM0/LzM2MF9GXzI5NDk4/MzQ4NF9uZEx2eDZa/bkRManJQckFGSjJy/NDNlSVVUNk5HZkxu/SS5qcGc', 'Caption', '3 weeks ago')
    this.container.appendChild(article2)

    var article3 = createPost('username3', 'https://t4.ftcdn.net/jpg/10/28/90/93/240_F_1028909330_gJNTy01sKzbYo0umWlGa1e5oiWHkJxB9.jpg', 'Caption', '4 weeks ago')
    this.container.appendChild(article3)

    var article4 = createPost('username4', 'https://t3.ftcdn.net/jpg/08/69/02/92/240_F_869029213_2y0i0t5Y6nZmb62r2pMp6vGfObRkcTVR.jpg', 'Caption', '4 weeks ago')
    this.container.appendChild(article4)
}

landing.mount()
register.mount()
login.mount()
home.mount()