// Landing constructor
function Landing() {
    Component.call(this, 'div'); // Crea un div para el componente Landing

    var logo = new Heading(1)
    logo.setText('Logo')
    this.add(logo); // Agrega el logo al contenedor

    var registerAnchor = new Anchor();
    registerAnchor.setText('Register');
    this.registerAnchor = registerAnchor
    this.add(registerAnchor)

    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.style.marginBottom = '10px'
    loginAnchor.container.style.display = 'block'
    this.loginAnchor = loginAnchor
    this.add(loginAnchor)
}
    Landing.prototype = Object.create(Component.prototype)
    Landing.prototype.constructor = Landing

    Landing.prototype.addRegisterClickListener = function (listener) {
       this.registerAnchor.addClickListener(listener) 
    }

    Landing.prototype.addLoginClickListener = function (listener) {
      this.loginAnchor.addClickListener(listener)
 }    