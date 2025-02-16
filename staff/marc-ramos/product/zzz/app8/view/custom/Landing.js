function Landing() {
    Component.call(this, "div");

    // Aplicar estilos al contenedor principal
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";
    this.container.style.height = "100vh"; // Ocupa toda la pantalla
    this.container.style.backgroundColor = "gray"; // Fondo gris
  
    var logo = new Heading(1);
    logo.setText("Landing");
    this.add(logo);
  
    var registerAnchor = new Anchor();
    registerAnchor.setText("Register");
   this.registerAnchor = registerAnchor
    this.add(registerAnchor);
  
    var orText = document.createTextNode(" or ");
    this.container.appendChild(orText);
  
    var loginAnchor = new Anchor();
    loginAnchor.setText("Login");
    this.loginAnchor = loginAnchor
    this.add(loginAnchor);
  }

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

Landing.prototype.addRegisterClickListener = function(listener) {
  this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLoginClickListener = function(listener) {
  this.loginAnchor.addClickListener(listener)
}