function Landing() {
  Component.call(this, "div");

  this.setStyle();

  var logo = new Header("1", "Logo");
  this.add(logo);

  //var register or login div
  var linkDiv = new Div();
  this.add(linkDiv);

  //var link Register
  var registerLink = new Anchor("Register");
  this.registerLink = registerLink;
  linkDiv.add(registerLink);

  //or text
  var orText = new Span(" or ");
  linkDiv.add(orText);

  //var link Login
  var loginLink = new Anchor("Login");
  this.loginLink = loginLink;

  linkDiv.add(loginLink);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

//Hem d'afegir una funció al prototip de landing que gestioni el click del botó register de landing, per desacoblar body i register de landing i que el component landing sigui agnòstic de tot el que no estigui declarat a dins seu.
Landing.prototype.addRegisterClickListener = function (listener) {
  this.registerLink.addClickListener(listener);
};

//Hem d'afegir un addLoginClickListener per tal de desacoblar body i login (que està declarada a main) de landing.
Landing.prototype.addClickLoginListener = function (listener) {
  this.loginLink.addClickListener(listener);
};
