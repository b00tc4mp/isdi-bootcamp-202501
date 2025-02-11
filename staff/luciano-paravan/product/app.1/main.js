
function Component (tagName) {
    this.container = document.createElement(tagName)
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Component.prototype.remove = function (child) {
    this.container.removeChild(child.container)
}

Component.prototype.addClickListener = function (callback) {
    this.container.addEventListener('click', callback)
}

Component.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}

Component.prototype.setText = function (text) {
    this.container.textContent = text
}

Component.prototype.setType = function (type) {
    this.container.type = type
}

// ---- Article

function Article () {
    Component.call(this, 'article')
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article

// ---- P

function P () {
    Component.call(this, 'p')
}

P.prototype = Object.create(Component.prototype)
P.prototype.constructor = P

// ---- Img

function Img () {
    Component.call(this, 'img')
}

Img.prototype = Object.create(Component.prototype)
Img.prototype.constructor = Img

// ---- Form

function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

// ---- Heading h1, h2, h3 ...

function Heading (level) {
    Component.call(this, 'h' + level)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setText = function (text) {
    this.container.textContent = text
}

// ---- Label

function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

// ---- Input

function Input() {
    Component.call(this, 'input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.getValue = function () {
    return this.container.value
}

// ---- div 

function Div () {
    Component.call(this, 'div')
}

Div.prototype = Object.create(Component.prototype)
Div.prototype.constructor = Div

// ---- Anchor

function Anchor () {
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}

// ---- Button

function Button () {
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

function Body () {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

var body = new Body()
document.body = body.container

body.container.style.color = '#428A82'
body.container.style.backgroundColor = '#E0EEEC'
body.container.style.fontFamily = 'verdana'



/* -------------------- Landing ------------------> */

function Landing() {
    Component.call(this, 'div')

    

    var logo = new Heading(1)//document.createElement('h1')
    logo.setText('Logo')
    this.add(logo) //this.container.appendChild(logo)

    var welcome = new Heading(3)
    welcome.setText('Welcome!')
    this.add(welcome)

    var loginRegisterBox = new Div() //document.createElement('div')
    loginRegisterBox.container.style.display = 'flex'
    loginRegisterBox.container.style.flexDirection = 'column'
    loginRegisterBox.container.style.gap = '5px'
    this.add(loginRegisterBox)

    var loginBox = new Button() //document.createElement('button')
    loginBox.setText('Login') 
    loginBox.container.style.color = '#FFFFFF'
    loginBox.container.style.backgroundColor = '#428A82'
    loginRegisterBox.add(loginBox)

    loginBox.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))

    var registerBox = new Button()//document.createElement('button')
    registerBox.setText('Register')
    registerBox.container.style.backgroundColor = '#E0EEEC'
    registerBox.container.style.borderColor = '#428A82'
    loginRegisterBox.add(registerBox)//loginRegisterBox.appendChild(registerBox)

    registerBox.addClickListener(function () {
        body.remove(this)
        body.add(register)    
    }.bind(this))
} 

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)

/* ---------------- REGISTER -------------------> */
function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText = 'Logo'
    this.add(logo) //this.container.appendChild(logo)

    // - FORM -

    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.gap = '0.5rem'
    form.container.style.alignItems = 'center'
    this.add(form) //this.container.appendChild(form)

    var nameLabel = new Label()
    nameLabel.setText('Name: ')
    form.add(nameLabel)

    var nameInput = new Input()
    nameInput.setType('text')
    nameInput.name = 'name'
    form.add(nameInput)

    var surnameLabel = new Label()
    surnameLabel.setText('Surname: ')
    form.add(surnameLabel)

    var surnameInput = new Input()
    surnameInput.setType('text')
    surnameInput.name = 'surname'
    form.add(surnameInput)

    var emailLabel = new Label()
    emailLabel.setText('E-mail: ')
    form.add(emailLabel)

    var emailInput = new Input()
    emailInput.setType('text')
    emailInput.name = 'email'
    form.add(emailInput)

    var usernameLabel = new Label()
    usernameLabel.setText('Username: ')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    usernameInput.name = 'username'
    form.add(usernameInput)

    var passwordLabel = new Label()
    passwordLabel.setText('Password: ')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.name = 'password'
    form.add(passwordInput)

    var registerSubmit = new Button()
    registerSubmit.setText('Register')
    registerSubmit.setType('submit')
    registerSubmit.container.style.backgroundColor = '#428A82'
    registerSubmit.container.style.color = '#FFFFFF'
    form.add(registerSubmit)

    var loginRegister = new Anchor()
    loginRegister.setText('Login')
    loginRegister.container.style.fontWeight = 'bold'
    loginRegister.container.style.textDecoration = 'underline'
    loginRegister.container.style.marginTop = '50px'
    loginRegister.container.style.textAlign = 'center'
    form.add(loginRegister)

    loginRegister.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))

    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('Register submit')
        
        var name = nameInput.getValue()
        var surname = surnameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(name, surname, email, username, password)

        document.body.removeChild(this.container)
        document.body.appendChild(login.container)
    }.bind(this))
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register

// ------------------- Login ------------------>

function Login () {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)
    
    var loginText = new Heading(3)
    loginText.setText('Login')
    this.add(loginText)
    
    var form = new Form()
    //form.style.display = 'flex'
    //form.style.flexDirection = 'column'
    //form.style.gap = '0.5rem'
    this.add(form)
    
    var nameLabel = new Label()
    nameLabel.setText('Name: ')
    form.add(nameLabel)
    
    var nameInput = new Input()
    nameInput.setType('text')
    nameInput.name = 'login-name'
    form.add(nameInput)
    
    var passwordLabel = new Label()
    passwordLabel.setText('Password: ')
    form.add(passwordLabel)
    
    var passwordInput = new Input()
    passwordInput.setType('password')
    passwordInput.name = 'password-input'
    form.add(passwordInput)
    
    var loginSubmit = new Button()
    loginSubmit.setText('Login')
    loginSubmit.setType('submit')
    loginSubmit.container.style.backgroundColor = '#428A82'
    loginSubmit.container.style.color = '#FFFFFF'
    form.add(loginSubmit)
    
    var registerLogin = new Anchor()
    registerLogin.setText('Register')
    registerLogin.container.style.fontWeight = 'bold'
    registerLogin.container.style.textDecoration = 'underline'
    registerLogin.container.style.marginTop = '50px'
    registerLogin.container.style.textAlign = 'center'
    form.add(registerLogin)
    
    registerLogin.addClickListener(function () {
        body.remove(this)
        body.add(register)
    }.bind(this))
    
    form.addSubmitListener(function() {
        body.remove(this)
        body.add(home)
    }.bind(this))
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

var login = new Login

// ------------------- HOME --------------------->

function Home () {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)
    
    var logout = new Button()
    logout.setText('Log out')
    logout.container.style.color = '#FFFFFF'
    logout.container.style.backgroundColor = '#428A82'
    this.add(logout)
    
    var postFrame1 = new Article()
    this.add(postFrame1)
    
    var usernamePostFrame1 = new P()
    usernamePostFrame1.setText('username1')
    postFrame1.add(usernamePostFrame1)
    
    var photoContainer1 = new Div()
    photoContainer1.container.style.width = '100%' //'440px'
    photoContainer1.container.style.height = '440px'
    postFrame1.add(photoContainer1)
    
    var photoImg1 = new Img()
    photoImg1.src = 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    photoImg1.container.style.objectFit = 'cover'
    photoImg1.container.style.width = '100%'
    photoImg1.container.style.height = '100%'
    photoContainer1.add(photoImg1)
    
    var commentPostFrame1 = new P()
    commentPostFrame1.setText('comment 1')
    postFrame1.add(commentPostFrame1)
    
    var postFrame2 = new Article()
    this.add(postFrame2)
    
    var usernamePostFrame2 = new P()
    usernamePostFrame2.setText('username2')
    postFrame2.add(usernamePostFrame2)
    
    var photoContainer2 = new Div()
    photoContainer2.container.style.width = '100%'
    photoContainer2.container.style.height = '440px'
    postFrame2.add(photoContainer2)
    
    var photoImg2 = new Img()
    photoImg2.src = 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg'
    photoImg2.container.style.objectFit = 'cover'
    photoImg2.container.style.width = '100%'
    photoImg2.container.style.height = '100%'
    photoContainer2.add(photoImg2)
    
    var commentPostFrame2 = new P()
    commentPostFrame2.setText('comment 2')
    postFrame2.add(commentPostFrame2)
    
    logout.addClickListener(function () {
        body.remove(this)
        body.add(landing)
    }.bind(this))
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()











