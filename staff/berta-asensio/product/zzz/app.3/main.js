console.clear()

// COMPONENT

function Component(tagName) {
    this.container = document.createElement(tagName)
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.remove = function (child) {
    this.container.removeChild(child.container)
}

Component.prototype.addClickListener = function(callback) {
    this.container.addEventListener('click', callback)
}

//COMPONENTE BODY

function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

//COMPONENTE HEADING

function Heading(level) {
    Component.call(this, 'h' + level)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setText = function(text) {
    this.container.textContent = text
}

//COMPONENTE FORM

function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function(callback) {
    this.container.addEventListener('submit', callback)
}

//COMPONENTE LABEL

function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

Label.prototype.setText = function(text) {
    this.container.textContent = text
}

//COMPONENTE INPUT

function Input() {
    Component.call(this, 'input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setType = function(type) {
    this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder) {
    this.container.placeholder = placeholder
}

Input.prototype.getValue = function() {
    return this.container.value
}

//COMPONENTE BUTTON

function Button() {
    Component.call(this, 'button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function(type) {
    this.container.type = type
}
Button.prototype.setText = function(text) {
    this.container.textContent = text
}

//COMPONENTE ANCHOR

function Anchor() {
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function(text) {
    this.container.textContent = text
}

//COMPONENTE ARTICLE

function Article() {
    Component.call(this, 'article')
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article

//COMPONENTE IMAGEN

function Image() {
    Component.call(this, 'img')
}
Image.prototype = Object.create(Component.prototype)
Image.prototype.constructor = Image

Image.prototype.setSrc = function(src) {
    this.container.src = src
}

// COMPONENTE BR

function Br() {
    Component.call(this, 'br')
}

Br.prototype = Object.create(Component.prototype)
Br.prototype.constructor = Br

//-------BODY-------

var body = new Body()
document.body = body.container

body.container.style.backgroundColor = '#FFD033'
body.container.style.fontFamily = 'nunito'

//-------LANDING-------

function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    //register button
   
    var registerButton = new Button()
    registerButton.setText('Register')
    registerButton.addClickListener(function() {
        body.remove(this)
        body.add(register)
    }.bind(this))
    this.add(registerButton)

    // simple text

    var spaceText = document.createTextNode(' ')
    this.container.appendChild(spaceText)
    var orText = document.createTextNode('or')
    this.container.appendChild(orText)
    var spaceText2 = document.createTextNode(' ')
    this.container.appendChild(spaceText2)

    //login anchor  

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing
body.add(landing)


// -------REGISTER PAGE-------

function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    var title = new Heading(2)
    title.setText('Create account')
    this.add(title)

    //Form

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var name = nameInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        var email = emailInput.getValue()

        console.log(name, username, password, email)

    })
    this.add(form)

    //name

    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel)

    var br = new Br()
    form.add(br)

    var nameInput = new Input()
    form.add(nameInput)

    var br = new Br()
    form.add(br)

    //username

    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var br = new Br()
    form.add(br)

    var usernameInput = new Input()
    form.add(usernameInput)

    var br = new Br()
    form.add(br)

    //password

    var passwordLabel = new Label
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var br = new Br()
    form.add(br)

    var passwordInput = new Input()
    form.add(passwordInput)

    var br = new Br()
    form.add(br)

    //email

    var emailLabel = new Label()
    emailLabel.setText('Email')
    form.add(emailLabel)

    var br = new Br()
    form.add(br)

    var emailInput = new Input()
    emailInput.setType('email')  // este setType solo aceptara emails
    form.add(emailInput)

    var br = new Br()
    form.add(br)

    //return anchor 

    var returnAnchor = new Anchor()
    returnAnchor.setText('Return')
    returnAnchor.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))
    form.add(returnAnchor)

    var spaceBetweenButton = document.createTextNode(' ')
    this.container.appendChild(spaceBetweenButton)

    //register button

    var button = new Button()
    button.setType('submit')
    button.setText('Register')
    form.add(button)

    var spaceBetweenButton = document.createTextNode(' ')
    this.container.appendChild(spaceBetweenButton)

    //login button

    var loginButton = new Button()
    loginButton.setType('button')
    loginButton.setText('Login')
    loginButton.addClickListener(function() {
        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
    this.add(loginButton)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register()

//-------LOGIN PAGE-------

function Login() {
    Component.call(this, 'div')

    //logo

    var logo = new Heading(1)
    logo.setText('Bee You')
    this.add(logo)

    //title

    var title = new Heading(2)
    title.setText('Login')
    this.add(title)

    // form

    var form = new Form()

    form.addSubmitListener(function (event) {
        event.preventDefault()

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(username, password)

        body.remove(this)
        body.add(home)
    }.bind(this))
    this.add(form)

    //username

    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var br = new Br()
    form.add(br)

    var usernameInput = new Input()
    form.add(usernameInput)

    var br = new Br()
    form.add(br)

    //password

    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var br = new Br()
    form.add(br)

    var passwordInput = new Input()
    form.add(passwordInput)

    var br = new Br()
    form.add(br)

    //return button

    var returnButton = new Button()
    returnButton.setText('Return')
    returnButton.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))
    form.add(returnButton)

   // var spaceBetweenButton = document.createTextNode(' ')
    //form.appendChild(spaceBetweenButton)

    //login button

    var button = new Button()
    button.setType('submit')
    button.setText('Login')
    form.add(button)

}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

var login = new Login()

// -------HOMEPAGE-------

function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    //HOME FIRST POST

    var firstPost = new Article()
    this.add(firstPost)

    var firstPostName = new Heading(3)
    firstPostName.setText('name1')
    firstPost.add(firstPostName)
    
    var squareImg = new Component('div')
    this.add(squareImg)
    /*
    squareImg.style.width = '200px'
    squareImg.style.height = '200px'
    squareImg.style.overflow = 'hidden'
    */
    var firstPostPicture = new Image()
    firstPostPicture.setSrc ('https://imgs.search.brave.com/2EcBw2UdTyJRdsx6Gp7xfBHA0A1__0QFLtCgvSXM8HE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jaGlj/YS1lbi1waWNvLWRl/LW1vbnRhJUMzJUIx/YS1taXJhbmRvLWhl/cm1vc2FzLW1vbnRh/JUMzJUIxYXMtYWwt/YXRhcmRlY2VyLWNv/bi1oaWVyYmEtdmVy/ZGUtaGVybW9zby12/YWxsZS1uaWVibGEt/dmVyYW5vLXBhaXNh/amUtbXVqZXItam92/ZW4tMjEyMzQyMDQ4/LmpwZw')
    /*
    firstPostPicture.style.width = '50%'
    firstPostPicture.style.height = '75%'
    firstPostPicture.style.objectFit = 'cover'
    firstPostPicture.style.objectPosition = 'top'
    */
    firstPost.add(firstPostPicture)

    // HOME SECOND POST

    var secondPost = new Article()
    this.add(secondPost)

    var secondPostName = new Heading(3)
    secondPostName.setText('name2')
    secondPost.add(secondPostName)
    /*
    var squareImg2 = new Component('div')
    this.add(squareImg2)

    squareImg2.style.width = '200px'
    squareImg2.style.height = '200px'
    squareImg2.style.overflow = 'hidden'
    */
    var secondPostPicture = new Image()
    secondPostPicture.setSrc ('https://imgs.search.brave.com/IECfcLf6yGbgIjkrA3ODeCopIIl7bBMn9KCd8-fWCn8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNS8xNC9i/ZWFjaC0xODUzNDQy/XzY0MC5qcGc')
    secondPost.add(secondPostPicture)
    /*
    secondPostPicture.style.width = '50%'
    secondPostPicture.style.height = '75%'
    secondPostPicture.style.objectFit = 'cover'
    secondPostPicture.style.objectPosition = 'top'
    */

    //logout button

    var logOutButton = new Button()
    logOutButton.setText('Logout')
    logOutButton.addClickListener(function () {
        document.body.removeChild(this.container)
        document.body.appendChild(landing.container)
    }.bind(this))
    this.add(logOutButton)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()


