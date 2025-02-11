function Landing() {
    Component.call(this, 'div')

    this.container.style.textAlign = 'center'

    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var registerAnchor = new Anchor()
    registerAnchor.addClickListener(function () {
        body.remove(this)
        body.add(register)
    }.bind(this))
    this.add(registerAnchor)

    registerAnchor.setText('Register')

    var orText = new Heading(4)
    orText.setText(' or ')
    this.add(orText)

    var loginAnchor = new Anchor()

    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)

    loginAnchor.setText('Login')
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing
