function Landing() {
    Component.call(this, "div");

    var logo = new Heading(1);
    logo.setText("Logo");
    this.add(logo);

    var registerOrLogin = new Div();
    this.add(registerOrLogin);

    var registerAnchor = new Anchor();
    registerAnchor.setText("Register");
    this.registerAnchor = registerAnchor
    registerOrLogin.add(registerAnchor);

    var orText = document.createTextNode(" or ");
    registerOrLogin.container.appendChild(orText);

    var loginAnchor = new Anchor();
    loginAnchor.setText("Login");
    this.loginAnchor = loginAnchor
    registerOrLogin.add(loginAnchor);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener)
}