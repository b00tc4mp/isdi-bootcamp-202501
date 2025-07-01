function Landing() {
    
    Component.call(this, 'div')

    // ---- LOGO ----

    var logo = new Heading(1)//document.createElement('h1')
    logo.setText('Logo')
    this.add(logo) //this.container.appendChild(logo)

    // ---- WELCOME ----

    var welcome = new Heading(3)
    welcome.setText('Welcome!')
    this.add(welcome)

    // ---- LOGIN + REGISTER

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    this.registerAnchor = registerAnchor
    this.add(registerAnchor)

    var orText = document.createTextNode('or')
    this.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login') 
    this.loginAnchor = loginAnchor
    this.add(loginAnchor)

}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}
// El Landing maneja solo el click. El comportamiento que uno decide fuera (el del main de eliminar pantalla y mostrar otra) que se recibe como parametro, se lo enviamos al click del button registerBox para que se dispare. 

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}

// ---- ESTILOS

//loginRegisterBox.container.style.display = 'flex'
//loginRegisterBox.container.style.flexDirection = 'column'
//loginRegisterBox.container.style.gap = '5px'

//loginBox.container.style.color = '#FFFFFF'
//loginBox.container.style.backgroundColor = '#428A82'

//registerBox.container.style.backgroundColor = '#E0EEEC'
//registerBox.container.style.borderColor = '#428A82'