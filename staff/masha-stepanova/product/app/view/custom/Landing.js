function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    logo.container.style.justifyContent = 'center'
    this.add(logo)

    var span = new Span()
    this.add(span)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    this.registerAnchor = registerAnchor
    span.add(registerAnchor)

    var orText = new Text()
    orText.setText(' or ')
    span.add(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    this.loginAnchor = loginAnchor
    span.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}
