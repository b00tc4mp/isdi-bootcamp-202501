function Register() {
    Component.call(this, "div");

    var logo = new Heading(1);
    logo.setText("Logo");
    this.add(logo);

    var inputForm = new Form();
    inputForm.setId("register-form");
    inputForm.addSubmitListener(function (event) {
        event.preventDefault();

        var name = nameInput.getValue();
        var email = emailInput.getValue();
        var username = usernameInput.getValue();
        var password = passwordInput.getValue();

        try {
            logic.registerUser(name, email, username, password)

            inputForm.clear()

            alert('User created')

            this.registerSubmitListener()
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }.bind(this));
    inputForm.container.style.display = "flex";
    inputForm.container.style.flexDirection = "column";
    this.add(inputForm);

    var nameLabel = new Label();
    nameLabel.setHtmlFor("register-name");
    nameLabel.setText("Name");
    inputForm.add(nameLabel);

    var nameInput = new Input();
    nameInput.setType("text");
    nameInput.setId("register-name");
    nameInput.setPlaceholder('name')
    inputForm.add(nameInput);

    var emailLabel = new Label();
    emailLabel.setHtmlFor("register-email");
    emailLabel.setText("E-mail");
    inputForm.add(emailLabel);

    var emailInput = new Input();
    emailInput.setType("email");
    emailInput.setId("register-email");
    emailInput.setPlaceholder('e-mail')
    inputForm.add(emailInput);

    var usernameLabel = new Label();
    usernameLabel.setHtmlFor("register-username");
    usernameLabel.setText("Username");
    inputForm.add(usernameLabel);

    var usernameInput = new Input();
    usernameInput.setType("text");
    usernameInput.setId("register-username");
    usernameInput.setPlaceholder('username')
    inputForm.add(usernameInput);

    var passwordLabel = new Label();
    passwordLabel.setHtmlFor("register-password");
    passwordLabel.setText("Password");
    inputForm.add(passwordLabel);

    var passwordInput = new Input();
    passwordInput.setType("password");
    passwordInput.setId("register-password");
    passwordInput.setPlaceholder('********')
    inputForm.add(passwordInput);

    inputForm.container.querySelectorAll("input").forEach(function (child) {
        child.style.width = "300px";
    })

    var loginAndRegister = new Div();
    loginAndRegister.container.style.width = '310px'
    loginAndRegister.container.style.marginTop = '15px'
    loginAndRegister.container.style.display = 'flex'
    loginAndRegister.container.style.justifyContent = 'space-between'
    inputForm.add(loginAndRegister);

    var loginAnchor = new Anchor();
    loginAnchor.setText("Login");
    loginAnchor.addClickListener(function () {
        inputForm.clear()

        this.loginClickListener()
    }.bind(this))
    loginAndRegister.add(loginAnchor);

    var registerButton = new Button();
    registerButton.setType("submit");
    registerButton.setForm("register-form");
    registerButton.setText("Register");
    loginAndRegister.add(registerButton);
}

Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;

Register.prototype.addLoginClickListener = function (listener) {
    this.loginClickListener = listener
}

Register.prototype.addRegisterSubmitListener = function (listener) {
    this.registerSubmitListener = listener
}