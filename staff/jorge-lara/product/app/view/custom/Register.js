class Register extends Component {
    constructor() {
        super('div');

        const logoRegister = new Heading(1);
        logoRegister.setText('Register');
        this.add(logoRegister);

        const registerForm = new Form();
        registerForm.setOrientation('flex', 'column');
        registerForm.container.style.width = '250px';

        registerForm.addSubmitListener(function (e) {
            e.preventDefault();

            const name = nameInput.getValue();
            const email = emailInput.getValue();
            const username = usernameInput.getValue();
            const password = passwordInput.getValue();

            try {
                logic.registerUser(name, email, username, password);

                registerForm.clear();

                this.registerSubmitListener();
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        }.bind(this))
        this.add(registerForm);

        //Name
        const nameLabel = new Label();
        nameLabel.setText('Name');
        registerForm.add(nameLabel);

        const nameInput = new Input();
        registerForm.add(nameInput);

        //Email
        const emailLabel = new Label();
        emailLabel.setText('Email');
        registerForm.add(emailLabel);

        const emailInput = new Input();
        emailInput.setType('email');
        registerForm.add(emailInput);

        //Username
        const usernameLabel = new Label();
        usernameLabel.setText('Username');
        registerForm.add(usernameLabel);

        const usernameInput = new Input();
        registerForm.add(usernameInput);

        //Password
        const passwordLabel = new Label();
        passwordLabel.setText('Password');
        registerForm.add(passwordLabel);

        const passwordInput = new Input();
        passwordInput.setType('password')
        registerForm.add(passwordInput);

        //Span buttons
        const spanButtons = new Span();
        registerForm.add(spanButtons)

        const loginAnchor = new Anchor();
        loginAnchor.setText('Login');
        loginAnchor.setCursor('pointer');
        spanButtons.add(loginAnchor);

        loginAnchor.addClickListener(function () {
            registerForm.clear();

            this.loginClickListener();
        }.bind(this))

        const registerButton = new Button();
        registerButton.setText('Register');
        registerButton.setType('submit');
        registerButton.container.style.marginLeft = '50px';
        spanButtons.add(registerButton);

    }

    addLoginClickListener(listener) {
        this.loginClickListener = listener;
    }

    addRegisterSubmitListener(listener) {
        this.registerSubmitListener = listener;
    }
}