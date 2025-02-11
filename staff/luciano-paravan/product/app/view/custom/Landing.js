function Landing() {
    debugger
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