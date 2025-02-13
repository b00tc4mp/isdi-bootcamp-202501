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

    var loginRegisterBox = new Div() //document.createElement('div')
    
    this.add(loginRegisterBox)

    var loginBox = new Button() //document.createElement('button')
    loginBox.setText('Login') 
    loginRegisterBox.add(loginBox)

    this.loginBox = loginBox

    var registerBox = new Button()//document.createElement('button')
    registerBox.setText('Register')
    loginRegisterBox.add(registerBox)

    this.registerBox = registerBox

}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerBox.addClickListener(listener)
}
// El Landing maneja solo el click. El comportamiento que uno decide fuera (el del main de eliminar pantalla y mostrar otra) que se recibe como parametro, se lo enviamos al click del button registerBox para que se dispare. 

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginBox.addClickListener(listener)
}

// ---- ESTILOS

//loginRegisterBox.container.style.display = 'flex'
//loginRegisterBox.container.style.flexDirection = 'column'
//loginRegisterBox.container.style.gap = '5px'

//loginBox.container.style.color = '#FFFFFF'
//loginBox.container.style.backgroundColor = '#428A82'

//registerBox.container.style.backgroundColor = '#E0EEEC'
//registerBox.container.style.borderColor = '#428A82'