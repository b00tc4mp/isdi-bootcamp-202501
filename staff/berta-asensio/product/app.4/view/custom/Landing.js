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

