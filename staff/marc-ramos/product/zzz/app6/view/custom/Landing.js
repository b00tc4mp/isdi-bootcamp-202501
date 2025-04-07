function Landing() {
    Component.call(this, "div");
  
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

Landing.prototype.addRegisterAnchor = function(listener) {
  this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLoginAnchor = function(listener) {
  this.loginAnchor.addClickListener(listener)
}