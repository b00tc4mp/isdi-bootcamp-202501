function Register() {
    Component.call(this, 'div');

    let logoRegister = new Heading(1);
    logoRegister.setText('Register');
    this.add(logoRegister);

    let registerForm = new Form();
    registerForm.setOrientation('flex', 'column')
    registerForm.container.style.width = '250px';

    registerForm.addSubmitListener(function (e) {
        e.preventDefault();

        let registeredUser = {
            name: nameInput.getValue(),
            email: emailInput.getValue(),
            username: usernameInput.getValue(),
            password: passwordInput.getValue()
        }

        console.log(registeredUser);

        this.registerSubmitListener();
    }.bind(this))
    this.add(registerForm);

    //Name
    let nameLabel = new Label();
    nameLabel.setText('Name');
    registerForm.add(nameLabel);

    let nameInput = new Input();
    registerForm.add(nameInput);

    //Email
    let emailLabel = new Label();
    emailLabel.setText('Email');
    registerForm.add(emailLabel);

    let emailInput = new Input();
    registerForm.add(emailInput);

    //Username
    let usernameLabel = new Label();
    usernameLabel.setText('Username');
    registerForm.add(usernameLabel);

    let usernameInput = new Input();
    registerForm.add(usernameInput);

    //Password
    let passwordLabel = new Label();
    passwordLabel.setText('Password');
    registerForm.add(passwordLabel);

    let passwordInput = new Input();
    registerForm.add(passwordInput);

    //Span buttons
    let spanButtons = new Span();
    registerForm.add(spanButtons)

    let loginAnchor = new Anchor();
    loginAnchor.setText('Login');
    loginAnchor.setCursor('pointer');
    spanButtons.add(loginAnchor);

    this.loginAnchor = loginAnchor;

    let registerButton = new Button();
    registerButton.setText('Register');
    registerButton.setType('submit');
    registerButton.container.style.marginLeft = '50px';
    spanButtons.add(registerButton);


}
Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;

Register.prototype.addLoginClickListener = function (listener) {
    this.loginAnchor.addClickListener(listener);
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener;
}