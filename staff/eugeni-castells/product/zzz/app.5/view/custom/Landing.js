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
  linkDiv.add(registerLink);

  registerLink.clickListener(function () {
    handleClickNavigation(landing, register);
  });

  //or text
  var orText = new Span(" or ");
  linkDiv.add(orText);

  //var link Login
  var loginLink = new Anchor("Login");
  loginLink.clickListener(function () {
    handleClickNavigation(landing, login);
  });
  linkDiv.add(loginLink);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;
