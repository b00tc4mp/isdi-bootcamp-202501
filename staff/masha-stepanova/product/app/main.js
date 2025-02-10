console.clear()

function Component(tagName) {
    this.container = document.createElement(tagName)
}

// añade una propiedad al prototype, que es una función, que permite hacer appendChild más agilmente
Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}
// añade una propiedad - función al prototype que crea un event listener para un elemento
Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

// creamos un constructor Form a partir del constructor Component. Ahora contiene todas sus propiedades
function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}

function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

Label.prototype.setText = function (text) {
    this.container.innerText = text
}

function Input() {
    Component.call(this, 'input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setType = function (type) {
    this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder) {
    this.container.placeholder = placeholder
}

function Button() {
    Component.call(this, 'button')
    this.container.style.backgroundColor = '#00A706'
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function (type) {
    this.container.type = type
}

Button.prototype.setText = function (text) {
    this.container.textContent = text
}

function Heading(level) {
    Component.call(this, 'h' + level)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setText = function (text) {
    this.container.textContent = text
}

function Anchor() {
    Component.call(this, 'a')

}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}

function Article() {
    Component.call(this, 'article')
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article

function Picture() {
    Component.call(this, 'img')
}

Picture.prototype = Object.create(Component.prototype)
Picture.prototype.constructor = Picture

Picture.prototype.setSource = function (source) {
    this.container.src = source
}

function Span() {
    Component.call(this, 'span')
}

Span.prototype = Object.create(Component.prototype)
Span.prototype.constructor = Span

function Text() {
    Component.call(this, 'text')
}

Text.prototype = Object.create(Component.prototype)
Text.prototype.constructor = Text

Text.prototype.setText = function (description) {
    this.container.innerText = description
}

function Body() {
    Component.call(this, 'body')
    this.container.style.backgroundColor = '#E5FFE6'
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

const body = new Body()
document.body = body.container

// LANDING

function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.add(registerAnchor)

    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)

// REGISTER

function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.3rem'
    this.add(form)

    var labelName = new Label()
    labelName.setText('Name')
    form.add(labelName)

    var inputName = new Input()
    form.add(inputName)

    var labelEmail = new Label()
    labelEmail.setText('E-mail')
    form.add(labelEmail)

    var inputEmail = new Input()
    form.add(inputEmail)

    var labelUsername = new Label()
    labelUsername.setText('Username')
    form.add(labelUsername)

    var inputUsername = new Input()
    form.add(inputUsername)

    var labelPassword = new Label()
    labelPassword.setText('Password')
    form.add(labelPassword)

    var inputPassword = new Input()
    form.add(inputPassword)

    var submitButton = new Button()
    submitButton.setType('submit')
    submitButton.setText('Submit')
    form.add(submitButton)

    form.addSubmitListener(function (event) {
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

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginAnchor)

}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register()

// LOGIN

function Login() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var form = new Form()
    this.add(form)

    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.3rem'

    var labelUsername = new Label()
    labelUsername.setText('Username')
    form.add(labelUsername)

    var inputUsername = new Input()
    form.add(inputUsername)

    var labelPassword = new Label()
    labelPassword.setText('Password')
    form.add(labelPassword)

    var inputPassword = new Input()
    form.add(inputPassword)

    var loginButton = new Button()
    loginButton.setText('Login')
    loginButton.setType('submit')
    form.add(loginButton)

    form.addSubmitListener(function (event) {
        event.preventDefault()
        document.body.removeChild(this.container)
        document.body.appendChild(home.container)
    }.bind(this))

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    this.add(registerAnchor)

}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

var login = new Login()


// HOME

function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var article1 = new Article()
    this.add(article1)

    article1.container.style.display = 'flex'
    article1.container.style.flexDirection = 'column'
    article1.container.style.gap = '0.3rem'

    var username1 = new Heading(3)
    username1.setText('username1')
    article1.add(username1)

    var picture1 = new Picture()
    picture1.setSource('https://t4.ftcdn.net/jpg/09/02/37/89/240_F_902378980_u4sL7oSE5RB3fTlgJnCyscPoH6lrF4uy.jpg')
    article1.add(picture1)

    var spanArticle1 = new Span()
    article1.add(spanArticle1)

    spanArticle1.container.style.display = 'flex'
    spanArticle1.container.style.justifyContent = 'space-between'

    var description1 = new Text()
    description1.setText('Caption')
    spanArticle1.add(description1)

    var likeButton1 = new Button()
    likeButton1.setText('🤍')
    likeButton1.addClickListener(function () {
        likeButton1.container.innerText = likeButton1.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle1.add(likeButton1)

    var article2 = new Article()
    this.add(article2)

    article2.container.style.display = 'flex'
    article2.container.style.flexDirection = 'column'
    article2.container.style.gap = '0.3rem'

    var username2 = new Heading(3)
    username2.setText('username2')
    article2.add(username2)

    var picture2 = new Picture()
    picture2.setSource('https://imgs.search.brave.com/sZjKUhOvtfY9crCnDhxXV0l62Y1j-6MOfn3qjktlfr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0Lzk4LzM0/LzM2MF9GXzI5NDk4/MzQ4NF9uZEx2eDZa/bkRManJQckFGSjJy/NDNlSVVUNk5HZkxu/SS5qcGc')
    article2.add(picture2)

    var spanArticle2 = new Span()
    article2.add(spanArticle2)

    spanArticle2.container.style.display = 'flex'
    spanArticle2.container.style.justifyContent = 'space-between'

    var description2 = new Text()
    description2.setText('Caption')
    spanArticle2.add(description2)

    var likeButton2 = new Button()
    likeButton2.setText('🤍')
    likeButton2.addClickListener(function () {
        likeButton2.container.innerText = likeButton2.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle2.add(likeButton2)

    var article3 = new Article()
    this.add(article3)

    article3.container.style.display = 'flex'
    article3.container.style.flexDirection = 'column'
    article3.container.style.gap = '0.3rem'

    var username3 = new Heading(3)
    username3.setText('username3')
    article3.add(username3)

    var picture3 = new Picture()
    picture3.setSource('https://t4.ftcdn.net/jpg/10/28/90/93/240_F_1028909330_gJNTy01sKzbYo0umWlGa1e5oiWHkJxB9.jpg')
    article3.add(picture3)

    var spanArticle3 = new Span()
    article3.add(spanArticle3)

    spanArticle3.container.style.display = 'flex'
    spanArticle3.container.style.justifyContent = 'space-between'

    var description3 = new Text()
    description3.setText('Caption')
    spanArticle3.add(description3)

    var likeButton3 = new Button()
    likeButton3.setText('🤍')
    likeButton3.addClickListener(function () {
        likeButton3.container.innerText = likeButton3.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle3.add(likeButton3)

    var article4 = new Article()
    this.add(article4)

    article4.container.style.display = 'flex'
    article4.container.style.flexDirection = 'column'
    article4.container.style.gap = '0.3rem'

    var username4 = new Heading(3)
    username4.setText('username4')
    article4.add(username4)

    var picture4 = new Picture()
    picture4.setSource('https://t3.ftcdn.net/jpg/08/69/02/92/240_F_869029213_2y0i0t5Y6nZmb62r2pMp6vGfObRkcTVR.jpg')
    article4.add(picture4)

    var spanArticle4 = new Span()
    article4.add(spanArticle4)

    spanArticle4.container.style.display = 'flex'
    spanArticle4.container.style.justifyContent = 'space-between'

    article4.container.style.display = 'flex'
    article4.container.style.flexDirection = 'column'
    article4.container.style.gap = '0.3rem'

    var description4 = new Text()
    description4.setText('Caption')
    spanArticle4.add(description4)

    var likeButton4 = new Button()
    likeButton4.setText('🤍')
    likeButton4.addClickListener(function () {
        likeButton4.container.innerText = likeButton4.container.innerText === '🤍' ? '💛' : '🤍'
    })
    spanArticle4.add(likeButton4)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()
