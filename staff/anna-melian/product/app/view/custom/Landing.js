function Landing() {
    Component.call(this, 'div')

    this.container.style.textAlign = 'center'

    var logo = new Heading(1)
    this.add(logo)
    logo.setText('Logo')

    var registerAnchor = new Anchor()
    this.add(registerAnchor)
    registerAnchor.setText('Register')
    this.registerAnchor = registerAnchor

    var orText = new Heading(4)
    orText.setText(' or ')
    this.add(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    this.add(loginAnchor)
    this.loginAnchor = loginAnchor
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}
