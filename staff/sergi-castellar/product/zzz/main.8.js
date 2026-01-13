console.clear()
console.log('Hello,App!')


/*
crear componentes con el constructor
componentes concretos hijos de constuctor generico

*/

// CONSTRUCTORES
// user
function User(name, email, username, password) {
    this.name = name
    this.email = email
    this.username = username
    this.password = password
}

// post
function Post(title, img, description) {
    this.title = title
    this.img = img
    this.description = description
}

// component
function Component(tagName) {
    this.container = document.createElement(tagName)
}

Component.prototype.add = function(child) {
    this.container.appendChild(child.container)
}

Component.prototype.remove = function(child) {
    this.container.removeChild(child.container)
}

Component.prototype.addClickListener = function(callback) {
    this.container.addEventListener('click', callback)
}

// body
function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

// div
function Div() {
    Component.call(this, 'div')
}

Div.prototype = Object.create(Component.prototype)
Div.prototype.constructor = Div

Div.prototype.setId = function (id) {
    this.container.id = id
}

// form
function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.setId = function (id) {
    this.container.id = id
}

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}

// Label
function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

Label.prototype.setHtmlFor = function (htmlFor) {
    this.container.htmlFor = htmlFor
}

Label.prototype.setText = function (text) {
    this.container.textContent = text
}

// Input
function Input() {
    Component.call(this, 'input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setId = function (id) {
    this.container.id = id
}

Input.prototype.setType = function (type) {
    this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder) {
    this.container.placeholder = placeholder
}

// Button
function Button() {
    Component.call(this, 'button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setId = function (id) {
    this.container.id = id
}

Button.prototype.setForm = function (form) {
    this.container.form = form
}

Button.prototype.setType = function (type) {
    this.container.type = type
}

Button.prototype.setText = function (text) {
    this.container.textContent = text
}

// Heading
function Heading(level) {
    Component.call(this, `h${level}`)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setId = function (id) {
    this.container.id = id
}

Heading.prototype.setText = function (text) {
    this.container.textContent = text
}

// Anchor
function Anchor() {
    Component.call(this, `a`)
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setId = function (id) {
    this.container.id = id
}

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}

// Article
function Article() {
    Component.call(this, 'article')
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article

Article.prototype.setId = function (id) {
    this.container.id = id
}

// Figure
function Figure() {
    Component.call(this, 'article')
}

Figure.prototype = Object.create(Component.prototype)
Figure.prototype.constructor = Figure

Figure.prototype.setId = function (id) {
    this.container.id = id
}

// Footer
function Footer() {
    Component.call(this, 'article')
}

Footer.prototype = Object.create(Component.prototype)
Footer.prototype.constructor = Footer

Footer.prototype.setId = function (id) {
    this.container.id = id
}

// Section
function Section() {
    Component.call(this, 'article')
}

Section.prototype = Object.create(Component.prototype)
Section.prototype.constructor = Section

Section.prototype.setId = function (id) {
    this.container.id = id
}

// Paragraph
function Paragraph() {
    Component.call(this, 'article')
}

Paragraph.prototype = Object.create(Component.prototype)
Paragraph.prototype.constructor = Paragraph

Paragraph.prototype.setId = function (id) {
    this.container.id = id
}

//////// Body
var body = new Body()
document.body = body.container

//////// Landing
function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var registerOrLogin = new Div()
    this.add(registerOrLogin)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.addClickListener(function() {
        body.remove(this)
        body.add(register)
    }.bind(this))
    registerOrLogin.add(registerAnchor)

    var orText = document.createTextNode(' or ')
    registerOrLogin.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function() {
        body.remove(this)
        body.add(login)
    }.bind(this))
    registerOrLogin.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)

function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var inputForm = new Form()
    inputForm.setId('register-form')
    inputForm.addSubmitListener(function(event) {
        event.preventDefault()
        
        var name = nameInput.container.value
        var email = emailInput.container.value
        var username = usernameInput.container.value
        var password = passwordInput.container.value

        var user = new User(name, email, username, password)
    
        alert(`${user.name} ${user.email} ${user.username} ${user.password}`)
        console.dir(user)

        body.remove(this)
        body.add(home)
    }.bind(this))
    this.add(inputForm)

    var nameLabel = new Label()
    nameLabel.setHtmlFor('register-name')
    nameLabel.setText('Name')
    inputForm.add(nameLabel)

    var nameInput = new Input()
    nameInput.setType('text')
    nameInput.setId('register-name')
    inputForm.add(nameInput)

    var emailLabel = new Label()
    emailLabel.setHtmlFor('register-email')
    emailLabel.setText('E-mail')
    inputForm.add(emailLabel)

    var emailInput = new Input()
    emailInput.setType('text')
    emailInput.setId('register-email')
    inputForm.add(emailInput)

    var usernameLabel = new Label()
    usernameLabel.setHtmlFor('register-username')
    usernameLabel.setText('Username')
    inputForm.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.setId('register-username')
    inputForm.add(usernameInput)

    var passwordLabel = new Label()
    passwordLabel.setHtmlFor('register-password')
    passwordLabel.setText('Password')
    inputForm.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.setId('register-password')
    inputForm.add(passwordInput)

    var loginAndRegister = new Div()
    inputForm.add(loginAndRegister)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function() {
        body.remove(this)
        body.add(login)
    }.bind(this))
    loginAndRegister.add(loginAnchor)

    var registerButton = new Button()
    registerButton.setType('submit')
    registerButton.setForm('register-form')
    registerButton.setText('Register')
    loginAndRegister.add(registerButton)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register
var register = new Register()
//body.add(register)

function Login() {
    Component.call(this, 'div')
   
    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var inputForm = new Form()
    inputForm.setId('login-form')
    inputForm.addSubmitListener(function(event) {
        event.preventDefault()

        var username = usernameInput.container.value
        var password = passwordInput.container.value

        alert(username + password)
        console.log(username, password)

        body.remove(this)
        body.add(home)
    }.bind(this))
    this.add(inputForm)

    var usernameLabel = new Label()
    usernameLabel.setHtmlFor('login-username')
    usernameLabel.setText('Username')
    inputForm.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.setId('login-username')
    inputForm.add(usernameInput)

    var passwordLabel = new Label()
    passwordLabel.setHtmlFor('login-password')
    passwordLabel.setText('Password')
    inputForm.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.setId('login-password')
    inputForm.add(passwordInput)

    var registerAndLogin = new Div()
    inputForm.add(registerAndLogin)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.addClickListener(function() {
        body.remove(this)
        body.add(register)
    }.bind(this))
    registerAndLogin.add(registerAnchor)

    var loginButton = new Button()
    loginButton.setType('submit')
    loginButton.form('login-form')
    loginButton.setText('Login')
    registerAndLogin.add(loginButton)
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Landing

var login = new Login()
body.add(landing)

function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    var postArticleDiv = new Article()
    this.add(postArticleDiv)

    // POST 1
    
}
