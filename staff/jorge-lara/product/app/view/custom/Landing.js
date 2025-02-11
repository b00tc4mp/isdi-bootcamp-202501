function Landing() {
    Component.call(this, 'div');

    let logo = new Heading(1);
    logo.setText('Logo');
    this.add(logo);

    let registerAnchor = new Anchor();
    registerAnchor.setText('Register')
    registerAnchor.setCursor('pointer');
    this.registerAnchor = registerAnchor;

    this.add(registerAnchor);


    let loginAnchor = new Anchor();
    loginAnchor.setText('Login');
    loginAnchor.setCursor('pointer');
    loginAnchor.container.style.marginLeft = '25px';
    this.loginAnchor = loginAnchor;

    this.add(loginAnchor);
}
Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

Landing.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener);
}

Landing.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener);
}