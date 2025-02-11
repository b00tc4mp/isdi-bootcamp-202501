function Landing() {
    Component.call(this, 'div');

    let logo = new Heading(1);
    logo.setText('Logo');
    this.add(logo);

    let registerAnchor = new Anchor();
    registerAnchor.setText('Register')
    registerAnchor.setCursor('pointer');
    registerAnchor.addClickListener(function () {
        body.remove(this);
        body.add(register);
    }.bind(this));
    this.add(registerAnchor);


    let loginAnchor = new Anchor();
    loginAnchor.setText('Login');
    loginAnchor.setCursor('pointer');
    loginAnchor.container.style.marginLeft = '25px';
    loginAnchor.addClickListener(function () {
        body.remove(this)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)
}
Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;