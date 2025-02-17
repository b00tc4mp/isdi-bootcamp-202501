function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Bee you')
    this.add(logo)

    //register button
   
    var registerButton = new Button()
    registerButton.setText('Register')
    this.add(registerButton)
    this.registerButton = registerButton

    // simple text

    var spaceText = document.createTextNode(' ')
    this.container.appendChild(spaceText)
    var orText = document.createTextNode('or')
    this.container.appendChild(orText)
    var spaceText2 = document.createTextNode(' ')
    this.container.appendChild(spaceText2)

    //login anchor  

    var loginButton = new Button()
    loginButton.setText('Login')
    this.add(loginButton)
    this.loginButton = loginButton
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addRegisterClickListener = function(listener) {
    this.registerButton.addClickListener(listener)
}

Landing.prototype.addLoginClickListener = function(listener) {
    this.loginButton.addClickListener(listener)
}
