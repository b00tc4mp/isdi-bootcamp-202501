console.clear()
console.log('Hello, App!')

// Component base constructor
function Component(tagName) {
    this.container = document.createElement(tagName); // Crea un nuevo elemento HTML con el tagName proporcionado
}

Component.prototype.add = function(child) {
    this.container.appendChild(child.container); // Agrega un componente hijo al contenedor
}

//falta crear contuctora romeve
Component.prototype.remove = function (child) {
    this.container.removeChild(child.container)
}


Component.prototype.addClickListener = function(callback) {
    this.container.addEventListener('click', callback); // Agrega un listener de clic al contenedor
}

// Form constructor
function Form() {
    Component.call(this, 'form'); // Crea un <form> usando el constructor de Component
}

Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form // Asegura que el constructor apunte a Form

Form.prototype.addSubmitListener = function (callback) {
    this.container.addEventListener('submit', callback)
}
//crear funcion label

function Label() {
    Component.call(this, 'label')
}
Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

Label.prototype.setText = function (text) {
    this.container.textContent = text
}
// crear funcion input
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
//crear funcion button

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

// Heading constructor (h1, h2, etc.)
function Heading(level) {
    Component.call(this, 'h' + level); // Crea un encabezado de un determinado nivel (h1, h2, ...)
}

Heading.prototype = Object.create(Component.prototype);
Heading.prototype.constructor = Heading; // Asegura que el constructor apunte a Heading

Heading.prototype.setText = function(text) {
    this.container.textContent = text; // Establece el texto del encabezado
}

// Anchor constructor (enlaces <a>)
function Anchor() {
    Component.call(this, 'a'); // Crea un enlace <a>
   
}

Anchor.prototype = Object.create(Component.prototype);
Anchor.prototype.constructor = Anchor;

Anchor.prototype.setText = function(text) {
    this.container.textContent = text // Establece el texto del enlace
}

// Body constructor
function Body() {
    Component.call(this, 'body') // Crea el cuerpo del documento
}

Body.prototype = Object.create(Component.prototype);
Body.prototype.constructor = Body

// Crea el contenedor del body
const body = new Body()
document.body = body.container

// Landing constructor
function Landing() {
    Component.call(this, 'div'); // Crea un div para el componente Landing

    var logo = new Heading(1);
    logo.setText('Logo');
    this.add(logo); // Agrega el logo al contenedor

    var registerAnchor = new Anchor();
    registerAnchor.setText('Register');
    registerAnchor.addClickListener(function () { // Cambio de pantalla al hacer clic en Register
        body.remove(this);
        body.add(register);
    }.bind(this));
    this.add(registerAnchor); // Agrega el enlace Register

    var orText = document.createTextNode(' or ');
    this.container.appendChild(orText); // Agrega el texto "or"

    var loginAnchor = new Anchor();
    loginAnchor.setText('Login');
    loginAnchor.container.style.marginBottom = '10px'
    loginAnchor.container.style.display = 'block'
    loginAnchor.addClickListener(function () { // Cambio de pantalla al hacer clic en Login
        body.remove(this);
        body.add(login);
    }.bind(this));
    this.add(loginAnchor); // Agrega el enlace Login
}

    Landing.prototype = Object.create(Component.prototype);
    Landing.prototype.constructor = Landing

    // Instanciamos el componente Landing
    var landing = new Landing()
    body.add(landing); // Montamos la pantalla de inicio en el body

    // Register constructor (Formulario de registro)

    function Register() {
    Component.call(this, 'div')

   var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    // Creamos el formulario

    var form = new Form()
    form.addSubmitListener(function (event) {
        event.preventDefault()

        console.log('register submit')

        var name = nameInput.getValue()
        var email = emailInput.getValue()
        var username = usernameInput.getValue()
        var password = passwordInput.getValue()
        
        console.log(name, email, username, password)
    })

    this.add(form);

     // Nombre
    var nameLabel = new Label()
    nameLabel.setText('Name')
    form.add(nameLabel);

    var nameInput = new Input()
    form.add(nameInput)
    
     //Email

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

    //Submit

    var submitButton = new Button()
    submitButton.setText('Register')
    submitButton.setType('submit')
    form.add(submitButton)

    // Anchor
    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')

    loginAnchor.container.style.marginBottom = '10px'
    loginAnchor.container.style.display = 'block'
    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)  
}   
    Register.prototype = Object.create(Component.prototype)
    Register.prototype.constructor = Register
   
    var register = new Register()

    // Login 
    function Login() {
  Component.call(this, 'div')
  
  var logo = new Heading(1)
  logo.setText('Logo')
  this.add(logo)

    // Formulario de login
   var form = new Form()
   form.addSubmitListener(function (event) {
    event.preventDefault()

    console.log(username, password)
    
    var username = usernameInput.getValue();
    var password = passwordInput.getValue()
    
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

   //Password

   var passwordLabel = new Label()
   passwordLabel.setText('Password')
   form.add(passwordLabel)

   var passwordInput = new Input()
   passwordInput.setType('password')
   form.add(passwordInput)

   // submit
    
   var submitButton = new Button()
   submitButton.setText('Login')
   submitButton.setType('submit')
   form.add(submitButton)
    
    // anchor
    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.marginBottom = '10px' // Espaciado
    registerAnchor.container.style.display = 'block' // Lo pone en una nueva línea
    registerAnchor.addClickListener(function () {
    body.remove(this)
    body.add(register)
    }.bind(this))
    this.add(registerAnchor)
 }

    Login.prototype = Object.create(Component.prototype)
    Login.prototype.constructor = Login

    var login = new Login()
 
// Home constructor 

function Home() {
    Component.call(this, 'div')
 var logo = new Heading(1)
 logo.setText('Logo')
this.add(logo)

var welcome = new Heading(2)
welcome.setText('Bienvenido al inicio')
this.add(welcome)

}
Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()