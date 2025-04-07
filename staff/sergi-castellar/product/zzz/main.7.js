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
        document.body.removeChild(this.container)
        document.body.appendChild(register.container)
    }.bind(this))
    registerOrLogin.add(registerAnchor)

    var orText = document.createTextNode(' or ')
    registerOrLogin.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function() {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    registerOrLogin.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)

