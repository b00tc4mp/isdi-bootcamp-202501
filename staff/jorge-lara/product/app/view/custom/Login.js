class Login extends Component {
    constructor() {
        super('div');

        const logo = new Heading(1);
        logo.setText('Login');
        this.add(logo);

        const loginForm = new Form();
        loginForm.setOrientation('flex', 'column');
        loginForm.container.style.width = '250px';

        loginForm.addSubmitListener(e => {
            e.preventDefault();

            const username = usernameInput.getValue();
            const password = passwordInput.getValue();

            try {
                logic.loginUser(username, password);

                loginForm.clear();

                this.loginSubmitListener();
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        })
        this.add(loginForm);

        //username
        const usernameLabel = new Label();
        usernameLabel.setText('Username');
        loginForm.add(usernameLabel);

        const usernameInput = new Input();
        loginForm.add(usernameInput);

        //password
        const passwordLabel = new Label();
        passwordLabel.setText('Password');
        loginForm.add(passwordLabel);

        const passwordInput = new Input();
        passwordInput.setType('password');
        loginForm.add(passwordInput);

        //span buttons
        const spanButtons = new Span();
        loginForm.add(spanButtons);

        //Register
        const registerAnchor = new Anchor();
        registerAnchor.setText('Register');
        registerAnchor.setCursor('pointer');

        registerAnchor.addClickListener(() => {
            loginForm.clear();

            this.registerClickListener();
        })
        spanButtons.add(registerAnchor);

        //Login
        const loginButton = new Button();
        loginButton.setText('Login');
        loginButton.setType('submit');
        loginButton.container.style.marginLeft = '50px';
        spanButtons.add(loginButton);
    }

    addRegisterClickListener(listener) {
        this.registerClickListener = listener;
    }

    addLoginSubmitListener(listener) {
        this.loginSubmitListener = listener;
    }
}