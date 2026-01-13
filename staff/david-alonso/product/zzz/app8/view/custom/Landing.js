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
    this.loginAnchor = loginAnchor
    this.add(loginAnchor)

    // Or
    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    // Register
    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline'
    this.registerAnchor = registerAnchor
    this.add(registerAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}