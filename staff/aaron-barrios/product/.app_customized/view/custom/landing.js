function Landing() {
    Component.call(this, 'div')

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo)

    //SPAN DE ANCHORS 
    var anchorsSpan = new Span()
    anchorsSpan.container.style.display = 'flex'
    anchorsSpan.container.style.justifyContent = 'left'
    anchorsSpan.container.style.gap = '5px'
    this.add(anchorsSpan)

    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.style.textDecoration = 'underline' //register.container = div de register
    registerAnchor.container.style.cursor = 'pointer'
    this.registerAnchor = registerAnchor
    anchorsSpan.add(registerAnchor)

    var orText = document.createTextNode('text')
    anchorsSpan.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.style.textDecoration = 'underline'
    loginAnchor.container.style.cursor = 'pointer'
    this.loginAnchor = loginAnchor
    anchorsSpan.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}