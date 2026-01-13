
// ****  COMPONENTES

function Component(tagName) {
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

// FORM
function Form() {
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
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

Input.prototype.getValue = function () {
    return this.container.value
}

// BUTTON
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

// HEADING
function Heading(level) {
    Component.call(this, 'h' + level)
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading

Heading.prototype.setText = function (text) {
    this.container.textContent = text
}

// ***********
// PICTURES
function Picture() {
    Component.call(this, 'img')  // 'img' = Tag que exista en html
}

Picture.prototype = Object.create(Component.prototype)
Picture.prototype.constructor = Picture

Picture.prototype.setSrc = function (src) {
    this.container.src = src  // .src = Parametro del tag dado anteriormente
}
// ********
// ANCHOR
function Anchor() {
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}

// BODY 
function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

var body = new Body()
document.body = body.container


// ****  LANDING

function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1) // LLamamos al componete creado
    logo.setText('Landing')
    this.add(logo)  // Añadimos la variable logo al contenedor

    // Login
    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    console.log(loginAnchor)
    loginAnchor.container.style.textDecoration = 'underline'
    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)

    // Or
    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    // Register
    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline'
    registerAnchor.addClickListener(function () {
        body.remove(this)
        body.add(register)
    }.bind(this))
    this.add(registerAnchor)
}

// Creamos Landing como hijo de Component
Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)


// ****  REGISTER

function Register() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Register')
    this.add(logo)

    // Form
    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.width = '50%'
    form.addSubmitListener(function (event) {
        event.preventDefault()

        // Guardar los valores introducidos en el formulario
        console.log('register submit')

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(name, email, username, password)
    })
    this.add(form)

    // Name 
    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel)

    // Formulario 
    var nameInput = new Input()
    form.add(nameInput)

    // Email 
    var emailLabel = new Label()
    emailLabel.setText('E-mail')
    form.add(emailLabel)

    var emailInput = new Input()
    emailInput.setType('email')
    form.add(emailInput)

    // Username 
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    form.add(usernameInput)

    // Password
    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    form.add(passwordInput)

    // Login
    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.style.textDecoration = 'underline'
    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)

    // Button - Register
    var submitButton = new Button()
    submitButton.setText('Register')
    submitButton.setType('submit')
    form.add(submitButton)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register()  // Llamamos al componente creado

// ****  LOGIN

function Login() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Login')
    this.add(logo)

    // Form
    var form = new Form()
    form.container.style.display = 'flex'
    form.container.style.flexDirection = 'column'
    form.container.style.width = '50%'
    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('login submit')

        var username = usernameInput.getValue()
        var password = passwordInput.getValue()

        console.log(username, password)

        body.remove(this)
        body.add(home)
    }.bind(this))
    this.add(form)

    // Username 
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    form.add(usernameLabel)

    var usernameInput = new Input()
    usernameInput.setType('text')
    form.add(usernameInput)

    // Password
    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    form.add(passwordLabel)

    var passwordInput = new Input()
    passwordInput.setType('password')
    form.add(passwordInput)

    // Button Login
    var submitButton = new Button()
    submitButton.setText('Login')
    submitButton.setType('submit')
    form.add(submitButton)

    // // Register
    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline'
    registerAnchor.addClickListener(function () {
        body.remove(this)
        body.add(register)
    }.bind(this))
    form.add(registerAnchor)
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

var login = new Login()

// ****  HOME 

function Home() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Home')
    this.add(logo)

    // Form
    var form = new Form()
    this.add(form)

    //     // Imagenes
    var coment = new Heading(5)
    coment.setText('Winnie the Pooh Junior vs Senior')
    form.add(coment)

    var news1 = new Picture()
    news1.setSrc('https://i.pinimg.com/236x/ff/a1/22/ffa122f36bffb392661c0de948475635.jpg')
    news1.container.style.width = '60%'
    form.add(news1)

    var coment = new Heading(5)
    coment.setText('SpongeBob in his first programming class')
    form.add(coment)

    var news2 = new Picture()
    news2.setSrc('https://i.pinimg.com/564x/bd/68/af/bd68af256a4c6fd0ada2f60183e88f39.jpg')
    news2.container.style.width = '60%'
    form.add(news2)

    var coment = new Heading(5)
    coment.setText('The Full-Stack hamburger')
    form.add(coment)

    var news3 = new Picture()
    news3.setSrc('https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D179581354W8333H10000/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/programador-informatico-codificadores-software-burger-lovers.jpg')
    news3.container.style.width = '60%'
    form.add(news3)

    // Exit
    var exitAnchor = new Anchor()
    exitAnchor.setText('EXIT')
    exitAnchor.container.style.textDecoration = 'underline'
    exitAnchor.addClickListener(function () {
        body.remove(this)
        body.add(landing)
    }.bind(this))
    form.add(exitAnchor)

}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()

