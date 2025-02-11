function Login() {
    Component.call(this, 'div');

    let logo = new Heading(1);
    logo.setText('Login');
    this.add(logo);

    let loginForm = new Form();
    loginForm.setOrientation('flex', 'column');
    loginForm.container.style.width = '250px';

    loginForm.addSubmitListener(function (e) {
        e.preventDefault();

        let userLogin = {
            username: usernameInput.getValue(),
            password: passwordInput.getValue()
        }

        console.log(userLogin);

        this.loginSubmitListener();
    }.bind(this))
    this.add(loginForm);

    //username
    let usernameLabel = new Label();
    usernameLabel.setText('Username');
    loginForm.add(usernameLabel);

    let usernameInput = new Input();
    loginForm.add(usernameInput);

    //password
    let passwordLabel = new Label();
    passwordLabel.setText('Password');
    loginForm.add(passwordLabel);

    let passwordInput = new Input();
    loginForm.add(passwordInput);

    //span buttons
    let spanButtons = new Span();
    loginForm.add(spanButtons);

    //Register
    let registerAnchor = new Anchor();
    registerAnchor.setText('Register');
    registerAnchor.setCursor('pointer');
    spanButtons.add(registerAnchor);

    this.registerAnchor = registerAnchor;

    //Login
    let loginButton = new Button();
    loginButton.setText('Login');
    loginButton.setType('submit');
    loginButton.container.style.marginLeft = '50px';
    spanButtons.add(loginButton);

}
Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;

Login.prototype.addRegisterClickListener = function (listener) {
    this.registerAnchor.addClickListener(listener)
}

Login.prototype.addLoginSubmitListener = function (listener) {
    this.loginSubmitListener = listener;
}