console.clear()
console.log('Hello, App!')

// --- FATHER COMPONENT --- 
function Component(tagName) {
    this.container = document.createElement(tagName)
}

// --- FATHER COMPONENT FUNCTIONS ---
Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.remove = function (child) {
    this.container.removeChild(child.container)
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

// --- COMPONENT CHILD FUNCTIONS ---

// FORM
function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}

//SPAN
function Span() {
    Component.call(this, 'span')
}

Span.prototype = Object.create(Component.prototype)
Span.prototype.constructor = Span

Span.prototype.setText = function (text) {
    this.container.textContent = text
}

//MAIN
function Main() {
    Component.call(this, 'main')
}

Main.prototype = Object.create(Component.prototype)
Main.prototype.constructor = Main

//ARTICLE
function Article() {
    Component.call(this, 'article')
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article

// INPUT
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

// LABEL
function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

Label.prototype.setText = function (text) {
    this.container.textContent = text
}

Label.prototype.setType = function (type) {
    this.container.type = type
}


//BUTTON
function Button() {
    Component.call(this, 'button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function (type) {
    this.container.type = type
}

Button.prototype.setText = function (text) {
    this.container.textContent = text
}

//ANCHOR
function Anchor() {
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}

//HEADING
function Heading(level) {
    Component.call(this, 'h' + level)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setText = function (text) {
    this.container.textContent = text
}

//IMAGE
function Image() {
    Component.call(this, 'img')
}

Image.prototype = Object.create(Component.prototype)
Image.prototype.constructor = Image

//BODY
function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

//asign our body
const body = new Body()
document.body = body.container

//HEADER
function Header() {
    Component.call(this, 'header')
}

Header.prototype = Object.create(Component.prototype)
Header.prototype.constructor = Header

// --- LANDING ---
function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    //SPAN DE ANCHORS 
    var anchorsSpan = new Span()
    anchorsSpan.container.style.display = 'flex'
    anchorsSpan.container.style.justifyContent = 'left'
    anchorsSpan.container.style.gap = '5px'
    this.add(anchorsSpan)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline'
    registerAnchor.container.style.cursor = 'pointer'
    anchorsSpan.add(registerAnchor)

    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container) //register.container = div de register
    }.bind(this))

    var orText = document.createTextNode('text')
    anchorsSpan.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.style.textDecoration = 'underline'
    loginAnchor.container.style.cursor = 'pointer'
    anchorsSpan.add(loginAnchor)

    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)

//--- REGISTER ---
function Register() {
    Component.call(this, 'div')

    this.container.style.width = '400px'

    var title = new Heading(1)
    title.setText('Register')
    this.add(title)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.justifyContent = 'left'
    form.container.style.gap = '5px'
    this.add(form)

    //NAME
    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel)

    var nameInput = new Input()
    nameInput.setType('text')
    nameInput.container.style.width = '350px'
    form.add(nameInput)

    //EMAIL
    var emailLabel = new Label()
    emailLabel.setText('E-mail')
    form.add(emailLabel)

    var emailInput = new Input()
    emailInput.setType('email')
    emailInput.container.style.width = '350px'
    form.add(emailInput)

    //USERNAME
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.container.style.width = '350px'
    form.add(usernameInput)

    //PASSWORD
    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.container.style.width = '350px'
    form.add(passwordInput)


    var lowerSpan = new Span()
    lowerSpan.container.style.margin = '10px'
    lowerSpan.container.style.marginRight = '55px'
    lowerSpan.container.style.display = 'flex'
    lowerSpan.container.style.justifyContent = 'space-between'
    lowerSpan.container.style.alignItems = 'center'
    lowerSpan.width = '100%'

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.style.textDecoration = 'underline'
    loginAnchor.container.style.cursor = 'pointer'
    lowerSpan.add(loginAnchor)

    var registerButton = new Button()
    registerButton.setText('Register')
    registerButton.setType('submit')
    registerButton.container.style.width = '80px'
    lowerSpan.add(registerButton)


    form.add(lowerSpan)

    loginAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)

        // form.reset()
    }.bind(this))

    form.addSubmitListener(function (event) {
        event.preventDefault()
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)

        var userRegistered = {
            name: nameInput.container.value,
            email: emailInput.container.value,
            username: usernameInput.container.value,
            password: passwordInput.container.value
        }

        console.log(userRegistered)

        // form.reset() //REVISAR
    }.bind(this))
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register()
// body.add(register)


//--- LOGIN ---
function Login() {
    Component.call(this, 'div')

    this.container.style.width = '400px'

    var title = new Heading(2)
    title.setText('Login')
    this.add(title)

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.justifyContent = 'left'
    form.container.style.gap = '5px'
    this.add(form)

    //USERNAME
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.container.style.width = '350px'
    form.add(usernameInput)

    //PASSWORD
    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.container.style.width = '350px'
    form.add(passwordInput)


    var lowerSpan = new Span()
    lowerSpan.container.style.margin = '10px'
    lowerSpan.container.style.marginRight = '60px'
    lowerSpan.container.style.display = 'flex'
    lowerSpan.container.style.justifyContent = 'space-between'
    this.add(lowerSpan)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline'
    registerAnchor.container.style.cursor = 'pointer'
    lowerSpan.add(registerAnchor)

    var loginButton = new Button()
    loginButton.setText('Login')
    loginButton.setType('submit')
    loginButton.container.style.width = '80px'
    loginButton.setType8
    lowerSpan.add(loginButton)


    form.add(lowerSpan)

    registerAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)

        // form.reset() //REVISAR
    }.bind(this))


    form.addSubmitListener(function (event) {
        event.preventDefault()
        document.body.removeChild(this.container)
        document.body.appendChild(home.container)

        var userLogged = {
            username: usernameInput.container.value,
            password: passwordInput.container.value
        }

        console.log(userLogged)

        // form.reset()
    }.bind(this))
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

var login = new Login()
// body.add(login)


// ---- HOME ----
function Home() {
    Component.call(this, 'div')

    //Header
    var header = new Header()
    header.container.style.width = '100%'
    header.container.style.height = '50px'
    header.container.style.margin = '10px'
    header.container.style.display = 'flex'
    header.container.style.justifyContent = 'space-between'
    header.container.style.alignItems = 'center'
    this.add(header)

    var logoTitle = new Heading(2)
    logoTitle.setText('Logo')
    header.add(logoTitle)

    var logoutButton = new Button()
    logoutButton.setText('Logout')
    logoutButton.container.style.width = '100px'
    logoutButton.container.style.height = '35px'
    logoutButton.container.style.marginRight = '10px'
    header.add(logoutButton)

    logoutButton.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))

    //MAIN HOME
    var main = new Main()
    this.add(main)

    var posts = new Article()
    posts.container.style.display = 'flex'
    posts.container.style.width = '100%'
    posts.container.style.maxWidth = 'inherit'
    posts.container.style.flexDirection = 'column'
    posts.container.style.gap = '10px'
    main.add(posts)


    //KIWIII POST
    var kiwiUser = new Heading(3)
    kiwiUser.setText('Juanpi')
    posts.add(kiwiUser)

    var kiwiPost = new Image()
    kiwiPost.container.src = 'https://www.nutritionadvance.com/wp-content/uploads/2017/12/whole-kiwi-fruit-and-half-a-kiwi-showing-flesh.jpg'
    kiwiPost.container.style.width = '100%'
    kiwiPost.container.style.height = 'auto'
    posts.add(kiwiPost)

    var kiwiMojis = new Span()
    kiwiMojis.container.style.display = 'flex'
    kiwiMojis.container.style.justifyContent = 'left'
    kiwiMojis.container.style.gap = '5px'
    posts.add(kiwiMojis)

    var kiwiLikeButton = new Button()
    kiwiLikeButton.setText('🤍')
    kiwiLikeButton.container.style.backgroundColor = 'transparent'
    kiwiMojis.add(kiwiLikeButton)

    kiwiLikeButton.addClickListener(function () {
        this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'
    })

    var commentEmoji = new Anchor()
    commentEmoji.setText('📃')
    kiwiMojis.add(commentEmoji)

    var comment = new Span()
    comment.setText('Comment...')
    comment.container.style.opacity = '60%'
    comment.container.style.color = 'black'
    kiwiMojis.add(comment)


    // //BANANA POST
    var bananaUser = new Heading(3)
    bananaUser.setText('Manu')
    posts.add(bananaUser)

    var bananaPost = new Image()
    bananaPost.container.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVh4eUU6jtRS9zzlomMGLvWgpua5Xj5IcoQ&s'
    bananaPost.container.style.width = '100%'
    bananaPost.container.style.height = 'auto'
    posts.add(bananaPost)

    var nanaMojis = new Span()
    nanaMojis.container.style.display = 'flex'
    nanaMojis.container.style.justifyContent = 'left'
    nanaMojis.container.style.gap = '5px'
    posts.add(nanaMojis)

    var bananaLikeButton = new Button()
    bananaLikeButton.setText('🤍')
    bananaLikeButton.container.style.backgroundColor = 'transparent'
    nanaMojis.add(bananaLikeButton)

    bananaLikeButton.addClickListener(function () {
        this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'
    })

    var commentEmoji = new Anchor()
    commentEmoji.setText('📃')
    nanaMojis.add(commentEmoji)

    var comment = new Span()
    comment.setText('Comment...')
    comment.container.style.opacity = '60%'
    comment.container.style.color = 'black'
    nanaMojis.add(comment)


    // //ORANGE POST
    var orangeUser = new Heading(3)
    orangeUser.setText('Frank')
    posts.add(orangeUser)

    var orangePost = new Image()
    orangePost.container.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqLw4idW1IdAusBGfdZPewk0HTJyRUzPCPg&s'
    orangePost.container.style.width = '100%'
    orangePost.container.style.height = 'auto'
    posts.add(orangePost)

    var oraMojis = new Span()
    oraMojis.container.style.display = 'flex'
    oraMojis.container.style.justifyContent = 'left'
    oraMojis.container.style.gap = '5px'
    posts.add(oraMojis)

    var orangeLikeButton = new Button()
    orangeLikeButton.setText('🤍')
    orangeLikeButton.container.style.backgroundColor = 'transparent'
    oraMojis.add(orangeLikeButton)

    orangeLikeButton.addClickListener(function () {
        this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'
    })

    var commentEmoji = new Anchor()
    commentEmoji.setText('📃')
    oraMojis.add(commentEmoji)

    var comment = new Span()
    comment.setText('Comment...')
    comment.container.style.opacity = '60%'
    comment.container.style.color = 'black'
    oraMojis.add(comment)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()
// body.add(home)